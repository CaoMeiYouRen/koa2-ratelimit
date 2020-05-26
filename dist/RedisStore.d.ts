import Redis = require('ioredis');
import Store from './Store';
declare class RedisStore extends Store {
    client: Redis.Redis;
    constructor(config: Redis.RedisOptions);
    _hit(key: any, options: {
        interval: number;
    }, weight: any): Promise<{
        counter: number;
        dateEnd: any;
    }>;
    incr(key: any, options: any, weight: any): Promise<{
        counter: number;
        dateEnd: any;
    }>;
    decrement(key: any, options: any, weight: any): Promise<void>;
    saveAbuse(): void;
}
export default RedisStore;
