/** Generate by swagger-http-codegen */
// @ts-nocheck
/* eslint-disable */

import { IRequestOptions, IRequestConfig, IFetchConfig, getConfigs } from './serviceOptions';

export const basePath = '';

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

export const repositoryService = (fetch: IFetchConfig) => ({
  /**
   * Create repository
   */
  create(
    params: {
      /** Repository name */
      name: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repository/create';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['name'];

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Get list repository
   */
  list(options: IRequestOptions = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repository/list';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Get list branch
   */
  branch(
    params: {
      /** Repository name */
      repository: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repository/{repositoryId}/branch';
      url = url.replace('{repository}', params['repository'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Get list commits
   */
  commits(
    params: {
      /** Repository name */
      repository: string;
      /** Page */
      page?: number;
      /** Per page */
      perPage?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repository/{repositoryId}/commits';
      url = url.replace('{repository}', params['repository'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], per_page: params['perPage'] };

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  }
});
