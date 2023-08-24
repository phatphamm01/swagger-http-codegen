import * as fs from 'fs'
import * as path from 'path'
import { ISwaggerOptions } from '../baseInterfaces'
import {
  abpGenericTypeDefinition,
  universalGenericTypeDefinition,
} from './genericTypeDefinitionTemplate'

export function serviceHeader(options: ISwaggerOptions) {
  const classTransformerImport = options.useClassTransformer
    ? `import { Expose, Transform, Type, plainToClass } from 'class-transformer';
  `
    : ''
  return `/** Generate by swagger-http-codegen */
  /* #eslint-disable */
  // #ts-nocheck

  ${classTransformerImport}

  export interface IRequestOptions {
  }

  export interface IRequestConfig {
    method?: any;
    headers?: any;
    url?: any;
    data?: any;
    params?: any;
  }

  ${requestHeader()}
  `
}

export function disableLint() {
  return `/** Generate by swagger-http-codegen */
  // @ts-nocheck
/* eslint-disable */
  
`
}

export function customerServiceHeader(options: ISwaggerOptions) {
  return `/** Generate by swagger-http-codegen */
  // @ts-nocheck
  /* eslint-disable */
  export interface IRequestOptions {
    headers?: any;
  }
  export interface IRequestPromise<T=any> extends Promise<IRequestResponse<T>> {}

  export interface IRequestResponse<T=any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
  }

  export interface IRequestInstance {
    (config: any): IRequestPromise;
    (url: string, config?: any): IRequestPromise;
    request<T = any>(config: any): IRequestPromise<T>;
  }

  export interface IRequestConfig {
    method?: any;
    headers?: any;
    url?: any;
    data?: any;
    params?: any;
  }

  ${requestHeader()}
  `
}

function requestHeader() {
  return `

  export type IFetchConfig = (config: IRequestConfig,resolve: (p: any) => void, reject: (p: any) => void) => Promise<any>

  //example: 
  // export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
    // if (serviceOptions.axios) {
      // return serviceOptions.axios.request(configs).then(res => {
        // resolve(res.data);
      // })
        // .catch(err => {
          // reject(err);
        // });
    // } else {
      // throw new Error('please inject yourself instance like axios  ')
    // }
  // }

  export function getConfigs(method: string, contentType: string, url: string,options: any):IRequestConfig {
    const configs: IRequestConfig = { ...options, method, url };
    configs.headers = {
      ...options.headers,
      'Content-Type': contentType,
    };
    return configs
  }
  `
}

export function definitionHeader(fileDir: string | undefined) {
  let fileStr = '// empty '
  if (!!fileDir) {
    if (fs.existsSync(path.resolve(fileDir))) {
      const buffs = fs.readFileSync(path.resolve(fileDir))
      fileStr = buffs.toString('utf8')
    }
  }

  return `
  ${universalGenericTypeDefinition()}
  ${abpGenericTypeDefinition()}
  // customer definition
  ${fileStr}
  `
}
