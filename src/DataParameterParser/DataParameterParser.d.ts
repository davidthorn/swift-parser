export declare class DataParameterParser {
    paramsRegexp: RegExp;
    constructor();
    parse(lines: string[]): {
        remainingLines?: string[];
        parameters: any[];
    };
    extractMethodParams(search: string): {
        params: string[];
        remainingString: string;
    };
    /**
     * Parses the string and returns all data which is provided to know what each parameters types are
     *
     * @param {string} paramString
     * @returns {{ varName?: string , name: string , type: string , defaultValue?: any , isOptional: boolean , inout?: boolean  }}
     * @memberof DataParameterParser
     */
    getParameterParts(paramString: string): {
        varName?: string;
        name: string;
        type: string;
        defaultValue?: any;
        isOptional: boolean;
        inout?: boolean;
    };
}
