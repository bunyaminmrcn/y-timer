class Store {
    static instance = null;

    central_store = {}
    constructor() {
        if(Store.instance === null) {
            Store.instance = this;
        }
    }

    getInstance() {
        return Store.instance;
    }
    set = (event, payload) => {
        this.central_store[`${event}`] = payload;
    }
    get =  (event) => {
        return this.central_store[`${event}`];
    }
    filter =  (event, filterBy, match) => {
        return this.central_store[`${event}`] instanceof Array ? this.central_store[`${event}`].find(x => x[`${filterBy}`] == match) : null;
    }
}

console.log('SELINUX MODULE LOADED');

module.exports = new Store();
