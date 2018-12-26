"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("./AccessControl");
const Variable_1 = require("./Variable");
const rawProperty = {
    regexp: /(public|internal|private|fileprivate)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+)\s*=\s*\"?([\w\d]+)"?;?{?/,
    accessControl: new AccessControl_1.UndefinedAccessControl(),
    variableType: new Variable_1.UndefinedVariable(),
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
    static parse(line) {
        if (line === undefined || line === null)
            throw new Error('line must not be null or undefined');
        const searchProperty = line.trim().match(rawProperty.regexp);
        if (searchProperty === undefined || searchProperty === null)
            throw new Error('no property found in line data');
        const localProperty = RawProperty.create();
        localProperty.accessControl = AccessControl_1.RawAccessControl.parse(searchProperty[1]);
        localProperty.variableType = Variable_1.RawVariable.parse(searchProperty[2]);
        localProperty.name = getPropertyField(searchProperty[3]);
        localProperty.type = getPropertyField(searchProperty[4]);
        localProperty.value = getPropertyField(searchProperty[5]);
        localProperty.started = true;
        localProperty.completed = false;
        return localProperty;
    }
}
exports.RawProperty = RawProperty;
