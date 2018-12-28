import { DataStructureTypeName } from '../DataStructure/DataStructureTypeName';
import { DataStructureType } from '../DataStructure/DataStructureType';
import { DataStructureParsingResult } from './DataStructureParsingResult';
import { AccessLevelType } from '../AccessLevel';
import { DataParser } from '../DataParser';
export declare type DataStructureInfo = {
    name: string;
    access_level: AccessLevelType;
    type: DataStructureTypeName;
};
export declare const getStructureType: (structure: string | null | undefined) => DataStructureTypeName;
export declare class DataStructureParser extends DataParser {
    regexp: RegExp;
    completed: boolean;
    started: boolean;
    inner: string;
    structure?: DataStructureType;
    constructor();
    parse(lines: string[]): DataStructureParsingResult;
    extractStructInfo(lines: string[]): {
        remainingLines?: string;
        inner?: string;
        info?: {
            access_level: AccessLevelType;
            type: DataStructureTypeName;
            name: string;
        };
    };
    /**
     * Creates a StructureInfo using the strings provided
     * AccessLevel will always default to internal
     * DataStructureTypeName will always defaul to class
     *
     * @param {string} name
     * @param {string} [access_level]
     * @param {string} [type]
     * @returns {DataStructureInfo}
     * @memberof DataStructureParser
     */
    createStructureInfo(name: string, access_level?: string, type?: string): DataStructureInfo;
}
