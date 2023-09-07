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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegen = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prettier_1 = __importDefault(require("prettier"));
const axios_1 = __importDefault(require("axios"));
const template_1 = require("./templates/template");
const serviceHeader_1 = require("./templates/serviceHeader");
const utils_1 = require("./utils");
const requestCodegen_1 = require("./requestCodegen");
const componentsCodegen_1 = require("./componentsCodegen");
const definitionCodegen_1 = require("./definitionCodegen");
const camelcase_1 = __importDefault(require("camelcase"));
const defaultOptions = {
    serviceNameSuffix: 'Service',
    enumNamePrefix: 'Enum',
    methodNameMode: 'operationId',
    classNameMode: 'normal',
    PathClassNameDefaultName: 'Global',
    outputDir: './service',
    fileName: 'index.ts',
    // useStaticMethod: true,
    useCustomerRequestInstance: false,
    modelMode: 'interface',
    include: [],
    includeTypes: [],
    strictNullChecks: true,
    useClassTransformer: false,
    extendGenericType: [],
    multipleFileMode: false,
    // sharedServiceOptions: false,
    useHeaderParameters: false
};
/** main */
function codegen(params) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.time('finish');
        let err;
        let swaggerSource;
        let swaggerSpecFileName = `./${params.fileName}_cache_swagger.json`;
        (0, utils_1.setDefinedGenericTypes)(params.extendGenericType);
        // Get the interface definition file
        try {
            if (params.remoteUrl) {
                const { data: swaggerJson } = yield (0, axios_1.default)({ url: params.remoteUrl, responseType: 'text' });
                if (Object.prototype.toString.call(swaggerJson) === '[object String]') {
                    fs.writeFileSync(swaggerSpecFileName, swaggerJson);
                    swaggerSource = require(path.resolve(swaggerSpecFileName));
                }
                else {
                    swaggerSource = swaggerJson;
                }
            }
            else if (params.source) {
                swaggerSource = params.source;
            }
            else {
                throw new Error('remoteUrl or source must have a value');
            }
        }
        catch (error) {
            console.log('loaded spec document fail!', (_a = params.remoteUrl) !== null && _a !== void 0 ? _a : params.source);
            return;
        }
        const options = Object.assign(Object.assign({}, defaultOptions), params);
        let apiSource = '';
        let serviceHeaderSource = options.useCustomerRequestInstance ? (0, serviceHeader_1.customerServiceHeader)(options) : (0, serviceHeader_1.serviceHeader)(options);
        if (true) {
            writeFile(options.outputDir || '', 'service-options.ts' || '', format(serviceHeaderSource, options));
            apiSource += `import { IRequestOptions, IRequestConfig, IFetchConfig, getConfigs } from "./service-options";
    
    `;
        }
        else {
            apiSource += serviceHeaderSource;
        }
        // Changing to basePath everywhere allows multi-file mode to be used
        apiSource += `export const basePath = '${(0, utils_1.trimString)(swaggerSource.basePath, '/', 'right')}'`;
        apiSource += (0, serviceHeader_1.definitionHeader)(options.extendDefinitionFile);
        // Determine whether it is open api3.0 or swagger3.0
        const isV3 = (0, utils_1.isOpenApi3)(params.openApi || swaggerSource.openapi || swaggerSource.swagger);
        // TODO: use filter plugin
        // filter by url
        let paths = swaggerSource.paths;
        if (((_b = options.urlFilters) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            paths = {};
            Object.keys(swaggerSource.paths).forEach(path => {
                if (options.urlFilters.some(urlFilter => urlFilter.indexOf(path) > -1)) {
                    paths[path] = swaggerSource.paths[path];
                }
            });
        }
        let requestClass = (0, requestCodegen_1.requestCodegen)(paths, isV3, options);
        const { models, enums } = isV3
            ? (0, componentsCodegen_1.componentsCodegen)(swaggerSource.components)
            : (0, definitionCodegen_1.definitionsCodeGen)(swaggerSource.definitions);
        let _allModel = Object.values(models);
        let _allEnum = Object.values(enums);
        // TODO: next next next time
        // if (options.multipleFileMode) {
        //   Object.entries(requestCodegen(swaggerSource.paths, isV3, options)).forEach(([className, requests]) => {
        //     let text = ''
        //     let allImport: string[] = []
        //     requests.forEach(req => {
        //       const reqName = options.methodNameMode == 'operationId' ? req.operationId : req.name
        //       if ('register' === reqName) {
        //         // console.log('req.requestSchema.parsedParameters.imports', JSON.stringify(req.requestSchema.parsedParameters.imports));
        //       }
        //       text += requestTemplate(reqName, req.requestSchema, options)
        //       let imports = findDeepRefs(req.requestSchema.parsedParameters.imports, _allModel, _allEnum)
        //       allImport = allImport.concat(imports)
        //     })
        //     // unique import
        //     const uniqueImports: string[] = []
        //     allImport.push(...getDefinedGenericTypes(), 'IRequestOptions', 'IRequestConfig', 'getConfigs', 'axios', 'basePath')
        //     for (const item of allImport) {
        //       if (!uniqueImports.includes(item)) uniqueImports.push(item)
        //     }
        //     console.log(disableLint());
        //     text = disableLint() + text
        //     console.log({
        //       className,
        //       options
        //     })
        //     text = serviceTemplate(className + options.serviceNameSuffix, text, uniqueImports)
        //     writeFile(options.outputDir || '', className + 'Service.ts', format(text, options))
        //   })
        //   let defsString = ''
        //   Object.values(models).forEach(item => {
        //     const text =
        //       params.modelMode === 'interface'
        //         ? interfaceTemplate(item.value.name, item.value.props, [], params.strictNullChecks)
        //         : classTemplate(
        //           item.value.name,
        //           item.value.props,
        //           [],
        //           params.strictNullChecks,
        //           options.useClassTransformer,
        //           options.generateValidationModel
        //         )
        //     defsString += text
        //   })
        //   Object.values(enums).forEach(item => {
        //     let text = ''
        //     if (item.value) {
        //       if (item.value.type == 'string') {
        //         text = enumTemplate(item.value.name, item.value.enumProps, options.enumNamePrefix)
        //       } else {
        //         text = typeTemplate(item.value.name, item.value.enumProps, options.enumNamePrefix)
        //       }
        //     } else {
        //       text = item.content || ''
        //     }
        //     defsString += text
        //   })
        //   defsString = apiSource + defsString
        //   writeFile(options.outputDir || '', 'index.defs.ts', format(defsString, options))
        // } else if (options.include && options.include.length > 0) {
        //   // TODO: use filter plugin
        //   // codegenMultimatchInclude(apiSource, options, requestClass, models, enums)
        // }
        // else {
        codegenAll(apiSource, options, requestClass, models, enums);
        // }
        if (fs.existsSync(swaggerSpecFileName)) {
            fs.unlinkSync(swaggerSpecFileName);
        }
        console.timeEnd('finish');
        if (err) {
            throw err;
        }
    });
}
exports.codegen = codegen;
/** codegenAll */
function codegenAll(apiSource, options, requestClass, models, enums) {
    let requestClasses = Object.entries(requestClass);
    // regular entrance
    try {
        // processing interface
        requestClasses.forEach(([className, requests]) => {
            let text = '';
            let textPath = "";
            requests.forEach(req => {
                const reqName = options.methodNameMode == 'operationId' ? req.operationId : req.name;
                text += (0, template_1.requestTemplate)(reqName, req.requestSchema, options);
                textPath += (0, template_1.requestPathTemplate)(reqName, req.requestSchema, options);
            });
            const name = (0, camelcase_1.default)((0, utils_1.RemoveSpecialCharacters)(className + options.serviceNameSuffix));
            text = (0, template_1.serviceTemplate)(name, text);
            textPath = (0, template_1.servicePathTemplate)(name, textPath);
            apiSource += textPath;
            apiSource += text;
        });
        let exportText = `\nexport const services = (fetch: IFetchConfig) => ({\n`;
        requestClasses.forEach(([className, requests]) => {
            const name = (0, camelcase_1.default)((0, utils_1.RemoveSpecialCharacters)(className + options.serviceNameSuffix));
            exportText += `  ${name}: ${name}(fetch),\n`;
        });
        exportText += `})\n\n`;
        apiSource += exportText;
        // Handling classes and enums
        Object.values(models).forEach(item => {
            const text = options.modelMode === 'interface'
                ? (0, template_1.interfaceTemplate)(item.value.name, item.value.props, [], options.strictNullChecks)
                : (0, template_1.classTemplate)(item.value.name, item.value.props, [], options.strictNullChecks, options.useClassTransformer, options.generateValidationModel);
            apiSource += text;
        });
        Object.values(enums).forEach(item => {
            let text = '';
            if (item.value) {
                if (item.value.type == 'string') {
                    text = (0, template_1.enumTemplate)(item.value.name, item.value.enumProps, options.enumNamePrefix);
                }
                else {
                    text = (0, template_1.typeTemplate)(item.value.name, item.value.enumProps, options.enumNamePrefix);
                }
            }
            else {
                text = item.content || '';
            }
            apiSource += text;
        });
        apiSource = (0, serviceHeader_1.disableLint)() + apiSource;
        writeFile(options.outputDir || '', options.fileName || '', format(apiSource, options));
    }
    catch (error) {
        console.log('error', error);
        throw error;
    }
}
/** current multimatch codegen */
// function codegenMultimatchInclude(
//   apiSource: string,
//   options: ISwaggerOptions,
//   requestClass: IRequestClass,
//   models: IDefinitionClasses,
//   enums: IDefinitionEnums
// ) {
//   let requestClasses = Object.entries(requestClass)
//  // Interface Filter Ingress
//   let reqSource = ''
//   let defSource = ''
//   let allModel = Object.values(models)
//   // console.log(allModel)
//   let allEnum = Object.values(enums)
//   let allImport: string[] = []
//   // #region Processing Match Sets
//   const sourceClassNames = requestClasses.map(v => {
//     const className = v[0]
//     return className
//   })
//   const includeRules: Record<string, Set<string>> = {}
//   options.include.forEach(classNameFilter => {
//     // *,?,**,{},!, 
//     // NOTICE: Currently className is required to be written in strict accordance with pascalcase
//     if (typeof classNameFilter === 'string') {
//       if (includeRules[classNameFilter] === undefined) {
//         includeRules[classNameFilter] = new Set()
//       }
//       includeRules[classNameFilter].add('*')
//     } else {
//       Object.keys(classNameFilter).forEach(key => {
//         if (includeRules[key] === undefined) {
//           includeRules[key] = new Set()
//         }
//         classNameFilter[key].forEach(requestFilter =>
//           includeRules[key].add(requestFilter)
//         )
//       })
//     }
//   })
//   const matchedClassNames = multimatch(sourceClassNames, Object.keys(includeRules))
//   const requiredClassNameMap: Record<string, Set<string>> = {}
//   Object.keys(includeRules).forEach(classNameFilter => {
//     // matched tagnames
//     const requiredClassNames = multimatch(matchedClassNames, classNameFilter)
//     requiredClassNames.forEach(className => {
//       if (requiredClassNameMap[className] === undefined) {
//         requiredClassNameMap[className] = new Set()
//       }
//       includeRules[classNameFilter].forEach(requestFilter =>
//         requiredClassNameMap[className].add(requestFilter)
//       )
//     })
//   })
//   // #endregion
//   // processing interface
//   requestClasses.forEach(([className, requests]) => {
//     const includeRequestsFilters = requiredClassNameMap[className]
//     if (includeRequestsFilters) {
//       let text = ''
//       const requestKeyMap: Record<string, IRequestMethods> = {}
//       const requestKeys = requests.map(v => {
//         const reqName = options.methodNameMode == 'operationId' ? v.operationId : v.name
//         requestKeyMap[reqName] = v
//         return reqName
//       })
//       const requsetRules = Array.from(includeRequestsFilters)
//       const requiredRequestKeys = multimatch(requestKeys, Array.from(requsetRules))
//       requiredRequestKeys.forEach(reqName => {
//         const req = requestKeyMap[reqName]
//         text += requestTemplate(reqName, req.requestSchema, options)
//         let imports = findDeepRefs(req.requestSchema.parsedParameters.imports, allModel, allEnum)
//         allImport = allImport.concat(imports)
//       })
//       console.log({
//         className,
//         options
//       })
//       text = serviceTemplate(className + options.serviceNameSuffix, text)
//       apiSource += text
//     }
//   })
//   allModel.forEach(item => {
//     if (allImport.includes(item.name) || options.includeTypes.includes(item.name)) {
//       const text =
//         options.modelMode === 'interface'
//           ? interfaceTemplate(item.value.name, item.value.props, [], options.strictNullChecks)
//           : classTemplate(
//             item.value.name,
//             item.value.props,
//             [],
//             options.strictNullChecks,
//             options.useClassTransformer,
//             options.generateValidationModel
//           )
//       defSource += text
//     }
//   })
//   allEnum.forEach(item => {
//     if (allImport.includes(item.name) || options.includeTypes.includes(item.name)) {
//       let text = ''
//       if (item.value) {
//         if (item.value.type == 'string') {
//           text = enumTemplate(item.value.name, item.value.enumProps, options.enumNamePrefix)
//         } else {
//           text = typeTemplate(item.value.name, item.value.enumProps, options.enumNamePrefix)
//         }
//       } else {
//         text = item.content || ''
//       }
//       defSource += text
//     }
//   })
//   apiSource = disableLint() + apiSource
//   apiSource += reqSource + defSource
//   writeFile(options.outputDir || '', options.fileName || '', format(apiSource, options))
// }
function writeFile(fileDir, name, data) {
    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir);
    }
    const filename = path.join(fileDir, name);
    fs.writeFileSync(filename, data);
}
function format(text, options) {
    if (options.format) {
        return options.format(text);
    }
    return prettier_1.default.format(text, {
        printWidth: 120,
        tabWidth: 2,
        parser: 'typescript',
        trailingComma: 'none',
        jsxBracketSameLine: false,
        semi: true,
        singleQuote: true
    });
}
//# sourceMappingURL=index.js.map