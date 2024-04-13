const EventEmitter = require("eventemitter3");


class SHMLoader {
    instance;

    constructor() {
        if(!(this.instance)) {
            
            const eventEmitter = new EventEmitter();
       
            const Emitter = {
                on: (event, fn) => eventEmitter.on(event, fn),
                once: (event, fn) => eventEmitter.once(event, fn),
                off: (event, fn) => eventEmitter.off(event, fn),
                emit: (event, payload) => eventEmitter.emit(event, payload),
            };
            Object.freeze(Emitter);
            this.instance =  Emitter;
            Object.defineProperty(global, 'shm', {
                value: this.instance,
                writable: false
            })
        }
    }

    getInstance = () => {
        return this.instance;
    }
}

module.exports = new SHMLoader ();