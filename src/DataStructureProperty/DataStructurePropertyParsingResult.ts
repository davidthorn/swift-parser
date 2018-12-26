import { DataStructureProperty } from './DataStructureProperty';

export type DataStructurePropertyParsingResult = {
    remainingLines: string[]
    property?: DataStructureProperty
    error?: Error
}