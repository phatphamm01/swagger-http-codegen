import { IEnumDef } from '../baseInterfaces'

/**
 * generate class definition
 * @param className class name
 * @param enum enumeration list
 * @param type the type of enumeration
 */
export function createDefinitionEnum(className: string, enumArray: any[], type: string): IEnumDef {
  const result =
    type === 'string'
      ? enumArray.map(item => (isNaN(item) ? `'${item}'='${item}'` : `'KEY_${item}'='${item}'`)).join(',')
      : enumArray.join('|')
  return { name: className, enumProps: result, type: type }
}
