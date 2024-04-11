const moment = require('moment');
const requestAnimationFrame = (f) => {
    setImmediate(() => f(Date.now()))
}

class Timer {
    startTimestamp;
    constructor() {
        requestAnimationFrame(() => this.loop())
    }

    loop() {
        this.startTimestamp = moment();
        /*
        setInterval(() => {
            this.startTimestamp.add(1, 'second');
        }, 1000);
        */
        requestAnimationFrame(() => this.loop())
    }

    getTime() {
        return this.startTimestamp.format('HH:mm:ss:SSS A');
    }

}

module.exports = { Timer }
