import { io } from "socket.io-client";

let sio, connected = false;

export const connectAndBind = () => {

  try {
    sio = io(process.env.REACT_APP_SERVER_URL, {
      query: { uuid: window.uniqueId },
    });
    sio.on("connect", () => {
      console.log("Client Connected");
      connected = true;
    });
  } catch(err) {
    console.log({ err })
  }
  //return sio;
};

export const getSioClient = () => sio;
export const listenEvents = (eventName, fn) => {
    if(connected) {
        sio.on(eventName, fn)
    }
}