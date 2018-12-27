import { DataStructureTypeName} from '../DataStructure/DataStructureTypeName';
import { ClassDataStructureTypeName } from '../DataStructure/implementations/ClassDataStructureTypeName';
import { EnumDataStructureTypeName } from '../DataStructure/implementations/EnumDataStructureTypeName';
import { ProtocolDataStructure } from '../DataStructure/implementations/ProtocolDataStructure';
import { StructDataStructureTypeName } from '../DataStructure/implementations/StructDataStructureTypeName';
import { DataStructureType } from '../DataStructure/DataStructureType';
import { DataStructure } from '../DataStructure/DataStructure';
import { DataStructureParsingResult } from './DataStructureParsingResult';
import { RawAccessControl } from '../AccessLevel';
import { parseText } from '../parseLastBracket';
import { DataPropertyParser } from '../DataPropertyParser/DataPropertyParser';


export const getStructureType = (structure: string | undefined | null): DataStructureTypeName=> {
    if (structure === undefined || structure === null) throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol')
    switch (structure) {
        case "struct": return new StructDataStructureTypeName()
        case "class": return new ClassDataStructureTypeName()
        case "enum": return new EnumDataStructureTypeName()
        case "protocol": return new ProtocolDataStructure()
        default:
            throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol')
    }
}

export class DataStructureParser {

    regexp: RegExp = /(public|private|internal)?\s*(class|struct|protocol|enum)\s+([\w\d]+)\s+{$/
    completed: boolean = false
    started: boolean = false
    inner: string = ""
    structure?: DataStructureType

    public constructor() { }

    public parse(lines: string[]): DataStructureParsingResult {
        const line = lines.length > 0 ? lines[0] : undefined
        if (line === undefined || line === null)
            return { remainingLines: lines, error: new Error('the line cannot be null') }
        const search = line.match(this.regexp)
        
        if (search === null || search === undefined)
            throw new Error('no match found for a line')
        
        const name = search[3]
        const accessControl = RawAccessControl.parse(search[1])
        const type = getStructureType(search[2])
        
        this.structure = new DataStructure(name , type , accessControl)

        this.started = true;
        
        const { newLines, remainingLines , inner } = this.getParseResult(lines.splice(1, lines.length))
        
        this.inner = inner;
        
        const propertyParser = new DataPropertyParser()
        let properties = propertyParser.parse(newLines);
        this.structure.properties = this.structure.properties.concat(properties);
        
        return {
            property: this.structure,
            remainingLines: remainingLines
        };
    }

    getParseResult(lines: string[]): { remainingLines: string[] , newLines: string[] , inner: string } {
        const result = parseText(lines.join('\n'));
        return {
            newLines: this.trimLines(result.closed),
            remainingLines: this.trimLines(result.remaining),
            inner: result.closed
        }
    }

    trimLines(lines: string): string[] {
        return lines.split('\n').filter(l => {
            return (l.trim() !== '\n') ? l.trim() : undefined
        })
    }
}
