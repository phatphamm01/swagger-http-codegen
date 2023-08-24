import { IParameter } from '../swaggerInterfaces'

import { refClassName, toBaseType, RemoveSpecialCharacters } from '../utils'

import camelcase from 'camelcase'

/**
 * 参数去重
 * 后台书写不规范,存在参数重名的情况
 * @param params
 */
function getUniqParams(params: IParameter[]): IParameter[] {
  const uniqParams: Record<string, IParameter> = {}
  params.forEach((v: any) => {
    // _${v.in}
    // TODO: How to deal with the same name but v.in=query|path|body at the same time? Separate different request parameters?
    if ('$ref' in v && !('name' in v)) {
      v.name = refClassName(v.$ref)
    }
    if (!v.name.includes('[0]')) {
      //This parameter will appear when there is a List<T> in the DTO class (list[0].prop)
      uniqParams[`${v.name}`] = v
    }
  })
  return Object.values(uniqParams)
}

/**
 * Generate parameters
 * @param params
 */
export function getRequestParameters(params: IParameter[], useHeaderParameters: boolean) {
  params = getUniqParams(params)
  let requestParameters = ''
  let requestFormData = ''
  let requestPathReplace = ''
  let queryParameters: string[] = []
  let bodyParameters: string[] = []
  let headerParameters: string[] = []
  let imports: string[] = []
  let moreBodyParams = params.filter(item => item.in === 'body').length > 1
  params.forEach(p => {
    // Skip the parameters in the request header according to the settings
    if (!useHeaderParameters && p.in === 'header') return
    let propType = ''
    // reference type definition
    if (p.schema) {
      if (p.schema.items) {
        propType = refClassName(p.schema.items.$ref)
        if (p.schema.type && p.schema.type === 'array') {
          propType += '[]'
        }
      } else if (p.schema.$ref) {
        propType = refClassName(p.schema.$ref)
      } else if (p.schema.type) {
        propType = toBaseType(p.schema.type)
      } else {
        throw new Error('Could not find property type on schema')
      }
      imports.push(propType)
    } else if (p.items) {
      propType = p.items.$ref ? refClassName(p.items.$ref) + '[]' : toBaseType(p.items.type) + '[]'
      imports.push(propType)
    }
    // basic type
    else {
      propType = toBaseType(p.type)
    }

    const paramName = camelcase(p.name)
    requestParameters += `
    /** ${p.description || ''} */
    ${paramName}${p.required ? '' : '?'}:${propType},`

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
      `
    } else if (p.in === 'path') {
      requestPathReplace += `url = url.replace('{${p.name}}',params['${paramName}']+'')\n`
    } else if (p.in === 'query') {
      queryParameters.push(`'${p.name}':params['${paramName}']`)
    } else if (p.in === 'body') {
      const body = moreBodyParams ? `'${p.name}':params['${paramName}']` : `params['${paramName}']`
      bodyParameters.push(body)
    } else if (p.in === 'header') {
      headerParameters.push(`'${p.name}':params['${paramName}']`)
    }
  })
  const bodyParameter = moreBodyParams ? `{${bodyParameters.join(',')}}` : bodyParameters.join(',')
  return {
    requestParameters,
    requestFormData,
    requestPathReplace,
    queryParameters,
    bodyParameter,
    headerParameters,
    imports
  }
}
