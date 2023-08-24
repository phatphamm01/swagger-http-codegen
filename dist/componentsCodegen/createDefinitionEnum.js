"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefinitionEnum = void 0;
/**
 * generate class definition
 * @param className class name
 * @param enum enumeration list
 * @param type the type of enumeration
 */
function createDefinitionEnum(className, enumArray, type) {
    const result = type === 'string'
        ? enumArray.map(item => (isNaN(item) ? `'${item}'='${item}'` : `'KEY_${item}'='${item}'`)).join(',')
        : enumArray.join('|');
    return { name: className, enumProps: result, type: type };
}
exports.createDefinitionEnum = createDefinitionEnum;
//# sourceMappingURL=createDefinitionEnum.js.map