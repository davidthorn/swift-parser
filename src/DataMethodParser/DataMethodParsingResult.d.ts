import { DataMethodType } from '../DataMethod/DataMethodType';
export declare type DataMethodParsingResult = {
    remainingLines: string[];
    property?: DataMethodType;
    error?: Error;
};
