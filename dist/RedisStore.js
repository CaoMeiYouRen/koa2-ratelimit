"use strict";
/**
 * RedisStore
 *
 * RedisStore for koa2-ratelimit
 *
 * @author Ashok Vishwakarma <akvlko@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Redis = require("ioredis");
/**
 * Store
 *
 * Existing Store class
 */
const Store_1 = tslib_1.__importDefault(require("./Store"));
/**
 * RedisStore
 *
 * Class RedisStore
 */
class RedisStore extends Store_1.default {
    constructor(config) {
        super();
        this.client = new Redis(config);
    }
    /**
     * _hit
     *
     * @author CaoMeiYouRen
     * @date 2020-05-26
     * @param {*} key
     * @param {{ interval: number; }} options
     * @param {*} weight
     * @returns
     */
    async _hit(key, options, weight) {
        let [replies] = await this.client.multi().pttl(key).exec();
        let [err, ttl] = replies;
        let seconds = options.interval;
        if (ttl <= 0) {
            await this.client.set(key, weight, 'PX', seconds);
            ttl = seconds;
        }
        else {
            await this.client.incrby(key, weight);
            await this.client.pexpire(key, ttl);
        }
        return ttl;
    }
    /**
     *
     *
     * @author CaoMeiYouRen
     * @date 2020-05-26
     * @param {*} key
     * @param {*} options
     * @param {*} weight
     * @returns
     */
    async incr(key, options, weight) {
        return this._hit(key, options, weight);
    }
    /**
    * decrement
    *
    * Override decrement method from Store class
    * @param {*} key
    * @param {*} options
    * @param {*} weight
    */
    async decrement(key, options, weight) {
        await this.client.decrby(key, weight);
    }
    /**
    * saveAbuse
    *
    * Override saveAbuse method from Store class
    */
    saveAbuse() { }
}
exports.default = RedisStore;
//# sourceMappingURL=RedisStore.js.map