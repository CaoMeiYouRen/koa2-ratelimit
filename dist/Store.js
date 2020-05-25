"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const methods = ['incr', 'decrement', 'saveAbuse'];
class Store {
    // constructor() {
    //     for (const elem of methods) {
    //         if (this[elem] === undefined) {
    //             throw new TypeError(`Must override method ${elem}`);
    //         }
    //     }
    // }
    incr(key, options, weight) {
        throw new Error("Method not implemented.");
    }
    decrement(key, options, weight) {
        throw new Error("Method not implemented.");
    }
    saveAbuse(key, options, weight) {
        throw new Error("Method not implemented.");
    }
}
exports.default = Store;
//# sourceMappingURL=Store.js.map