class Initializer {
    static instance = null;
    constructor(mainWindow) {
        if (Initializer.instance == null) {
            Initializer.instance = new WM(mainWindow);
        }
    }
    static getInstance() {
        return Initializer.instance;
    }
}
const { BrowserWindow, ipcMain, app } = require("electron");
const knexORM = require('../../conf/db-init');
const path = require('path');
const store = require('../../client/src/se');

const { v4 } = require('uuid');

class WM {
    state = {
        isAsked: false,
        notebooks: [],
        currentNotebook: '',
        currentNotebookNotes: []
    }
    confs = [];
    mainWindow = null;
    shm = null;
    constructor(mainWindow) {
        this.mainWindow = mainWindow;
       
        this.loadTables();
    }
    async loadTables() {
        try {
            const notebooks = await knexORM.select().from('notebooks');
            this.state.notebooks = notebooks;
            //console.log({ notebooks })
            if (notebooks.length >= 1) {
                this.state.currentNotebook = notebooks[0]
                this.state.currentNotebookNotes = await knexORM.where({ notebookId: this.state.currentNotebook.id }).select().from('notes')
                //console.log({ notes: this.state.currentNotebookNotes })

                for (let i = 0; i < this.state.currentNotebookNotes.length; i++) {
                    const { x, y, width, height, background, title, textContent } = this.state.currentNotebookNotes[i];
                    const noteWindow = new BrowserWindow({

                        x, y, width: width, height, backgroundColor: background, transparent: true, maximizable: false,
                        fullscreenable: false,
                        frame: false,
                        roundedCorners: false,
                        thickFrame: false,
                        parent: this.mainWindow,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            preload: path.join(app.getAppPath(), 'preload.js')
                        },
                        
                    })
                    //noteWindow.id = i;


                    const v4_ = v4()
                    this.confs.push({ uniqueId: v4_, payload: { title, textContent } })
                    noteWindow.webContents.on("did-finish-load", () => {
                        noteWindow.webContents.executeJavaScript("window.uniqueId = '" + v4_ + "'; window[`_`] = '" + v4_ + "'")
                    })

                    noteWindow.loadURL('http://localhost:3206', {
                        extraHeaders: `Content-Security-Policy: default-src 'self'`
                    })


                    //noteWindow.webContents.openDevTools()
                }

                if (store.getInstance()) {
                    store.getInstance().set('confs', this.confs)
                    console.log('SETTT SCUCCESS');
                } else {
                    console.log('Cannot aceess to SOTRE')
                }
            }
        } catch (error) {

        }
    }
    getIsAsked() {
        return this.state.isAsked
    }
    setIsAsked(boolVal) {
        this.state.isAsked = boolVal;
    }
}

module.exports = { Initializer, WM }