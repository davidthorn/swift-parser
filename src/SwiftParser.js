"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Variable_1 = require("./Variable");
const AccessControl_1 = require("./AccessControl");
const DataStructureProperty_1 = require("./DataStructureProperty");
exports.DataStructureAccessControlIdentifiers = ["public", "internal", "private"];
exports.classes = [];
exports.getPropertyField = (propertyIdentifier) => {
    if (propertyIdentifier === undefined || propertyIdentifier === null)
        throw new Error('The property cannot be null or undefined');
    return propertyIdentifier;
};
exports.parsePropertyFromLine = (line) => {
    if (line === undefined || line === null)
        throw new Error('line must not be null or undefined');
    const searchProperty = line.trim().match(/(public|internal|private|fileprivate)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+)\s*=\s*\"?([\w\d]+)"?;?{?/);
    if (searchProperty === undefined || searchProperty === null)
        throw new Error('no property found in line data');
    const localProperty = DataStructureProperty_1.RawProperty.create();
    localProperty.accessControl = AccessControl_1.getAccessControl(searchProperty[1]);
    localProperty.variableType = Variable_1.getVariableType(searchProperty[2]);
    localProperty.name = exports.getPropertyField(searchProperty[3]);
    localProperty.type = exports.getPropertyField(searchProperty[4]);
    localProperty.value = exports.getPropertyField(searchProperty[5]);
    localProperty.started = true;
    localProperty.completed = false;
    return localProperty;
};
