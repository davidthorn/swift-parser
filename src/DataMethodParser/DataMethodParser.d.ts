import { DataParser } from "../DataParser";
import { DataMethodParsingResult } from "./DataMethodParsingResult";
import { DataMethodType } from "../DataMethod/DataMethodType";
export declare class DataMethodParser extends DataParser {
    regexp: RegExp;
    completed: boolean;
    started: boolean;
    inner: string;
    constructor();
    parse(lines: string[]): DataMethodType[];
    parseMethod(lines: string[]): DataMethodParsingResult;
    throwIfMatchNotFound(line: string): RegExpMatchArray;
}
