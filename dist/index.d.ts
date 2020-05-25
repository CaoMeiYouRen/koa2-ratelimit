export * from './RateLimit';
import MemoryStore from './MemoryStore';
import SequelizeStore from './SequelizeStore';
import MongodbStore from './MongodbStore';
import RedisStore from './RedisStore';
import Store from './Store';
declare const _default: {
    Stores: {
        Memory: typeof MemoryStore;
        Sequelize: typeof SequelizeStore;
        Mongodb: typeof MongodbStore;
        Redis: typeof RedisStore;
        Store: typeof Store;
    };
};
export default _default;
