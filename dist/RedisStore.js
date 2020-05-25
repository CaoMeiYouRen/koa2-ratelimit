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
    _processReplies(replies) {
        // in ioredis, every reply consists of an array [err, value].
        // We don't need the error here, and if we aren't dealing with an array,
        // nothing is changed.
        return replies.map(function (val) {
            if (Array.isArray(val) && val.length >= 2) {
                return val[1];
            }
            return val;
        });
    }
    ;
    setExpire(expiryMs, replies, rdskey) {
        // if this is new or has no expiry
        expiryMs = Math.round(1000 * expiryMs);
        if (replies[0] === 1 || replies[1] === -1) {
            // then expire it after the timeout
            this.client.pexpire(rdskey, expiryMs);
            return expiryMs;
        }
        else {
            return replies[1];
        }
    }
    ;
    /**
* _hit
* @access private
* @param {*} key
* @param {*} options
* @param {*} weight
*/
    async _hit(key, options, weight) {
        let replies = await this.client.multi().pttl(key).exec();
        let [counter, dateEnd] = replies;
        if (counter === null) {
            counter = weight;
            dateEnd = Date.now() + options.interval;
            const seconds = Math.ceil(options.interval / 1000);
            replies = this._processReplies(replies);
            var ttl = this.setExpire(seconds, replies, key);
            counter = ttl;
            // await this.client.setex(key, seconds, counter as any);
        }
        else {
            counter = await this.client.incrby(key, weight);
        }
        console.log({
            counter,
            dateEnd,
        });
        return {
            counter,
            dateEnd,
        };
    }
    /**
* incr
*
* Override incr method from Store class
* @param {*} key
* @param {*} options
* @param {*} weight
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