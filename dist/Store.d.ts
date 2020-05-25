interface IStore {
    incr(key: any, options?: any, weight?: any): any;
    decrement(key: any, options?: any, weight?: any): any;
    saveAbuse(key: any, options?: any, weight?: any): any;
}
declare class Store implements IStore {
    incr(key: any, options?: any, weight?: any): any;
    decrement(key: any, options?: any, weight?: any): any;
    saveAbuse(key: any, options?: any, weight?: any): any;
}
export default Store;
