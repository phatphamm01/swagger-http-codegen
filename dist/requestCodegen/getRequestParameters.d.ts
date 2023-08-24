import { IParameter } from '../swaggerInterfaces';
/**
 * Generate parameters
 * @param params
 */
export declare function getRequestParameters(params: IParameter[], useHeaderParameters: boolean): {
    requestParameters: string;
    requestFormData: string;
    requestPathReplace: string;
    queryParameters: string[];
    bodyParameter: string;
    headerParameters: string[];
    imports: string[];
};
