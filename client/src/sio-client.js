import { io } from "socket.io-client";

let sio, connected = false;

export const connectAndBind = () => {
  const params = new URLSearchParams(window.location.search)
  const uid = params.get('uid');

  if(!uid) {
    return;
  }
  try {
    sio = io(process.env.REACT_APP_SERVER_URL, {
      query: { uuid: uid },
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