import Store from './Store';
import Koa = require('koa');
declare class TimeType {
    ms?: number;
    sec?: number;
    min?: number;
    hour?: number;
    day?: number;
    week?: number;
    month?: number;
    year?: number;
}
declare class Options {
    interval?: number | TimeType;
    delayAfter?: number;
    timeWait?: number | TimeType;
    max?: number;
    message?: string;
    statusCode?: number;
    headers?: boolean;
    skipFailedRequests?: boolean;
    prefixKey?: string;
    store?: Store;
    keyGenerator?: (ctx: Koa.Context, next?: Koa.Next) => any;
    skip?: (ctx: Koa.Context, next?: Koa.Next) => any;
    getUserId?: (ctx: Koa.Context, next?: Koa.Next) => any;
    handler?: (ctx: Koa.Context, next?: Koa.Next) => any;
    onLimitReached?: (ctx: Koa.Context, next?: Koa.Next) => any;
    weight?: (ctx: Koa.Context, next?: Koa.Next) => any;
    whitelist?: any[];
}
declare class RateLimit {
    options: Options;
    store: Store;
    constructor(options: Options);
    static timeToMs(time?: number | TimeType): number | undefined;
    keyGenerator(ctx: Koa.Context): Promise<any>;
    weight(ctx: Koa.Context): Promise<any>;
    skip(ctx: Koa.Context): Promise<any>;
    getUserId(ctx: Koa.Context): Promise<any>;
    handler(ctx: Koa.Context, next: Koa.Next): Promise<void>;
    onLimitReached(ctx: Koa.Context): Promise<void>;
    get middleware(): (ctx: Koa.Context, next: Koa.Next) => Promise<any>;
    _rateLimit(ctx: Koa.Context, next: Koa.Next): Promise<any>;
    _isWhitelisted(key: string): boolean | undefined;
    wait(ms: number): Promise<unknown>;
}
declare const _default: {
    RateLimit: typeof RateLimit;
    middleware(options?: Options): (ctx: Koa.Context, next: Koa.Next) => Promise<any>;
    defaultOptions(options?: Options): void;
};
export default _default;
