"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("./AccessControl");
const rawMethod = {
    regexp: /(public|internal|private|fileprivate)?\s*(func)\s+([\w\d]+)\s*/,
    accessControl: new AccessControl_1.UndefinedAccessControl(),
    methodName: undefined,
    value: undefined,
    completed: false,
    started: false
};
class RawMethod {
    static create() {
        return Object.create(rawMethod);
    }
    static parse(line) {
        if (line === undefined || line === null)
            throw new Error('the line cannot be null');
        const search = line.match(rawMethod.regexp);
        if (search === null || search === undefined)
            throw new Error('no match found for a line');
        let data = RawMethod.create();
        data.started = true;
        data.accessControl = AccessControl_1.RawAccessControl.parse(search[1]);
        data.methodName = search[3];
        return data;
    }
}
exports.RawMethod = RawMethod;
