/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
*/



const { ipcRenderer } = require('electron')
const Emitter = require('./client/src/ee');
const { shm } = global;


window.addEventListener("DOMContentLoaded", (event) => {

  const listenerId = setInterval(() => {
    const val = 'uniqueId';
    if(window[`${val}`]) {
      window.clearInterval(listenerId)
      shm.Emitter.emit('s_sio', {})
    } else {
      console.log("wait for set")
    }
  }, 50)
});
 