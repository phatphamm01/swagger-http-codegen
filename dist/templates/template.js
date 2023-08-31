"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceTemplate = exports.requestTemplate = exports.typeTemplate = exports.enumTemplate = exports.classConstructorTemplate = exports.classTransformTemplate = exports.classValidationModelTemplate = exports.propValidationModelTemplate = exports.classPropsTemplate = exports.classTemplate = exports.interfaceTemplate = void 0;
const camelcase_1 = __importDefault(require("camelcase"));
const utils_1 = require("../utils");
const baseTypes = ['string', 'number', 'object', 'boolean', 'any'];
const isAdditionalProperties = (x) => x === "[additionalProperties: string]";
const isNotAdditionalProperties = (x) => !isAdditionalProperties(x);
/** 类模板 */
function interfaceTemplate(name, props, imports, strictNullChecks = true) {
    if ((0, utils_1.isDefinedGenericTypes)(name)) {
        // The defined interface is no longer generated
        return '';
    }
    // all references
    const importString = imports
        .map(imp => {
        return `import { ${imp} } from '../definitions/${imp}'\n`;
    })
        .join('');
    return `
  ${importString}

  export interface ${name} {

    ${props.map(p => {
        var _a;
        return classPropsTemplate(p.name, p.type, p.format, p.desc, (!strictNullChecks || !((_a = p.validationModel) === null || _a === void 0 ? void 0 : _a.required)) && !isAdditionalProperties(p.name), false, false);
    }).join('')}
  }
  `;
}
exports.interfaceTemplate = interfaceTemplate;
function classTemplate(name, props, imports, strictNullChecks = true, useClassTransformer, generateValidationModel) {
    // all references
    const mappedImports = imports.map(imp => {
        return `import { ${imp} } from '../definitions/${imp}'\n`;
    });
    if (useClassTransformer && imports.length > 0) {
        mappedImports.push(`import { Type, Transform, Expose } from 'class-transformer'\n`);
    }
    const importString = mappedImports.join('');
    return `
  ${importString}

  export class ${name} {

    ${props
        .map(p => {
        var _a;
        return classPropsTemplate(p.name, p.type, p.format, p.desc, !strictNullChecks || !((_a = p.validationModel) === null || _a === void 0 ? void 0 : _a.required), useClassTransformer, p.isEnum || p.isType);
    })
        .join('')}

    constructor(data: (undefined | any) = {}){
        ${props.map(p => classConstructorTemplate(p.name)).join('')}
    }
    ${generateValidationModel ? classValidationModelTemplate(props) : ''}
  }
  `;
}
exports.classTemplate = classTemplate;
/** class attribute template*/
function classPropsTemplate(filedName, type, format, description, canNull, useClassTransformer, isType) {
    /**
     * eg:
     *   //description
     *   fieldName: type
     */
    type = (0, utils_1.toBaseType)(type, format);
    if (isNotAdditionalProperties(filedName)) {
        filedName = `'${filedName}'`;
    }
    if (useClassTransformer) {
        const decorators = classTransformTemplate(type, format, isType);
        return `
  /** ${description || ''} */
  ${decorators}
  ${filedName}${canNull ? '?' : ''}:${type};
  `;
    }
    else {
        return `
  /** ${description || ''} */
  ${filedName}${canNull ? '?' : ''}:${type};
  `;
    }
}
exports.classPropsTemplate = classPropsTemplate;
function propValidationModelTemplate(filedName, validationModel) {
    /**
     * eg:
     *   fieldName: { required: true, maxLength: 50 }
     */
    return `'${filedName}':${JSON.stringify(validationModel)}`;
}
exports.propValidationModelTemplate = propValidationModelTemplate;
function classValidationModelTemplate(props) {
    /**
     * eg:
     *   public static validationModel = { .. }
     */
    return `
    public static validationModel = {
      ${props
        .filter(p => p.validationModel !== null)
        .map(p => propValidationModelTemplate(p.name, p.validationModel))
        .join(',\n')}
    }
  `;
}
exports.classValidationModelTemplate = classValidationModelTemplate;
function classTransformTemplate(type, format, isType) {
    const decorators = [`@Expose()`];
    const nonArrayType = type.replace('[', '').replace(']', '');
    /* ignore interfaces */
    if (baseTypes.indexOf(nonArrayType) < 0 && !isType) {
        decorators.push(`@Type(() => ${nonArrayType})`);
    }
    return decorators.join('\n');
}
exports.classTransformTemplate = classTransformTemplate;
/** class attribute template*/
function classConstructorTemplate(name) {
    return `this['${name}'] = data['${name}'];\n`;
}
exports.classConstructorTemplate = classConstructorTemplate;
/** enumerate*/
function enumTemplate(name, enumString, prefix) {
    return `
  export enum ${name}{
    ${enumString}
  }
  `;
}
exports.enumTemplate = enumTemplate;
function typeTemplate(name, typeString, prefix) {
    return `
  export type ${name} = ${typeString || '""'};
  `;
}
exports.typeTemplate = typeTemplate;
/** requestTemplate */
function requestTemplate(name, requestSchema, options) {
    let { summary = '', parameters = '', responseType = '', method = '', contentType = 'multipart/form-data', path = '', pathReplace = '', parsedParameters = {}, formData = '', requestBody = null } = requestSchema;
    const { useClassTransformer } = options;
    const { queryParameters = [], bodyParameter = [], headerParameters } = parsedParameters;
    const nonArrayType = responseType.replace('[', '').replace(']', '');
    const isArrayType = responseType.indexOf('[') > 0;
    const transform = useClassTransformer && baseTypes.indexOf(nonArrayType) < 0;
    const resolveString = transform
        ? `(response: any${isArrayType ? '[]' : ''}) => resolve(plainToClass(${nonArrayType}, response))`
        : 'resolve';
    return `
/**
 * ${summary || ''}
 */
  ${(0, camelcase_1.default)(name)}(${parameters}options:IRequestOptions={}):Promise<${responseType}> {
  return new Promise((resolve, reject) => {
    let url = basePath+'${path}'
    ${pathReplace}
    ${parsedParameters && headerParameters && headerParameters.length > 0
        ? `options.headers = {${headerParameters}, ...options.headers }`
        : ''}
    const configs:IRequestConfig = getConfigs('${method}', '${contentType}', url, options)
    ${parsedParameters && queryParameters.length > 0 ? 'configs.params = {' + queryParameters.join(',') + '}' : ''}
    
    
    ${requestBodyString(method, parsedParameters, bodyParameter, requestBody, contentType, formData)}
    
    fetch(configs, ${resolveString}, reject);
  });
},`;
}
exports.requestTemplate = requestTemplate;
function requestBodyString(method, parsedParameters, bodyParameter, requestBody, contentType, formData) {
    if (method !== 'get') {
        return `
    let data = ${parsedParameters && bodyParameter && bodyParameter.length > 0
            ?
                bodyParameter
            : !!requestBody
                ? 'params.body'
                : 'null'}
    ${contentType === 'multipart/form-data' ? formData : ''}
    configs.data = data;`;
    }
    return '/**  Adapt to ios13, get request does not allow body */';
}
/** serviceTemplate */
function serviceTemplate(name, body, imports = null) {
    // add base imports
    let mappedImports = !imports ? '' : `import { ${imports.join(',')}, } from './index.defs'\n`;
    return `

  ${mappedImports}
  export const ${name} = (fetch: IFetchConfig) => ({
    ${body}
  })
  `;
}
exports.serviceTemplate = serviceTemplate;
//# sourceMappingURL=template.js.map