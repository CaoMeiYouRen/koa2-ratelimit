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
    async _hit(key: any, options: { interval: number; }, weight: any) {
        let [replies] = await this.client.multi().pttl(key).exec();
        let [err, ttl] = replies;
        let seconds = options.interval
        if (ttl <= 0) {
            await this.client.set(key, weight, 'PX', seconds);
            ttl = seconds
        } else {
            await this.client.incrby(key, weight);
            await this.client.pexpire(key, ttl);
        }
        return ttl
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
