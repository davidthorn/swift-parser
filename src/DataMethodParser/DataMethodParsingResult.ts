import { DataMethodType } from '../DataMethodType';
export type DataMethodParsingResult = {
    remainingLines: string[];
    property?: DataMethodType;
    error?: Error;
};
