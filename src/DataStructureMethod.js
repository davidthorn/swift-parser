"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("./AccessControl");
const parseLastBracket_1 = require("./parseLastBracket");
const rawMethod = {
    regexp: /\s*(public|internal|private)\s+(func)\s*([\w\d]+)\s?\(([\w\d: _,\s \?=]*)\)\s*{/,
    //regexp: /(public|internal|private|fileprivate)?\s*(func)\s+([\w\d]+)\s*/,
    accessControl: new AccessControl_1.UndefinedAccessControl(),
    methodName: undefined,
    value: undefined,
    completed: false,
    started: false,
    inner: ""
};
class RawMethod {
    static create() {
        return Object.create(rawMethod);
    }
    static parse(lines) {
        const line = lines.shift();
        if (line === undefined || line === null)
            return { remainingLines: lines, error: new Error('the line cannot be null') };
        const search = line.match(rawMethod.regexp);
        if (search === null || search === undefined)
            return { remainingLines: lines, error: new Error('no match found for a line') };
        let data = RawMethod.create();
        data.started = true;
        data.accessControl = AccessControl_1.RawAccessControl.parse(search[1]);
        data.methodName = search[3];
        const parsedResult = parseLastBracket_1.parseText(lines.join('\n'));
        data.inner = parsedResult.closed;
        const newLines = parsedResult.remaining.split('\n').filter(l => {
            let f = l.trim();
            if (f !== '\n')
                return f;
        });
        return {
            remainingLines: newLines,
            property: data
        };
    }
}
exports.RawMethod = RawMethod;
