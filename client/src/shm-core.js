const { shm } = global;
import {connectAndBind, listenEvents } from './sio-client';

export const listen = () => {
    if(shm) {
        
        shm.on('s_sio', async () => {
            await initSio()
        })
    } else {
        console.log({ m: 'shm not found'})
    }
}


const initSio = async () => {
    
    return await new Promise((res, rej) => {
        
        connectAndBind()
        res()
    }).then(()=> {
        console.log('Sio client initilized')
        return sio;
    }).catch(err => {
        console.log('An error occured')
    })
}