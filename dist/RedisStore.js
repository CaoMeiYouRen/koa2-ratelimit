"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Redis = require("ioredis");
const Store_1 = tslib_1.__importDefault(require("./Store"));
class RedisStore extends Store_1.default {
    constructor(config) {
        super();
        this.client = new Redis(config);
    }
    async _hit(key, options, weight) {
        let [replies] = await this.client.multi().pttl(key).exec();
        let [err, ttl] = replies;
        let seconds = options.interval;
        let counter = 0;
        if (ttl <= 0) {
            await this.client.set(key, weight, 'PX', seconds);
            ttl = seconds;
            counter = weight;
        }
        else {
            counter = await this.client.incrby(key, weight);
            await this.client.pexpire(key, ttl);
        }
        return {
            counter,
            dateEnd: Date.now() + ttl
        };
    }
    async incr(key, options, weight) {
        return this._hit(key, options, weight);
    }
    async decrement(key, options, weight) {
        await this.client.decrby(key, weight);
    }
    saveAbuse() { }
}
exports.default = RedisStore;
//# sourceMappingURL=RedisStore.js.map