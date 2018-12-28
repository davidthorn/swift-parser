import { DataParser } from "../DataParser";
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
    globalMethodRegExp: RegExp;
    structureMethodRegExp: RegExp;
    paramsRegexp: RegExp;
    completed: boolean;
    started: boolean;
    inner: string;
    constructor();
    parse(lines: string[]): DataMethodType[];
    /**
     * Parses the data line by line attempting to convert the data into a swift method
     *
     *
     * @param {string[]} lines
     * @returns {DataMethodParsingResult}
     * @memberof DataMethodParser
     */
    parseStructureMethod(lines: string[]): {
        remainingLines: string[];
        method?: DataMethodType;
    };
    /**
     * Parses the data line by line attempting to convert the data into a swift method
     *
     *
     * @param {string[]} lines
     * @returns {DataMethodParsingResult}
     * @memberof DataMethodParser
     */
    parseGlobalMethod(lines: string[]): {
        remainingLines: string[];
        method?: DataMethodType;
    };
    /**
     * Parses the data line by line attempting to convert the data into a swift method
     *
     *
     * @param {string[]} lines
     * @returns {DataMethodParsingResult}
     * @memberof DataMethodParser
     */
    private parseMethod;
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
