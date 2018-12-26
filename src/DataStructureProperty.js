"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("./AccessControl");
const Variable_1 = require("./Variable");
const rawProperty = {
    regexp: /(public|internal|private|fileprivate)?\s*(weak|unowned)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+)\s*=\s*\"?([\w\d]+)"?;?{?/,
    accessControl: new AccessControl_1.UndefinedAccessControl(),
    variableType: new Variable_1.UndefinedVariable(),
    arc: undefined,
    name: undefined,
    value: undefined,
    completed: false,
    started: false,
    type: undefined
};
const getPropertyField = (propertyIdentifier) => {
    if (propertyIdentifier === undefined || propertyIdentifier === null)
        throw new Error('The property cannot be null or undefined');
    return propertyIdentifier;
};
class RawProperty {
    static create() {
        return Object.create(rawProperty);
    }
    static parse(lines) {
        let properties = [];
        let tmpLines = lines;
        while (tmpLines.length > 0) {
            try {
                let result = this.parseProperty(tmpLines);
                const { remainingLines, property, error } = result;
                tmpLines = remainingLines;
                if (error !== undefined)
                    throw error;
                if (property === undefined)
                    throw new Error('jump to next line');
                properties.push(property);
            }
            catch (_a) {
                tmpLines.shift(); /// could not parse that line
            }
        }
        return properties;
    }
    static parseProperty(lines) {
        const line = lines[0];
        if (line === undefined || line === null)
            return { error: new Error('line must not be null or undefined'), remainingLines: lines, property: undefined };
        const searchProperty = line.trim().match(rawProperty.regexp);
        if (searchProperty === undefined || searchProperty === null)
            return { error: new Error('no property found in line data'), remainingLines: lines, property: undefined };
        const localProperty = RawProperty.create();
        localProperty.accessControl = AccessControl_1.RawAccessControl.parse(searchProperty[1]);
        localProperty.arc = searchProperty[2];
        localProperty.variableType = Variable_1.RawVariable.parse(searchProperty[3]);
        localProperty.name = getPropertyField(searchProperty[4]);
        localProperty.type = getPropertyField(searchProperty[5]);
        localProperty.value = getPropertyField(searchProperty[6]);
        localProperty.started = true;
        localProperty.completed = false;
        return {
            property: localProperty,
            error: undefined,
            remainingLines: lines.splice(1, lines.length)
        };
    }
}
exports.RawProperty = RawProperty;
