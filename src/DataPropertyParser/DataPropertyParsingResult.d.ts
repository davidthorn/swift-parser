import { DataPropertyType } from '../DataProperty/DataPropertyType';
export declare type DataPropertyParsingResult = {
    remainingLines: string[];
    property?: DataPropertyType;
    error?: Error;
};
