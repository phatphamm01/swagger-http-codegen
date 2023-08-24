/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */
import { getConfigs } from './serviceOptions';
import fetch from './fetch';
export const basePath = '/v1';
export class ListResultDto {
    items;
}
export class PagedResultDto {
    totalCount;
    items;
}
export class MapperService {
    /**
     *
     */
    static update(params = {}, options = {}) {
        return new Promise((resolve, reject) => {
            let url = basePath + '/crawler/v1/mapper/{mapper.id}';
            url = url.replace('{mapper.id}', params['mapperId'] + '');
            const configs = getConfigs('put', 'application/json', url, options);
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
    static getAudit(params = {}, options = {}) {
        return new Promise((resolve, reject) => {
            let url = basePath + '/api/services/app/AuditLog/GetAuditLogs';
            const configs = getConfigs('get', 'application/json', url, options);
            configs.params = { StartDate: params['startDate'] };
            /**  Adapt to ios13, get request does not allow body */
            fetch(configs, resolve, reject);
        });
    }
}
//# sourceMappingURL=index.js.map