import { refClassName, toBaseType } from '../utils'
import { IDefinitionProperty } from '../swaggerInterfaces'

export function propTrueType(
  v: IDefinitionProperty
): {
  propType: string,
  isEnum: boolean,
  isArray: boolean,
  isType: boolean,
  ref: string
} {
  let result = {
    propType: '',
    isEnum: false,
    isArray: false,
    /**ts type definition */
    isType: false,
    ref: ''
  }
  if (v.$ref) {
    // Is a reference type
    result.propType = refClassName(v.$ref)
    result.ref = result.propType
  }
  //Is an array
  else if (v.items) {
    if (v.items.$ref) {
      // Is a reference type
      result.ref = refClassName(v.items.$ref)
      result.propType = result.ref + '[]'
    } else {
      if (v.items.type === 'array') {
        const currentResult = propTrueType(v.items)
        result = { ...result, ...currentResult }
      } else if (!!v.items.enum) {
        const currentResult = propTrueType(v.items)
        result = { ...result, ...currentResult }
      } else {
        result.propType = toBaseType(v.items.type) + '[]'
      }
    }
    result.isArray = true
  }
  // Is an enum and is of type string
  else if (v.enum && v.type === 'string') {
    result.isEnum = true
    result.propType = getEnums(v.enum)
      .map(item => (isNaN(item) ? `'${item}'='${item}'` : `'KEY_${item}'='${item}'`))
      .join(',')
  } else if (v.enum) {
    result.isType = true
    result.propType =
      v.type === 'string'
        ? getEnums(v.enum)
            .map(item => `'${item}'`)
            .join('|')
        : v.enum.join('|')
  }
  // Basic type
  else {
    result.propType = toBaseType(v.type)
  }
  return result
}

function getEnums(enumObject: any): any[] {
  return Object.prototype.toString.call(enumObject) === '[object Object]' ? Object.values(enumObject) : enumObject
}
