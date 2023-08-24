/** Generate by swagger-http-codegen */
/* #eslint-disable */
// #ts-nocheck

export interface IRequestOptions {}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

export type IFetchConfig = (config: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void) => Promise<any>

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

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url }
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  }
  return configs
}
