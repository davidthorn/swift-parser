import { DataStructureTypeName } from '../DataStructure/DataStructureTypeName';
import { DataStructureType } from '../DataStructure/DataStructureType';
import { DataStructureParsingResult } from './DataStructureParsingResult';
import { DataParser } from '../DataParser';
export declare const getStructureType: (structure: string | null | undefined) => DataStructureTypeName;
export declare class DataStructureParser extends DataParser {
    regexp: RegExp;
    completed: boolean;
    started: boolean;
    inner: string;
    structure?: DataStructureType;
    constructor();
    parse(lines: string[]): DataStructureParsingResult;
}
