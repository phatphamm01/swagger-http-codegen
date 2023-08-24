/** Generate by swagger-axios-codegen */
/* #eslint-disable */
// #ts-nocheck
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
export function getConfigs(method, contentType, url, options) {
    const configs = { ...options, method, url };
    configs.headers = {
        ...options.headers,
        'Content-Type': contentType
    };
    return configs;
}
//# sourceMappingURL=serviceOptions.js.map