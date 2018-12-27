import { DataStructureType } from '../DataStructure/DataStructureType';
export declare type DataStructureParsingResult = {
    /**
     * The remaining lines which are still required to be parsed in this file
     *
     * @type {string[]}
     */
    remainingLines: string[];
    /**
     * The data structure which may or have not been parsed
     *
     * @type {DataStructureType}
     */
    property?: DataStructureType;
    /**
     * If an error has occured during the parsing
     *
     * @type {Error}
     */
    error?: Error;
};
