import { IDefinitionProperties } from '../swaggerInterfaces'
import { propTrueType } from './propTrueType'
import pascalcase from 'pascalcase'
import { IClassDef } from '../baseInterfaces'
import { getValidationModel } from '../utils'

/**
 * generate class definition
 * @param className class name
 * @param properties attribute
 * Whether @param isGenericsType is a generic interface
 */

export function createDefinitionClass(className: string, properties: IDefinitionProperties, required: string[]) {
  /** enumeration value*/
  let enums = []
  let model: IClassDef = { name: className, props: [], imports: [] }
  const propertiesEntities = Object.entries(properties || {})
  for (const [k, v] of propertiesEntities) {
    let { propType, isEnum, isArray, isType, ref } = propTrueType(v)
    if (isEnum) {
      let enumName = `Enum${className}${pascalcase(k)}`
      enums.push({
        name: enumName,
        text: `export enum ${enumName}{
        ${propType}
      }`
      })
      propType = isArray ? enumName + '[]' : enumName
      ref = enumName
    }
    if (isType) {
      let typeName = `I${className}${pascalcase(k)}`
      enums.push({
        name: typeName,
        text: `type ${typeName} = ${propType};`
      })
      propType = isArray ? typeName + '[]' : typeName
      ref = typeName
    }
    // converts a reference value to a reference list
    if (!!ref) {
      model.imports.push(ref)
    }
    let validationModel = getValidationModel(k, v, required)
    model.props.push({
      name: k,
      type: propType,
      format: v.format,
      desc: v.description?.replace(/\//g, '/'),
      isType,
      isEnum,
      validationModel
    })
  }

  return { enums, model }
}
