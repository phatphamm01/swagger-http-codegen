"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestBody = void 0;
const utils_1 = require("../utils");
function getRequestBody(requestBody) {
    // If it is empty, return it directly
    if (!requestBody.content)
        return;
    let imports = [];
    let bodyType = '';
    const allContent = Object.keys(requestBody.content);
    // By default, go to the definition of application/json, if you can’t get it, just take the first one
    let reqBody = requestBody.content['application/json'];
    if (!reqBody) {
        reqBody = requestBody.content[allContent[0]];
    }
    if (reqBody == null) {
        return { imports, bodyType };
    }
    if (reqBody.schema) {
        if (reqBody.schema.items) {
            bodyType = (0, utils_1.refClassName)(reqBody.schema.items.$ref);
            if (reqBody.schema.type && reqBody.schema.type === 'array') {
                bodyType += '[]';
            }
        }
        else if (reqBody.schema.$ref) {
            bodyType = (0, utils_1.refClassName)(reqBody.schema.$ref);
        }
        if (bodyType) {
            imports.push(bodyType);
            bodyType = `
      /** requestBody */
      body?:${bodyType},`;
        }
    }
    return { imports, bodyType };
}
exports.getRequestBody = getRequestBody;
//# sourceMappingURL=getRequestBody.js.map