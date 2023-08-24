"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentsCodegen = void 0;
const utils_1 = require("../utils");
const createDefinitionClass_1 = require("./createDefinitionClass");
const createDefinitionEnum_1 = require("./createDefinitionEnum");
function componentsCodegen(definitions) {
    let definitionModels = {};
    let definitionEnums = {};
    if (!definitions || !definitions.schemas) {
        definitions = {
            schemas: {}
        };
    }
    if (!!definitions)
        for (const [k, v] of Object.entries(definitions.schemas)) {
            let className = (0, utils_1.refClassName)(k);
            // If it has been converted to a generic type, there is no need to redefine
            if ((0, utils_1.isGenerics)(className))
                continue;
            let result = null;
            // is an enum definition,just in swagger openAPI v2
            if (v.enum) {
                const enumDef = (0, createDefinitionEnum_1.createDefinitionEnum)(className, v.enum, v.type);
                definitionEnums[`#/components/schemas/${k}`] = {
                    name: enumDef.name,
                    value: enumDef
                };
            }
            else if (v.type === 'array') {
                // #TODO
            }
            else {
                // default definition generate
                const { enums, model } = (0, createDefinitionClass_1.createDefinitionClass)(className, v.properties, v.additionalProperties, v.required);
                enums.forEach(item => {
                    definitionEnums[`#/components/schemas/${item.name}`] = {
                        name: item.name,
                        content: item.text
                    };
                });
                definitionModels[`#/components/schemas/${k}`] = {
                    value: model,
                    name: className
                };
            }
        }
    return { models: definitionModels, enums: definitionEnums };
}
exports.componentsCodegen = componentsCodegen;
//# sourceMappingURL=index.js.map