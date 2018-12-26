"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStructureAccessControlIdentifiers = ["public", "internal", "private"];
exports.property = {
    accessControl: undefined,
    readonly: undefined,
    name: undefined,
    value: undefined,
    completed: false,
    started: false,
    type: undefined
};
exports.classes = [];
exports.currentDataStructure = {
    type: undefined,
    accessControl: undefined,
    name: undefined,
    properties: [],
    methods: [],
    completed: false,
    started: false
};
exports.getAccessControl = (access) => {
    switch (access) {
        case null: throw new Error('it cant be null');
        case undefined || "internal":
            return "internal";
            break;
        case "public":
            return "public";
            break;
        case "private":
            return "private";
            break;
    }
};
exports.isReadOnly = (identifier) => {
    if (identifier === undefined || identifier === null)
        throw new Error('The identifier must be either var or let it cannot be null or undefined');
    return identifier === "var" ? false : true;
};
exports.getStructureName = (structure) => {
    if (structure === undefined || structure === null)
        throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol');
    switch (structure) {
        case "struct": return "struct";
        case "class": return "class";
        case "enum": return "enum";
        case "protocol": return "protocol";
        default:
            throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol');
    }
};
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
    const localProperty = Object.create(exports.property);
    localProperty.accessControl = exports.getAccessControl(searchProperty[1]);
    localProperty.readonly = exports.isReadOnly(searchProperty[2]);
    localProperty.name = exports.getPropertyField(searchProperty[3]);
    localProperty.type = exports.getPropertyField(searchProperty[4]);
    localProperty.value = exports.getPropertyField(searchProperty[5]);
    localProperty.started = true;
    localProperty.completed = false;
    return localProperty;
};
