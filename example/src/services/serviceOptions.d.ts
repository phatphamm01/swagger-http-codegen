/** Generate by swagger-axios-codegen */
export interface IRequestOptions {
}
export interface IRequestConfig {
    method?: any;
    headers?: any;
    url?: any;
    data?: any;
    params?: any;
}
export declare type IFetchConfig = (config: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void) => Promise<any>;
export declare function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig;
