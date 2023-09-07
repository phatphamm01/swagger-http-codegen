"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.definitionHeader = exports.customerServiceHeader = exports.disableLint = exports.serviceHeader = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function serviceHeader(options) {
    const classTransformerImport = options.useClassTransformer
        ? `import { Expose, Transform, Type, plainToClass } from 'class-transformer';
  `
        : '';
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
  `;
}
exports.serviceHeader = serviceHeader;
function disableLint() {
    return `/** Generate by swagger-http-codegen */
  // @ts-nocheck
/* eslint-disable */
  
`;
}
exports.disableLint = disableLint;
function customerServiceHeader(options) {
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
  `;
}
exports.customerServiceHeader = customerServiceHeader;
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
  `;
}
function definitionHeader(fileDir) {
    let fileStr = '// empty ';
    if (!!fileDir) {
        if (fs.existsSync(path.resolve(fileDir))) {
            const buffs = fs.readFileSync(path.resolve(fileDir));
            fileStr = buffs.toString('utf8');
        }
    }
    return `
  ${fileStr}
  `;
}
exports.definitionHeader = definitionHeader;
//# sourceMappingURL=serviceHeader.js.map