"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestParameters = void 0;
const utils_1 = require("../utils");
const camelcase_1 = __importDefault(require("camelcase"));
/**
 * 参数去重
 * 后台书写不规范,存在参数重名的情况
 * @param params
 */
function getUniqParams(params) {
    const uniqParams = {};
    params.forEach((v) => {
        // _${v.in}
        // TODO: How to deal with the same name but v.in=query|path|body at the same time? Separate different request parameters?
        if ('$ref' in v && !('name' in v)) {
            v.name = (0, utils_1.refClassName)(v.$ref);
        }
        if (!v.name.includes('[0]')) {
            //This parameter will appear when there is a List<T> in the DTO class (list[0].prop)
            uniqParams[`${v.name}`] = v;
        }
    });
    return Object.values(uniqParams);
}
const isNumber = (s) => {
    return Number.isInteger(s);
};
/**
 * Generate parameters
 * @param params
 */
function getRequestParameters(params, useHeaderParameters) {
    params = getUniqParams(params);
    let requestParameters = '';
    let requestFormData = '';
    let requestPathReplace = '';
    let queryParameters = [];
    let bodyParameters = [];
    let headerParameters = [];
    let imports = [];
    const moreBodyParams = true;
    params.forEach((p) => {
        // Skip the parameters in the request header according to the settings
        if (!useHeaderParameters && p.in === 'header')
            return;
        let propType = '';
        // reference type definition
        if (p.schema) {
            if (p.schema.enum) {
                propType = p.schema.enum.map((e) => (isNumber(e) ? e : `"${e}"`)).join(' | ');
            }
            else if (p.schema.items) {
                propType = (0, utils_1.refClassName)(p.schema.items.$ref);
                if (p.schema.type && p.schema.type === 'array') {
                    propType += '[]';
                }
            }
            else if (p.schema.$ref) {
                propType = (0, utils_1.refClassName)(p.schema.$ref);
            }
            else if (p.schema.type) {
                propType = (0, utils_1.toBaseType)(p.schema.type);
            }
            else {
                throw new Error('Could not find property type on schema');
            }
            imports.push(propType);
        }
        else if (p.items) {
            propType = p.items.$ref ? (0, utils_1.refClassName)(p.items.$ref) + '[]' : (0, utils_1.toBaseType)(p.items.type) + '[]';
            imports.push(propType);
        }
        // basic type
        else {
            if (p.enum) {
                propType = p.enum.map((e) => (isNumber(e) ? e : `"${e}"`)).join(' | ');
            }
            else {
                propType = (0, utils_1.toBaseType)(p.type);
            }
        }
        const paramName = (0, camelcase_1.default)(p.name);
        requestParameters += `
    /** ${p.description || ''} */
    ${paramName}${p.required ? '' : '?'}:${propType},`;
        // If the parameter is submitted from formData
        if (p.in === 'formData') {
            requestFormData += `if(params['${paramName}']){
        if(Object.prototype.toString.call(params['${paramName}']) === '[object Array]'){
          for (const item of params['${paramName}']) {
            data.append('${p.name}',item as any)
          }
        } else {
          data.append('${p.name}',params['${paramName}'] as any)
        }
      }\n
      `;
        }
        else if (p.in === 'path') {
            requestPathReplace += `url = url.replace('{${p.name}}',params['${paramName}']+'')\n`;
        }
        else if (p.in === 'query') {
            queryParameters.push(`'${p.name}':params['${paramName}']`);
        }
        else if (p.in === 'body') {
            const body = moreBodyParams ? `'${p.name}':params['${paramName}']` : `params['${paramName}']`;
            bodyParameters.push(body);
        }
        else if (p.in === 'header') {
            headerParameters.push(`'${p.name}':params['${paramName}']`);
        }
    });
    const bodyParameter = moreBodyParams ? `{${bodyParameters.join(',')}}` : bodyParameters.join(',');
    return {
        requestParameters,
        requestFormData,
        requestPathReplace,
        queryParameters,
        bodyParameter,
        headerParameters,
        imports
    };
}
exports.getRequestParameters = getRequestParameters;
//# sourceMappingURL=getRequestParameters.js.map