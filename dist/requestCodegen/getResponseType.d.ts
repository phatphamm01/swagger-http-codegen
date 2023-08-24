import { IRequestMethod } from '../swaggerInterfaces';
/**
 * Get the return type of the request
 */
export declare function getResponseType(reqProps: IRequestMethod, isV3: boolean): {
    responseType: string;
    isRef: boolean;
};
