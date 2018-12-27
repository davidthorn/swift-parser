import { DataPropertyParsingResult } from './DataPropertyParsingResult';
import { DataPropertyType } from '../DataProperty/DataPropertyType';
import { DataParser } from '../DataParser';
export declare class DataPropertyParser extends DataParser {
    regexp: RegExp;
    completed: boolean;
    started: boolean;
    constructor();
    /**
     * Checks if the property Identifier provided is valid and if not throws an error
     *
     * @static
     * @param {(string | undefined | null)} propertyIdentifier
     * @returns {string}
     * @memberof RawProperty
     */
    isPropertyField(propertyIdentifier: string | undefined | null): string;
    /**
     * Attempts to parse as many data structure property objects which it can
     * from the lines provided
     *
     * @static
     * @param {string[]} lines
     * @returns {DataStructureProperty[]}
     * @memberof RawProperty
     */
    parse(lines: string[]): {
        unusedLines: string[];
        properties: DataPropertyType[];
    };
    /**
     * Attempts to parse a ata structure property object if it can
     * from the lines provided
     * The lines are removed from the array everytime this method can successful use it
     *
     * @static
     * @param {string[]} lines
     * @returns {DataStructurePropertyParsingResult}
     * @memberof RawProperty
     */
    parseProperty(lines: string[]): DataPropertyParsingResult;
}
