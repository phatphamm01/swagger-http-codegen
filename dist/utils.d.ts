import { IDefinitionClass, IDefinitionEnum } from './baseInterfaces';
import { IDefinitionProperty } from './swaggerInterfaces';
export declare const isOpenApiGenerics: (s: string) => boolean;
export declare const isGenerics: (s: string) => boolean;
export declare const isDefinedGenericTypes: (x: string) => boolean;
export declare function setDefinedGenericTypes(types?: string[]): void;
export declare const getDefinedGenericTypes: () => string[];
/**
 * Breaking down generic interfaces
 * @param definitionClassName
 */
export declare function getGenericsClassNames(definitionClassName: string): string;
/**
 * Get reference type
 * @param s
 */
export declare function refClassName(s: string): string;
/** Remove special characters */
export declare function RemoveSpecialCharacters(str: string): string;
export declare function isBaseType(s: string): boolean;
export declare function toBaseType(s: string, format?: string): string;
export declare function getMethodNameByPath(path: string): string;
export declare function getClassNameByPath(path: string): string;
export declare function trimString(str: string, char: string, type: string): string;
/**
 * Generic class name extraction array
 * A<B<C>> => [A,B,C]
 **/
export declare function genericsToClassNames(modelName: string): string[];
/**
 *  Array class name to generic class name
 *  [A,B,C] => A<B<C>>
 */
export declare function classNamesToGenerics(classNames: string[]): string;
export declare function findDeepRefs(imports: string[], allDefinition: IDefinitionClass[], allEnums: IDefinitionEnum[], currentImports?: string[]): string[];
export declare function isOpenApi3(version: string): boolean;
export declare function getValidationModel(propName: string, prop: IDefinitionProperty, required: string[]): any;
