import { DataParser } from "../DataParser";
import { DataMethodParsingResult } from "./DataMethodParsingResult";
import { DataMethodType } from "../DataMethod/DataMethodType";
export declare type DataMethodInfo = {
    outlet?: string;
    access_level?: string;
    params?: string[];
    methodName?: string;
    returnValue?: string;
    paramsString?: string;
};
export declare class DataMethodParser extends DataParser {
    regexp: RegExp;
    paramsRegexp: RegExp;
    completed: boolean;
    started: boolean;
    inner: string;
    constructor();
    parse(lines: string[]): DataMethodType[];
    parseMethod(lines: string[]): DataMethodParsingResult;
    throwIfMatchNotFound(line: string): RegExpMatchArray;
    extractMethodParams(search: string): {
        params: string[];
        remainingString: string;
    };
    extractMethodInformationFromString(search: string): {
        remainingString: string;
        data: DataMethodInfo;
    };
    extractBodyFromString(search: string): {
        remainingString: string;
        data: string;
    };
}
