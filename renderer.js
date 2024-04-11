/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
//window.moveBy(250, 250);
const { port1, port2 } = new MessageChannel();
// myWindow2 will be able to moved by grabbing the entire element

//Close the window on click of a red button
/* let lastAttack = Date.now();

document.addEventListener("keydown", (e) => {
  const current = Date.now();

  if (Math.abs(current - lastAttack) <= 750) {
    console.log("Prevent attack");
    return;
  }
  lastAttack = current;
  if (e.key == "ArrowRight") {
    //window.moveTo(window.screenX + 10, window.screenY);
    repeatOften(window.screenX + 50, window.screenY, "init");
  } else if (e.key == "ArrowLeft") {
    //window.moveTo(window.screenX - 10, window.screenY);
    repeatOften(window.screenX - 50, window.screenY, "init");
  } else if (e.key == "ArrowUp") {
    //window.moveTo(window.screenX, window.screenY - 10);
    repeatOften(window.screenX, window.screenY - 50, "init");
  } else if (e.key == "ArrowDown") {
    //window.moveTo(window.screenX, window.screenY + 10);

    repeatOften(window.screenX, window.screenY + 50, "init");
  }
});

// You can choose to have an element with the class "window-top" inside of your draggable window that will act as the "handle" for the window or it will attach to the element itself

var globalID,
  taskRunning = false,
  taskCompleted = true;
var task;
let target = 600;
let targetX = 0;
let targetY = 0;
let frameCount = 0;

function repeatOften(toX, toY, type) {
  cancelAnimationFrame(globalID);
  setTimeout(() => {
    globalID = requestAnimationFrame(() => main(toX, toY, type));
  }, 100);
}
function main(toX, toY, type) {
  if (taskRunning == true && type == "init") {
    console.log("still runningdd");
    return;
  }
  taskRunning = true;
  const startX = window.screenX;
  const startY = window.screenY;

  window.moveTo(
    easing("easeIn2", 0.5, startX, toX),
    easing("easeIn2", 0.5, startY, toY)
  );
  console.log({ x: Math.floor(Math.abs(startX - toX)) });
  if (
    Math.floor(Math.abs(startX - toX)) <= 10 &&
    Math.floor(Math.abs(startY - toY)) <= 10
  ) {
    cancelAnimationFrame(globalID);
    taskRunning = false;

    console.log("TASK CLEAR");
    return;
  }
  globalID = requestAnimationFrame(() => main(toX, toY, "repeat"));
}
function step() {
  frameCount++;
  if (frameCount < 30) {
    globalID = requestAnimationFrame(repeatOften);
    return;
  }
  frameCount = 0;
  globalID = requestAnimationFrame(repeatOften);
} */


window.addEventListener("DOMContentLoaded", event => {
  const audio = document.querySelector("audio");
  audio.volume = 0.4;
  //audio.play();
});



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
 

 

