import RateLimit from './RateLimit';
import MemoryStore from './MemoryStore';
import SequelizeStore from './SequelizeStore';
import MongodbStore from './MongodbStore';
import RedisStore from './RedisStore';
import Store from './Store';
export { RateLimit };
export declare const Stores: {
    Memory: typeof MemoryStore;
    Sequelize: typeof SequelizeStore;
    Mongodb: typeof MongodbStore;
    Redis: typeof RedisStore;
    Store: typeof Store;
};
