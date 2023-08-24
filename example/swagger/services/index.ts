/** Generate by swagger-http-codegen */
import { IRequestOptions, IRequestConfig, getConfigs } from './serviceOptions';
import fetch from './fetch';

export const basePath = '/v1';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
export interface JsonResult<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

export class MapperService {
  /**
   *
   */
  static update(
    params: {
      /**  */
      mapperId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/crawler/v1/mapper/{mapper.id}';
      url = url.replace('{mapper.id}', params['mapperId'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  }
}

export class AuditLogService {
  /**
   *
   */
  static getAudit(
    params: {
      /**  */
      startDate?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/services/app/AuditLog/GetAuditLogs';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { StartDate: params['startDate'] };

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  }
}
