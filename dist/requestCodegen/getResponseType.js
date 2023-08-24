"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseType = void 0;
const utils_1 = require("../utils");
/**
 * Get the return type of the request
 */
function getResponseType(reqProps, isV3) {
    // It does not allow the schema defined directly, but only the primitive type is allowed.
    let result = 'any';
    let isRef = false;
    // extract schema
    const successStatusCode = Object.keys(reqProps.responses).find(statusCode => statusCode.match(/20[0-4]$/));
    if (!successStatusCode) {
        return { responseType: result, isRef };
    }
    let resSchema = null;
    if (reqProps.responses[successStatusCode]) {
        if (isV3 === true) {
            if (reqProps.responses[successStatusCode].content &&
                reqProps.responses[successStatusCode].content['application/json'] &&
                reqProps.responses[successStatusCode].content['application/json'].schema)
                resSchema = reqProps.responses[successStatusCode].content['application/json'].schema;
        }
        else {
            if (reqProps.responses[successStatusCode].schema)
                resSchema = reqProps.responses[successStatusCode].schema;
        }
    }
    if (!resSchema) {
        return { responseType: result, isRef };
    }
    let checkType = resSchema.type;
    let format = resSchema.format;
    // if array
    if (checkType === 'array' || resSchema.items) {
        if (resSchema.items.$ref) {
            const refType = (0, utils_1.refClassName)(resSchema.items.$ref);
            isRef = true;
            result = refType + '[]';
        }
        else {
            const refType = (0, utils_1.toBaseType)(resSchema.items.type, resSchema.items.format);
            result = refType + '[]';
        }
    }
    else if (resSchema.$ref) {
        // if it is a reference object
        result = (0, utils_1.refClassName)(resSchema.$ref) || 'any';
        isRef = true;
    }
    else {
        result = checkType;
        result = (0, utils_1.toBaseType)(result, format);
    }
    if (result == 'object') {
        result = 'any';
    }
    else if (result == 'array') {
        result = 'any[]';
    }
    return { responseType: result, isRef };
}
exports.getResponseType = getResponseType;
//# sourceMappingURL=getResponseType.js.map