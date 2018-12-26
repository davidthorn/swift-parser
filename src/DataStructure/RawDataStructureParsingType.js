"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("../AccessControl");
const ClassDataStructure_1 = require("./ClassDataStructure");
const EnumDataStructure_1 = require("./EnumDataStructure");
const ProtocolDataStructure_1 = require("../DataStructureProperty/ProtocolDataStructure");
const StructDataStructure_1 = require("./StructDataStructure");
const UndefinedDataStructure_1 = require("./UndefinedDataStructure");
exports.getStructureType = (structure) => {
    if (structure === undefined || structure === null)
        throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol');
    switch (structure) {
        case "struct": return new StructDataStructure_1.StructDataStructure();
        case "class": return new ClassDataStructure_1.ClassDataStructure();
        case "enum": return new EnumDataStructure_1.EnumDataStructure();
        case "protocol": return new ProtocolDataStructure_1.ProtocolDataStructure();
        default:
            throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol');
    }
};
class RawDataStructureParsingType {
    constructor() {
        this.type = new UndefinedDataStructure_1.UndefinedDataStructure();
        this.accessControl = new AccessControl_1.UndefinedAccessControl();
        this.name = undefined;
        this.properties = [];
        this.methods = [];
        this.completed = false;
        this.started = false;
        this.inner = "";
    }
}
RawDataStructureParsingType.regexp = /(public|private|internal)?\s*(class|struct|protocol|enum)\s+([\w\d]+)\s+{$/;
exports.RawDataStructureParsingType = RawDataStructureParsingType;
