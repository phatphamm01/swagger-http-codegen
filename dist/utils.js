"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationModel = exports.isOpenApi3 = exports.findDeepRefs = exports.classNamesToGenerics = exports.genericsToClassNames = exports.trimString = exports.getClassNameByPath = exports.getMethodNameByPath = exports.toBaseType = exports.isBaseType = exports.RemoveSpecialCharacters = exports.refClassName = exports.getGenericsClassNames = exports.getDefinedGenericTypes = exports.setDefinedGenericTypes = exports.isDefinedGenericTypes = exports.isGenerics = exports.isOpenApiGenerics = void 0;
let definedGenericTypes = [];
const UniversalGenericTypes = ['IList', 'List'];
const AbpGenericTypes = ['IListResult', 'ListResultDto', 'IPagedResult', 'PagedResultDto', 'Dictionary', 'IDictionary'];
// Is it an interface type
const isOpenApiGenerics = (s) => /^.+\[.+\]$/.test(s) || /^.+\«.+\»$/.test(s) || /^.+\<.+\>$/.test(s);
exports.isOpenApiGenerics = isOpenApiGenerics;
const isGenerics = (s) => {
    return /^.+\<.+\>$/.test(s);
};
exports.isGenerics = isGenerics;
const isDefinedGenericTypes = (x) => definedGenericTypes.some(i => i === x);
exports.isDefinedGenericTypes = isDefinedGenericTypes;
function setDefinedGenericTypes(types = []) {
    definedGenericTypes.push(...UniversalGenericTypes, ...AbpGenericTypes, ...types);
}
exports.setDefinedGenericTypes = setDefinedGenericTypes;
const getDefinedGenericTypes = () => definedGenericTypes;
exports.getDefinedGenericTypes = getDefinedGenericTypes;
/**
 * Breaking down generic interfaces
 * @param definitionClassName
 */
function getGenericsClassNames(definitionClassName) {
    let str = '';
    let split_key = '';
    if (/^.+\[.+\]$/.test(definitionClassName)) {
        split_key = '[';
    }
    else if (/^.+\«.+\»$/.test(definitionClassName)) {
        split_key = '«';
    }
    else if (/^.+\<.+\>$/.test(definitionClassName)) {
        split_key = '<';
    }
    if (split_key !== '') {
        const splitIndex = definitionClassName.indexOf(split_key);
        // Generic base class PagedResultDto PagedResultDto
        const interfaceClassName = definitionClassName.slice(0, splitIndex);
        // The type name of the generic type T
        const TClassName = definitionClassName.slice(splitIndex + 1, -1);
        if ((0, exports.isDefinedGenericTypes)(interfaceClassName)) {
            str =
                interfaceClassName === 'IDictionary' || interfaceClassName === 'Dictionary'
                    ? `${interfaceClassName}<object>`
                    : `${interfaceClassName}<${refClassName(TClassName)}>`;
        }
        else {
            str = trimString(RemoveSpecialCharacters(definitionClassName), '_', 'right');
        }
    }
    else {
        str = toBaseType(trimString(RemoveSpecialCharacters(definitionClassName), '_', 'right'));
    }
    return str;
}
exports.getGenericsClassNames = getGenericsClassNames;
/**
 * Get reference type
 * @param s
 */
