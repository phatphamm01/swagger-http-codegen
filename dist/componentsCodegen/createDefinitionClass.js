"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefinitionClass = void 0;
const propTrueType_1 = require("./propTrueType");
const pascalcase_1 = __importDefault(require("pascalcase"));
const utils_1 = require("../utils");
/**
 * generate class definition
 * @param className class name
 * @param properties attribute
 * Whether @param isGenericsType is a generic interface
 */
function createDefinitionClass(className, properties, additionalProperties, required) {
    var _a, _b;
    /** enumeration value*/
    let enums = [];
    let types = [];
    let model = { name: className, props: [], imports: [] };
    const propertiesEntities = Object.entries(properties || {});
    for (const [k, v] of propertiesEntities) {
        let { propType, isEnum, isArray, isType, ref, isUnionType, isCombinedType } = (0, propTrueType_1.propTrueType)(v);
        if (isEnum) {
            let enumName = `Enum${className}${(0, pascalcase_1.default)(k)}`;
            enums.push({
                name: enumName, text: `export enum ${enumName}{
        ${propType}
      }`
            });
            propType = isArray ? enumName + '[]' : enumName;
            ref = enumName;
        }
        if (isType) {
            let typeName = `I${className}${(0, pascalcase_1.default)(k)}`;
            enums.push({
                name: typeName, text: `type ${typeName} = ${propType};`
            });
            propType = isArray ? typeName + '[]' : typeName;
            ref = typeName;
        }
        if (isUnionType) {
            let typeName = `All${(0, pascalcase_1.default)(k)}Types`;
            let types = propType.split(',');
            enums.push({
                name: typeName,
                text: `export type ${typeName} = ${types.join(' | ')};`
            });
            propType = isArray ? typeName + '[]' : typeName;
            ref = typeName;
            model.imports.push(...types);
        }
        if (isCombinedType) {
            let typeName = `Combined${(0, pascalcase_1.default)(k)}Types`;
            let types = propType.split(',');
            enums.push({
                name: typeName,
                text: `export type ${typeName} = ${types.join(' & ')};`
            });
            propType = isArray ? typeName + '[]' : typeName;
            ref = typeName;
            model.imports.push(...types);
        }
        // converts a reference value to a reference list
        if (!!ref) {
            model.imports.push(ref);
        }
        let validationModel = (0, utils_1.getValidationModel)(k, v, required);
        model.props.push({ name: k, type: propType, format: v.format, desc: (_a = v.description) === null || _a === void 0 ? void 0 : _a.replace(/\//g, '\\/'), isType, isEnum, validationModel });
    }
    if (additionalProperties !== undefined) {
        let definition = additionalProperties;
        switch (typeof additionalProperties) {
            case "boolean":
                if (additionalProperties === false) {
                    break;
                }
                definition = { type: "object" };
            case "object":
            default:
                let { propType, isEnum, isArray, isType, ref, isUnionType, isCombinedType } = (0, propTrueType_1.propTrueType)(definition);
                let validationModel = null;
                // Since there are no additional properties the whole object will be of this type
                if (model.props.length == 0) {
                    model.props.push({
                        name: "[additionalProperties: string]",
                        type: propType,
                        format: definition.format,
                        desc: (_b = definition.description) === null || _b === void 0 ? void 0 : _b.replace(/\//g, '\\/'),
                        isType,
                        isEnum,
                        validationModel
                    });
                }
                else {
                    // We will have to use a union type to be able to use additional Properties
                    const typeName = `${className}WithAdditionalProperties`;
                    const types = [className, `{ [additionalProperties: string]: ${propType} }`];
                    enums.push({
                        name: typeName,
                        text: `export type ${typeName} = ${types.join(' & ')};`
                    });
                }
        }
    }
    return { enums, model };
}
exports.createDefinitionClass = createDefinitionClass;
//# sourceMappingURL=createDefinitionClass.js.map