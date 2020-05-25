/**
 * RedisStore
 *
 * RedisStore for koa2-ratelimit
 *
 * @author Ashok Vishwakarma <akvlko@gmail.com>
 */

import Redis = require('ioredis');

/**
 * Store
 *
 * Existing Store class
 */
import Store from './Store';

/**
 * RedisStore
 *
 * Class RedisStore
 */
class RedisStore extends Store {
    client: Redis.Redis

    constructor(config: Redis.RedisOptions) {
        super();
        this.client = new Redis(config);
    }
    _processReplies(replies: any[]) {
        // in ioredis, every reply consists of an array [err, value].
        // We don't need the error here, and if we aren't dealing with an array,
        // nothing is changed.
        return replies.map(function (val) {
            if (Array.isArray(val) && val.length >= 2) {
                return val[1];
            }

            return val;
        });
    };

    setExpire(expiryMs: number, replies: any[], rdskey: Redis.KeyType) {
        // if this is new or has no expiry
        expiryMs = Math.round(1000 * expiryMs);
        if (replies[0] === 1 || replies[1] === -1) {
            // then expire it after the timeout
            this.client.pexpire(rdskey, expiryMs);
            return expiryMs;
        } else {
            return replies[1];
        }
    };
    /**
* _hit
* @access private
* @param {*} key
* @param {*} options
* @param {*} weight
*/
    async _hit(key: any, options: { interval: number; }, weight: any) {
        let replies = await this.client.multi().pttl(key).exec();
        console.log(replies)
        let [counter, dateEnd] = replies;
        if (counter === null) {
            counter = weight;
            dateEnd = Date.now() + options.interval as any;
            const seconds = Math.ceil(options.interval / 1000);
            replies = this._processReplies(replies);
            var ttl = this.setExpire(seconds, replies, key);
            counter = ttl
            // await this.client.setex(key, seconds, counter as any);
        } else {
            counter = await this.client.incrby(key, weight) as any;
        }
        console.log({
            counter,
            dateEnd,
        })
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
    async incr(key: any, options: any, weight: any) {
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
    async decrement(key: any, options: any, weight: any) {
        await this.client.decrby(key, weight);
    }

    /**
* saveAbuse
*
* Override saveAbuse method from Store class
*/
    saveAbuse() { }
}

export default RedisStore;
