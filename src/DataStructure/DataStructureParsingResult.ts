import { DataStructureType } from './DataStructureType';
export type DataStructureParsingResult = {
    remainingLines: string[]
    property?: DataStructureType
    error?: Error
};