function refClassName(s) {
    let propType = s === null || s === void 0 ? void 0 : s.slice(s.lastIndexOf('/') + 1);
    let result = (0, exports.isOpenApiGenerics)(propType)
        ? getGenericsClassNames(propType)
        : toBaseType(trimString(RemoveSpecialCharacters(propType), '_', 'right'));
    // If it starts with a number, add an underscore
    if (!Number.isNaN(Number(result[0])))
        result = '_' + result;
    return result;
}
exports.refClassName = refClassName;
/** Remove special characters */
function RemoveSpecialCharacters(str) {
    return str === null || str === void 0 ? void 0 : str.replace(/[-`~!@#$%^&*()_+<>«»?:"{},.\/;'[\]]/g, '_');
}
exports.RemoveSpecialCharacters = RemoveSpecialCharacters;
function isBaseType(s) {
    return ['boolean', 'number', 'string', 'string', 'Date', 'any'].includes(s);
}
exports.isBaseType = isBaseType;
function toBaseType(s, format) {
    if (s === undefined || s === null || s.length === 0) {
        return 'any | null';
    }
    let result = '';
    switch (s) {
        case 'boolean':
        case 'bool':
        case 'Boolean':
            result = 'boolean';
            break;
        case 'array':
            result = '[]';
            break;
        case 'Int64':
        case 'Int32':
        case 'int':
        case 'integer':
        case 'number':
            result = 'number';
            break;
        case 'Guid':
        case 'String':
        case 'string':
        case 'uuid':
            switch (format) {
                case 'date':
                case 'date-time':
                    result = 'Date';
                    break;
                default:
                    result = 'string';
            }
            break;
        case 'file':
            result = 'any';
            break;
        default:
            result = s;
            break;
    }
    return result;
}
exports.toBaseType = toBaseType;
function getMethodNameByPath(path) {
    const paths = path.split('/');
    for (let i = paths.length - 1; i >= 0; i--) {
        if (/\{.+\}/.test(paths[i]) === false) {
            return paths[i];
        }
    }
    return '';
}
exports.getMethodNameByPath = getMethodNameByPath;
function getClassNameByPath(path) {
    const paths = path.split('/');
    if (paths.length > 1) {
        return paths[paths.length - 2];
    }
    return '';
}
exports.getClassNameByPath = getClassNameByPath;
function trimString(str, char, type) {
    str = str !== null && str !== void 0 ? str : '';
    if (char) {
        if (type == 'left') {
            return str.replace(new RegExp('^\\' + char + '+', 'g'), '');
        }
        else if (type == 'right') {
            return str.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return str.replace(/^\s+|\s+$/g, '');
}
exports.trimString = trimString;
/**
 * Generic class name extraction array
 * A<B<C>> => [A,B,C]
 **/
function genericsToClassNames(modelName) {
    if ((0, exports.isGenerics)(modelName)) {
        const names = modelName.split(/[<>]+/);
        names.pop();
        return names;
    }
    else if (modelName.endsWith('[]'))
        return [modelName.replace('[]', '')];
    else {
        return [modelName];
    }
}
exports.genericsToClassNames = genericsToClassNames;
/**
 *  Array class name to generic class name
 *  [A,B,C] => A<B<C>>
 */
function classNamesToGenerics(classNames) {
    const len = classNames.length;
    if (len > 1) {
        const end = new Array(len).join('>');
        const name = classNames.join('<') + end;
        return name;
    }
    else if (len === 1) {
        return classNames[1];
    }
}
exports.classNamesToGenerics = classNamesToGenerics;
function findDeepRefs(imports, allDefinition, allEnums, currentImports = []) {
    let result = currentImports !== null && currentImports !== void 0 ? currentImports : [];
    for (const model of imports) {
        const modelNames = genericsToClassNames(model);
        for (const modelName of modelNames) {
            let ref = null;
            ref = allDefinition.find(item => modelName === item.name);
            if (ref == null)
                ref = allDefinition.find(item => modelName.startsWith(item.name));
            if (ref && !result.includes(ref.name)) {
                result.push(ref.name);
                if (ref.value.imports.length > 0) {
                    let uniqueImports = [];
                    for (const importItem of ref.value.imports) {
                        if (result.includes(importItem) || uniqueImports.includes(importItem))
                            continue;
                        uniqueImports.push(importItem);
                    }
                    let deepRefs = findDeepRefs(uniqueImports, allDefinition, allEnums, result);
                    if (!!deepRefs) {
                        result = deepRefs;
                    }
                }
            }
            else {
                ref = allEnums.find(item => modelNames.some(modelName => modelName.startsWith(item.name)));
                if (ref) {
                    result.push(ref.name);
                }
            }
        }
    }
    if (imports.includes('AuthUserStationDto')) {
        console.log('result', result);
    }
    return result;
}
exports.findDeepRefs = findDeepRefs;
function isOpenApi3(version) {
    console.log('openApi version：', version);
    return version.startsWith('3.', 0);
}
exports.isOpenApi3 = isOpenApi3;
function getValidationModel(propName, prop, required) {
    let validationModel = {};
    let hasValidationRules = false;
    if (required && required.includes(propName)) {
        validationModel.required = true;
        hasValidationRules = true;
    }
    if (prop.maxLength) {
        validationModel.maxLength = prop.maxLength;
        hasValidationRules = true;
    }
    return hasValidationRules ? validationModel : null;
}
exports.getValidationModel = getValidationModel;
//# sourceMappingURL=utils.js.map