import { IPropDef } from '../baseInterfaces';
/** 类模板 */
export declare function interfaceTemplate(name: string, props: IPropDef[], imports: string[], strictNullChecks?: boolean): string;
export declare function classTemplate(name: string, props: IPropDef[], imports: string[], strictNullChecks: boolean, useClassTransformer: boolean, generateValidationModel: boolean): string;
/** class attribute template*/
export declare function classPropsTemplate(filedName: string, type: string, format: string, description: string, canNull: boolean, useClassTransformer: boolean, isType: boolean): string;
export declare function propValidationModelTemplate(filedName: string, validationModel: object): string;
export declare function classValidationModelTemplate(props: IPropDef[]): string;
export declare function classTransformTemplate(type: string, format: string, isType: boolean): string;
/** class attribute template*/
export declare function classConstructorTemplate(name: string): string;
/** enumerate*/
export declare function enumTemplate(name: string, enumString: string, prefix?: string): string;
export declare function typeTemplate(name: string, typeString: string, prefix?: string): string;
interface IRequestSchema {
    summary: string;
    parameters: string;
    responseType: string;
    method: string;
    contentType: string;
    path: string;
    pathReplace: string;
    parsedParameters: any;
    formData: string;
    requestBody: any;
}
/** requestTemplate */
export declare function requestTemplate(name: string, requestSchema: IRequestSchema, options: any): string;
export declare function requestPathTemplate(name: string, requestSchema: IRequestSchema, options: any): string;
/** serviceTemplate */
export declare function serviceTemplate(name: string, body: string, imports?: string[]): string;
export declare function servicePathTemplate(name: string, body: string): string;
export {};
