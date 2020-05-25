import RateLimit from './RateLimit';
import MemoryStore from './MemoryStore';
import SequelizeStore from './SequelizeStore';
import MongodbStore from './MongodbStore';
import RedisStore from './RedisStore';
import Store from './Store';

export { RateLimit }
export default {
    Stores: {
        Memory: MemoryStore,
        Sequelize: SequelizeStore,
        Mongodb: MongodbStore,
        Redis: RedisStore,
        Store,
    },
};
