import { IDefinitionProperties, IDefinitionProperty } from "../swaggerInterfaces";
import { IClassDef } from "../baseInterfaces";
/**
 * generate class definition
 * @param className class name
 * @param properties attribute
 * Whether @param isGenericsType is a generic interface
 */
export declare function createDefinitionClass(className: string, properties: IDefinitionProperties, additionalProperties: IDefinitionProperty | boolean | undefined, required: string[]): {
    enums: {
        name: string;
        text: string;
    }[];
    model: IClassDef;
};
