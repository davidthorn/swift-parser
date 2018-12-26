import { RawAccessControl } from '../AccessControl';
import { parseText } from '../parseLastBracket';
import { RawProperty } from '../DataStructureProperty/RawProperty';
import { DataStructureParsingResult } from './DataStructureParsingResult';
import { DataStructure, getStructureType } from './DataStructure';
import { DataStructureType } from './DataStructureType';

export class RawDataStructure {

    public static create(): DataStructureType {
        return new DataStructure()
    }

    public static parse(lines: string[]): DataStructureParsingResult {
        const line = lines.length > 0 ? lines[0] : undefined;
        if (line === undefined || line === null)
            return { remainingLines: lines, error: new Error('the line cannot be null') };
        const search = line.match(DataStructure.regexp);
        if (search === null || search === undefined)
            throw new Error('no match found for a line');
        let data = RawDataStructure.create();
        data.started = true;
        data.type = getStructureType(search[2]);
        data.accessControl = RawAccessControl.parse(search[1]);
        data.name = search[3];
        lines.shift();
        const parsedResult = parseText(lines.join('\n'));
        lines.shift(); /// remove line with curly bracket
        data.inner = parsedResult.closed;
        const newLines = parsedResult.closed.split('\n').filter(l => {
            let f = l.trim();
            return (f !== '\n') ? f : undefined
        });
        const remainingLines = parsedResult.remaining.split('\n').filter(l => {
            let f = l.trim();
            return (f !== '\n') ? f : undefined
        });
        let properties = RawProperty.parse(newLines);
        data.properties = data.properties.concat(properties);
        return {
            property: data,
            remainingLines: remainingLines
        };
    }
}
