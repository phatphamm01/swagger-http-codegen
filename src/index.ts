import * as fs from 'fs'
import * as path from 'path'
import prettier from 'prettier'
import axios from 'axios'
import pascalcase from 'pascalcase'
import multimatch from 'multimatch';
import { ISwaggerOptions, IInclude, IDefinitionClasses, IDefinitionEnums } from './baseInterfaces'
import { ISwaggerSource } from './swaggerInterfaces'
import {
  requestTemplate,
  serviceTemplate,
  enumTemplate,
  interfaceTemplate,
  classTemplate,
  typeTemplate
} from './templates/template'
import { customerServiceHeader, serviceHeader, definitionHeader, disableLint } from './templates/serviceHeader'
import { isOpenApi3, findDeepRefs, setDefinedGenericTypes, getDefinedGenericTypes, trimString, RemoveSpecialCharacters } from './utils'
import { requestCodegen, IRequestClass, IRequestMethods } from './requestCodegen'
import { componentsCodegen } from './componentsCodegen'
import { definitionsCodeGen } from './definitionCodegen'
import camelcase from 'camelcase'

const defaultOptions: ISwaggerOptions = {
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
}

/** main */
export async function codegen(params: ISwaggerOptions) {
  console.time('finish')
  let err
  let swaggerSource: ISwaggerSource
  let swaggerSpecFileName = `./${params.fileName}_cache_swagger.json`
  setDefinedGenericTypes(params.extendGenericType)
  // Get the interface definition file

  try {
    if (params.remoteUrl) {
      const { data: swaggerJson } = await axios({ url: params.remoteUrl, responseType: 'text' })
      if (Object.prototype.toString.call(swaggerJson) === '[object String]') {
        fs.writeFileSync(swaggerSpecFileName, swaggerJson)
        swaggerSource = require(path.resolve(swaggerSpecFileName))
      } else {
        swaggerSource = <ISwaggerSource>swaggerJson
      }
    } else if (params.source) {
      swaggerSource = <ISwaggerSource>params.source
    } else {
      throw new Error('remoteUrl or source must have a value')
    }
  } catch (error) {
    console.log('loaded spec document fail!', params.remoteUrl ?? params.source)
    return
  }

  const options: ISwaggerOptions = {
    ...defaultOptions,
    ...params
  }
  let apiSource = ''

  let serviceHeaderSource = options.useCustomerRequestInstance ? customerServiceHeader(options) : serviceHeader(options)
  // if (options.sharedServiceOptions) {
  if (true) {
    writeFile(options.outputDir || '', 'serviceOptions.ts' || '', format(serviceHeaderSource, options))
    apiSource += `import { IRequestOptions, IRequestConfig, IFetchConfig, getConfigs } from "./serviceOptions";
    
    `

  }
  else {
    apiSource += serviceHeaderSource
  }
  // Changing to basePath everywhere allows multi-file mode to be used
  apiSource += `export const basePath = '${trimString(swaggerSource.basePath, '/', 'right')}'`;
  apiSource += definitionHeader(options.extendDefinitionFile)

  // Determine whether it is open api3.0 or swagger3.0
  const isV3 = isOpenApi3(params.openApi || swaggerSource.openapi || swaggerSource.swagger)

  // TODO: use filter plugin
  // filter by url
  let paths = swaggerSource.paths
  if (options.urlFilters?.length > 0) {
    paths = {}
    Object.keys(swaggerSource.paths).forEach(path => {
      if (options.urlFilters.some(urlFilter => urlFilter.indexOf(path) > -1)) {
        paths[path] = swaggerSource.paths[path]
      }
    })
  }

  let requestClass = requestCodegen(paths, isV3, options)

  const { models, enums } = isV3
    ? componentsCodegen(swaggerSource.components)
    : definitionsCodeGen(swaggerSource.definitions)

  let _allModel = Object.values(models)
  let _allEnum = Object.values(enums)
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
  codegenAll(apiSource, options, requestClass, models, enums)
  // }
  if (fs.existsSync(swaggerSpecFileName)) {
    fs.unlinkSync(swaggerSpecFileName)
  }
  console.timeEnd('finish')
  if (err) {
    throw err
  }
}


/** codegenAll */
function codegenAll(
  apiSource: string,
  options: ISwaggerOptions,
  requestClass: IRequestClass,
  models: IDefinitionClasses,
  enums: IDefinitionEnums
) {
  let requestClasses = Object.entries(requestClass)
  // regular entrance
  try {
    // processing interface
    requestClasses.forEach(([className, requests]) => {
      let text = ''
      requests.forEach(req => {
        const reqName = options.methodNameMode == 'operationId' ? req.operationId : req.name
        text += requestTemplate(reqName, req.requestSchema, options)
      })
      const name = camelcase(RemoveSpecialCharacters(className + options.serviceNameSuffix))
      text = serviceTemplate(name, text)
      apiSource += text
    })

    let exportText = `\nexport const services = (fetch: IFetchConfig) => ({\n`
    requestClasses.forEach(([className, requests]) => {
      const name = camelcase(RemoveSpecialCharacters(className + options.serviceNameSuffix))
      exportText +=  `  ${name}: ${name}(fetch),\n`
    })
    exportText  +=  `})\n\n`
    apiSource += exportText

    // Handling classes and enums
    Object.values(models).forEach(item => {
      const text =
        options.modelMode === 'interface'
          ? interfaceTemplate(item.value.name, item.value.props, [], options.strictNullChecks)
          : classTemplate(
            item.value.name,
            item.value.props,
            [],
            options.strictNullChecks,
            options.useClassTransformer,
            options.generateValidationModel
          )
      apiSource += text
    })

    Object.values(enums).forEach(item => {
      let text = ''
      if (item.value) {
        if (item.value.type == 'string') {
          text = enumTemplate(item.value.name, item.value.enumProps, options.enumNamePrefix)
        } else {
          text = typeTemplate(item.value.name, item.value.enumProps, options.enumNamePrefix)
        }
      } else {
        text = item.content || ''
      }
      apiSource += text
    })

    apiSource = disableLint() + apiSource
    writeFile(options.outputDir || '', options.fileName || '', format(apiSource, options))
  } catch (error) {
    console.log('error', error)
    throw error
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


function writeFile(fileDir: string, name: string, data: any) {
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir)
  }
  const filename = path.join(fileDir, name)
  fs.writeFileSync(filename, data)
}

function format(text: string, options: ISwaggerOptions) {
  if (options.format) {
    return options.format(text)
  }
  return prettier.format(text, {
    printWidth: 120,
    tabWidth: 2,
    parser: 'typescript',
    trailingComma: 'none',
    jsxBracketSameLine: false,
    semi: true,
    singleQuote: true
  })
}
