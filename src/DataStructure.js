"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("./AccessControl");
class ClassDataStructure {
    constructor() {
        this.name = "class";
    }
}
exports.ClassDataStructure = ClassDataStructure;
class EnumDataStructure {
    constructor() {
        this.name = "enum";
    }
}
exports.EnumDataStructure = EnumDataStructure;
class ProtocolDataStructure {
    constructor() {
        this.name = "protocol";
    }
}
exports.ProtocolDataStructure = ProtocolDataStructure;
class StructDataStructure {
    constructor() {
        this.name = "struct";
    }
}
exports.StructDataStructure = StructDataStructure;
class UndefinedDataStructure {
    constructor() {
        this.name = undefined;
    }
}
exports.UndefinedDataStructure = UndefinedDataStructure;
const getStructureType = (structure) => {
    if (structure === undefined || structure === null)
        throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol');
    switch (structure) {
        case "struct": return new StructDataStructure();
        case "class": return new ClassDataStructure();
        case "enum": return new EnumDataStructure();
        case "protocol": return new ProtocolDataStructure();
        default:
            throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol');
    }
};
const rawDataStructure = {
    regexp: /(public|private|internal)?\s*(class|struct|protocol|enum)\s+([\w\d]+)\s+{$/,
    type: new UndefinedDataStructure(),
    accessControl: new AccessControl_1.UndefinedAccessControl(),
    name: undefined,
    properties: [],
    methods: [],
    completed: false,
    started: false
};
class RawDataStructure {
    static create() {
        return Object.create(rawDataStructure);
    }
    static parse(line) {
        if (line === undefined || line === null)
            throw new Error('the line cannot be null');
        const search = line.match(rawDataStructure.regexp);
        if (search === null || search === undefined)
            throw new Error('no match found for a line');
        let data = RawDataStructure.create();
        data.started = true;
        data.type = getStructureType(search[2]);
        data.accessControl = AccessControl_1.getAccessControl(search[1]);
        data.name = search[3];
        return data;
    }
}
exports.RawDataStructure = RawDataStructure;
