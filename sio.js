//
const { Server } = require('socket.io');
const {Timer}  = require('./models/base/Timer');
const { shm  } = global;
const store = require('./client/src/se');

const bindIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3206",
            methods: ["GET", "POST", "PUT"]
          }
    });
    const timer = new Timer();
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.emit('sync', { time: timer.getTime()})


        if(socket.handshake.query) {

            console.log({q: socket.handshake.query.uuid})

            if(store.getInstance()){
                const props = store.getInstance().filter('confs', 'uniqueId', socket.handshake.query.uuid);
                //console.log({ props })
                if(props) {
                    socket.emit('sync_props', {...(props.payload)});
                }
                
            } else {
                console.log('cannot access to store')
            }
            
        }
        socket.on('notify', (data) => {
            //Emitter.emit('on_notify', data)
        })
    });
}






module.exports = { bindIO }
