import { IDefinitionClass, IDefinitionEnum } from './baseInterfaces'
import { IDefinitionProperty } from './swaggerInterfaces'

let definedGenericTypes: string[] = []
const UniversalGenericTypes = ['IList', 'List']
const AbpGenericTypes = ['IListResult', 'ListResultDto', 'IPagedResult', 'PagedResultDto', 'Dictionary', 'IDictionary']

// Is it an interface type
export const isOpenApiGenerics = (s: string) => /^.+\[.+\]$/.test(s) || /^.+\«.+\»$/.test(s) || /^.+\<.+\>$/.test(s)

export const isGenerics = (s: string) => {
  return /^.+\<.+\>$/.test(s)
}
export const isDefinedGenericTypes = (x: string) => definedGenericTypes.some(i => i === x)

export function setDefinedGenericTypes(types: string[] = []) {
  definedGenericTypes.push(...UniversalGenericTypes, ...AbpGenericTypes, ...types)
}

export const getDefinedGenericTypes = () => definedGenericTypes

/**
 * Breaking down generic interfaces
 * @param definitionClassName
 */
export function getGenericsClassNames(definitionClassName: string): string {
  let str = ''
  let split_key = ''
  if (/^.+\[.+\]$/.test(definitionClassName)) {
    split_key = '['
  } else if (/^.+\«.+\»$/.test(definitionClassName)) {
    split_key = '«'
  } else if (/^.+\<.+\>$/.test(definitionClassName)) {
    split_key = '<'
  }
  if (split_key !== '') {
    const splitIndex = definitionClassName.indexOf(split_key)
    // Generic base class PagedResultDto PagedResultDto
    const interfaceClassName = definitionClassName.slice(0, splitIndex)
    // The type name of the generic type T
    const TClassName = definitionClassName.slice(splitIndex + 1, -1)
    if (isDefinedGenericTypes(interfaceClassName)) {
      str =
        interfaceClassName === 'IDictionary' || interfaceClassName === 'Dictionary'
          ? `${interfaceClassName}<object>`
          : `${interfaceClassName}<${refClassName(TClassName)}>`
    } else {
      str = trimString(RemoveSpecialCharacters(definitionClassName), '_', 'right')
    }
  } else {
    str = toBaseType(trimString(RemoveSpecialCharacters(definitionClassName), '_', 'right'))
  }
  return str
}

/**
 * Get reference type
 * @param s
 */
export function refClassName(s: string): string {
  // let propType = s?.slice(s.lastIndexOf('/') + 1)
  // let result = isOpenApiGenerics(propType)
  //   ? getGenericsClassNames(propType)
  //   : toBaseType(trimString(RemoveSpecialCharacters(propType), '_', 'right'))

  // // If it starts with a number, add an underscore
  // if (!Number.isNaN(Number(result[0]))) result = '_' + result
  // return result

  return s.split('.').pop() || s
}

/** Remove special characters */
export function RemoveSpecialCharacters(str: string) {
  return str?.replace(/[-`~!@#$%^&*()_+<>«»?:"{},.\/;'[\]]/g, '_')
}

export function isBaseType(s: string) {
  return ['boolean', 'number', 'string', 'string', 'Date', 'any'].includes(s)
}

export function toBaseType(s: string, format?: string) {
  if (s === undefined || s === null || s.length === 0) {
    return 'any | null'
  }
  let result = ''
  switch (s) {
    case 'boolean':
    case 'bool':
    case 'Boolean':
      result = 'boolean'
      break
    case 'array':
      result = '[]'
      break
    case 'Int64':
    case 'Int32':
    case 'int':
    case 'integer':
    case 'number':
      result = 'number'
      break
    case 'Guid':
    case 'String':
    case 'string':
    case 'uuid':
      switch (format) {
        case 'date':
        case 'date-time':
          result = 'Date'
          break
        default:
          result = 'string'
      }
      break
    case 'file':
      result = 'any'
      break
    default:
      result = s
      break
  }
  return result
}

export function getMethodNameByPath(path: string) {
  const paths = path.split('/')
  for (let i = paths.length - 1; i >= 0; i--) {
    if (/\{.+\}/.test(paths[i]) === false) {
      return paths[i]
    }
  }
  return ''
}

export function getClassNameByPath(path: string) {
  const paths = path.split('/')
  if (paths.length > 1) {
    return paths[paths.length - 2]
  }
  return ''
}

export function trimString(str: string, char: string, type: string) {
  str = str ?? ''
  if (char) {
    if (type == 'left') {
      return str.replace(new RegExp('^\\' + char + '+', 'g'), '')
    } else if (type == 'right') {
      return str.replace(new RegExp('\\' + char + '+$', 'g'), '')
    }
    return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '')
  }
  return str.replace(/^\s+|\s+$/g, '')
}

/**
 * Generic class name extraction array
 * A<B<C>> => [A,B,C]
 **/
export function genericsToClassNames(modelName: string) {
  if (isGenerics(modelName)) {
    const names = modelName.split(/[<>]+/)
    names.pop()
    return names
  } else if (modelName.endsWith('[]')) return [modelName.replace('[]', '')]
  else {
    return [modelName]
  }
}
/**
 *  Array class name to generic class name
 *  [A,B,C] => A<B<C>>
 */
export function classNamesToGenerics(classNames: string[]) {
  const len = classNames.length
  if (len > 1) {
    const end = new Array(len).join('>')
    const name = classNames.join('<') + end
    return name
  } else if (len === 1) {
    return classNames[1]
  }
}

export function findDeepRefs(
  imports: string[],
  allDefinition: IDefinitionClass[],
  allEnums: IDefinitionEnum[],
  currentImports: string[] = []
) {
  let result: string[] = currentImports ?? []

  for (const model of imports) {
    const modelNames = genericsToClassNames(model)
    for (const modelName of modelNames) {
      let ref = null
      ref = allDefinition.find(item => modelName === item.name)
      if (ref == null) ref = allDefinition.find(item => modelName.startsWith(item.name))
      if (ref && !result.includes(ref.name)) {
        result.push(ref.name)

        if (ref.value.imports.length > 0) {
          let uniqueImports: string[] = []
          for (const importItem of ref.value.imports) {
            if (result.includes(importItem) || uniqueImports.includes(importItem)) continue
            uniqueImports.push(importItem)
          }

          let deepRefs = findDeepRefs(uniqueImports, allDefinition, allEnums, result)
          if (!!deepRefs) {
            result = deepRefs
          }
        }
      } else {
        ref = allEnums.find(item => modelNames.some(modelName => modelName.startsWith(item.name)))
        if (ref) {
          result.push(ref.name)
        }
      }
    }
  }

  if (imports.includes('AuthUserStationDto')) {
    console.log('result', result)
  }

  return result
}

export function isOpenApi3(version: string) {
  console.log('openApi version：', version)
  return version.startsWith('3.', 0)
}

export function getValidationModel(propName: string, prop: IDefinitionProperty, required: string[]) {
  let validationModel: any = {}
  let hasValidationRules = false
  if (required && required.includes(propName)) {
    validationModel.required = true
    hasValidationRules = true
  }
  if (prop.maxLength) {
    validationModel.maxLength = prop.maxLength
    hasValidationRules = true
  }
  return hasValidationRules ? validationModel : null
}
