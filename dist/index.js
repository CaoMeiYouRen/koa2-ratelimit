"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./RateLimit"), exports);
const MemoryStore_1 = tslib_1.__importDefault(require("./MemoryStore"));
const SequelizeStore_1 = tslib_1.__importDefault(require("./SequelizeStore"));
const MongodbStore_1 = tslib_1.__importDefault(require("./MongodbStore"));
const RedisStore_1 = tslib_1.__importDefault(require("./RedisStore"));
const Store_1 = tslib_1.__importDefault(require("./Store"));
exports.default = {
    Stores: {
        Memory: MemoryStore_1.default,
        Sequelize: SequelizeStore_1.default,
        Mongodb: MongodbStore_1.default,
        Redis: RedisStore_1.default,
        Store: Store_1.default,
    },
};
//# sourceMappingURL=index.js.map