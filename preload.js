/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
*/



const { ipcRenderer } = require('electron')
const SHMLoader  = require('./client/src/ee')




window.addEventListener("DOMContentLoaded", (event) => {

  const listenerId = setInterval(() => {
    const val = 'uniqueId';
    
    const shm = SHMLoader.getInstance();

    if(window[`${val}`] && (shm)) {
      window.clearInterval(listenerId)
      //console.log({emit: shm})
      shm.emit('s_sio', {})
    } else {
      console.log("wait for set")
    }
  }, 50)
});
 