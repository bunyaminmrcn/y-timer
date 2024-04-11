// Modules to control application life and create native browser window
const { app, BrowserWindow, screen, dialog, ipcMain,Menu, Tray } = require("electron");
const path = require("node:path");
const { serverUp } = require("./server");
const { init } = require("./manager");
const { Initializer } = require('./models/base/WindowManager');
const Emitter = require('./client/src/ee');
const StoreEmitter = require('./client/src/se');

let tray = null
async function createWindow() {
  // Create the browser window.

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const info = await serverUp();
  init();
  

  mainWindow = new BrowserWindow({ width, height, show: false });
  const wm = new Initializer(mainWindow);

  mainWindow.loadURL(`http://localhost:${info.port}`);
  mainWindow.setMenu(null);

/*
  const secondWindow = new BrowserWindow({
    width: 300, height: 300,
    //x: 0, y: 0,
    //frame: false,
    transparent: true,
    // show: false,
    maximizable: false,
    fullscreenable: false,
    frame: false,
    roundedCorners: false,
    thickFrame: false,
    parent: mainWindow
  });
  */
 
  //secondWindow.webContents.openDevTools()

  tray = new Tray(path.join(__dirname, 'icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      type: 'normal',
      click: function() {
        mainWindow.show()
      }
    },
    {
      label: 'Exit',
      type: 'normal',
      click: function () {
        Initializer.getInstance().setIsAsked(true)
        app.quit();
     }
    }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  
  //secondWindow.isKiosk = true;
  //secondWindow.setMenu(null);
  //secondWindow.loadFile('index.html')
  // and load the index.html of the app.
  mainWindow.on('close', async (e) => {
    e.preventDefault();
    const isAsked = Initializer.getInstance().getIsAsked();
    if(isAsked) {
      console.log("Bye")
      mainWindow.destroy();
    } else {
      mainWindow.hide()
    }
    
  });

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("timer_app", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("timer_app");
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });

  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  })

}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
