import { DataMethodType } from '../DataMethod/DataMethodType';
export type DataMethodParsingResult = {
    remainingLines: string[];
    property?: DataMethodType;
};
