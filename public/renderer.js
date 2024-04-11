var windowTopBar = document.createElement('div')
windowTopBar.style.width = "100%"
windowTopBar.style.textAlign = 'center'
windowTopBar.style.height = "32px"
windowTopBar.style.backgroundColor = 'rgba(0, 0,0, 0.1)'
windowTopBar.style.position = "absolute"
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = "drag"
document.body.appendChild(windowTopBar)

const { ipcRenderer } = require('electron')

window.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(() => {
    ipcRenderer.send('asynchronous-message',  { uniqueId: window.uniqueId })
  }, 50)
  ipcRenderer.on('asynchronous-reply', (_event, arg) => {
    //console.log({arg}) // prints "pong" in the DevTools console
    const { title, textContent} = arg.payload;
    windowTopBar.innerText = title;
    document.querySelector('#main').innerHTML = textContent;
  })

  
});
 