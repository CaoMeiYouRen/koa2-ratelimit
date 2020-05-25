
const methods = ['incr', 'decrement', 'saveAbuse'];

interface IStore {
    incr(key: any, options?: any, weight?: any): any;
    decrement(key: any, options?: any, weight?: any): any;
    saveAbuse(key: any, options?: any, weight?: any): any;
}

class Store implements IStore {
    // constructor() {
    //     for (const elem of methods) {
    //         if (this[elem] === undefined) {
    //             throw new TypeError(`Must override method ${elem}`);
    //         }
    //     }
    // }
    incr(key: any, options?: any, weight?: any): any {
        throw new Error("Method not implemented.");
    }
    decrement(key: any, options?: any, weight?: any): any {
        throw new Error("Method not implemented.");
    }
    saveAbuse(key: any, options?: any, weight?: any): any {
        throw new Error("Method not implemented.");
    }
}

export default Store;
