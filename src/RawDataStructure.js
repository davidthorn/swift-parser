"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControl_1 = require("./AccessControl");
const parseLastBracket_1 = require("./parseLastBracket");
const RawProperty_1 = require("./DataStructureProperty/RawProperty");
const RawDataStructureParsingType_1 = require("./RawDataStructureParsingType");
class RawDataStructure {
    static create() {
        return new RawDataStructureParsingType_1.RawDataStructureParsingType();
    }
    static parseLinesRequired(lines) {
        let linesRequired = [];
        var tagOpen = false;
        var chars = [];
        const l = lines.join('\n');
        return linesRequired;
    }
    static parse(lines) {
        const line = lines.length > 0 ? lines[0] : undefined;
        if (line === undefined || line === null)
            return { remainingLines: lines, error: new Error('the line cannot be null') };
        const search = line.match(RawDataStructureParsingType_1.RawDataStructureParsingType.regexp);
        if (search === null || search === undefined)
            throw new Error('no match found for a line');
        let data = RawDataStructure.create();
        data.started = true;
        data.type = RawDataStructureParsingType_1.getStructureType(search[2]);
        data.accessControl = AccessControl_1.RawAccessControl.parse(search[1]);
        data.name = search[3];
        lines.shift();
        const parsedResult = parseLastBracket_1.parseText(lines.join('\n'));
        lines.shift(); /// remove line with curly bracket
        data.inner = parsedResult.closed;
        const newLines = parsedResult.old.split('\n').filter(l => {
            let f = l.trim();
            if (f !== '\n')
                return f;
        });
        const remainingLines = parsedResult.remaining.split('\n').filter(l => {
            let f = l.trim();
            if (f !== '\n')
                return f;
        });
        let properties = RawProperty_1.RawProperty.parse(newLines);
        data.properties = data.properties.concat(properties);
        return {
            property: data,
            remainingLines: remainingLines
        };
    }
}
exports.RawDataStructure = RawDataStructure;
