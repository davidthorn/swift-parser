import { DataPropertyType } from '../DataProperty/DataPropertyType';

export type DataPropertyParsingResult = {
    remainingLines: string[]
    property?: DataPropertyType
    error?: Error
}