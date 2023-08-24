/** Generate by swagger-axios-codegen */
import { IRequestOptions } from './serviceOptions';
export declare const basePath = "/v1";
export interface IList<T> extends Array<T> {
}
export interface List<T> extends Array<T> {
}
export interface IDictionary<TValue> {
    [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {
}
export interface IListResult<T> {
    items?: T[];
}
export declare class ListResultDto<T> implements IListResult<T> {
    items?: T[];
}
export interface IPagedResult<T> extends IListResult<T> {
    totalCount?: number;
    items?: T[];
}
export declare class PagedResultDto<T = any> implements IPagedResult<T> {
    totalCount?: number;
    items?: T[];
}
export interface JsonResult<T> {
    code: number;
    data: T;
    message: string;
    success: boolean;
}
export declare class MapperService {
    /**
     *
     */
    static update(params?: {
        /**  */
        mapperId: string;
    }, options?: IRequestOptions): Promise<string>;
}
export declare class AuditLogService {
    /**
     *
     */
    static getAudit(params?: {
        /**  */
        startDate?: string;
    }, options?: IRequestOptions): Promise<any>;
}
