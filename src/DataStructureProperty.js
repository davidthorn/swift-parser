"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("./AccessControl");
const Variable_1 = require("./Variable");
const rawProperty = {
    accessControl: new AccessControl_1.UndefinedAccessControl(),
    variableType: new Variable_1.UndefinedVariable(),
    name: undefined,
    value: undefined,
    completed: false,
    started: false,
    type: undefined
};
class RawProperty {
    static create() {
        return Object.create(rawProperty);
    }
}
exports.RawProperty = RawProperty;
