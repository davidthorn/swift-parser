"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("../AccessControl");
const Variable_1 = require("../Variable");
class DataStructureProperty {
    constructor() {
        this.accessControl = new AccessControl_1.UndefinedAccessControl();
        this.variableType = new Variable_1.UndefinedVariable();
        this.arc = undefined;
        this.name = undefined;
        this.value = undefined;
        this.completed = false;
        this.started = false;
        this.type = undefined;
    }
}
DataStructureProperty.regexp = /(public|internal|private|fileprivate)?\s*(weak|unowned)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+)\s*=\s*\"?([\w\d]+)"?;?{?/;
exports.DataStructureProperty = DataStructureProperty;
