import { IDefinitionProperties, IDefinitionProperty } from "../swaggerInterfaces";
import { propTrueType } from "./propTrueType";
import pascalcase from "pascalcase";
import { IClassDef } from "../baseInterfaces";
import { getValidationModel } from "../utils";


/**
 * generate class definition
 * @param className class name
 * @param properties attribute
 * Whether @param isGenericsType is a generic interface
 */

export function createDefinitionClass(
  className: string,
  properties: IDefinitionProperties,
  additionalProperties: IDefinitionProperty | boolean | undefined,
  required: string[],
) {
  /** enumeration value*/
  let enums = []
  let types = []
  let model: IClassDef = { name: className, props: [], imports: [] }
  const propertiesEntities = Object.entries(properties || {})
  for (const [k, v] of propertiesEntities) {
    let { propType, isEnum, isArray, isType, ref, isUnionType, isCombinedType } = propTrueType(v);
    if (isEnum) {
      let enumName = `Enum${className}${pascalcase(k)}`
      enums.push({
        name: enumName, text: `export enum ${enumName}{
        ${propType}
      }`})
      propType = isArray ? enumName + '[]' : enumName
      ref = enumName
    }
    if (isType) {
      let typeName = `I${className}${pascalcase(k)}`
      enums.push({
        name: typeName, text: `type ${typeName} = ${propType};`
      })
      propType = isArray ? typeName + '[]' : typeName
      ref = typeName
    }
    if (isUnionType) {
      let typeName = `All${pascalcase(k)}Types`
      let types = propType.split(',')
      enums.push({
        name: typeName,
        text: `export type ${typeName} = ${types.join(' | ')};`
      })
      propType = isArray ? typeName + '[]' : typeName
      ref = typeName
      model.imports.push(...types)
    }
    if (isCombinedType) {
      let typeName = `Combined${pascalcase(k)}Types`
      let types = propType.split(',')
      enums.push({
        name: typeName,
        text: `export type ${typeName} = ${types.join(' & ')};`
      })
      propType = isArray ? typeName + '[]' : typeName
      ref = typeName
      model.imports.push(...types)
    }
    // converts a reference value to a reference list
    if (!!ref) {
      model.imports.push(ref)
    }
    let validationModel = getValidationModel(k, v, required);
    model.props.push({ name: k, type: propType, format: v.format, desc: v.description?.replace(/\//g, '\\/'), isType, isEnum, validationModel })
  }
  if (additionalProperties !== undefined) {
    let definition: IDefinitionProperty = additionalProperties as IDefinitionProperty
    switch (typeof additionalProperties) {
        case "boolean":
          if (additionalProperties === false) {
            break
          }
          definition = {type: "object"} as IDefinitionProperty
        case "object":
        default:
          let { propType, isEnum, isArray, isType, ref, isUnionType, isCombinedType } = propTrueType(definition);
          let validationModel = null;
          // Since there are no additional properties the whole object will be of this type
          if (model.props.length == 0) {
            model.props.push({
              name: "[additionalProperties: string]",
              type: propType,
              format: definition.format,
              desc: definition.description?.replace(/\//g, '\\/'),
              isType,
              isEnum,
              validationModel
            }) 
          } else {
            // We will have to use a union type to be able to use additional Properties
            const typeName = `${className}WithAdditionalProperties`
            const types = [className, `{ [additionalProperties: string]: ${propType} }`]
            enums.push({
              name: typeName,
              text: `export type ${typeName} = ${types.join(' & ')};`
            })
          }
      }
  }
  
  return { enums, model }
}