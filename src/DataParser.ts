import { parseText, searchForClosingBracket } from "./parseLastBracket";
import { setFlagsFromString } from "v8";

export class DataParser {

    public constructor() { }

    /**
     * See getMethodBody
     * Warning newLines
     *
     * @param {string[]} lines
     * @returns {{ remainingLines: string[] , newLines: string[] , inner: string }}
     * @memberof DataParser
     */
    getParseResult(lines: string[]): { remainingLines: string[] , newLines: string[] , inner: string } {
        throw new Error('this should be removed')
        const getLines = (): string[] => {
            throw new Error('new lines has been removed from this method')
        }
        
        return {
            ...this.getMethodBody(lines),
            newLines: getLines()
        }
    }

    /**
     * Returns the method body for this data provided
     * This method will search for the first { and then keep collecting data until it reaches the matching }
     * all data after the ending } of the statement will then be inserted into the remaining string property
     * the data called which is collected for the body is saving within the inner property which is returned
     *
     * @param {string[]} lines
     * @returns {{ remainingLines: string[] , newLines: string[] , inner: string }}
     * @memberof DataParser
     */
    getMethodBody(lines: string[]): { remainingLines: string[] ,  inner: string } {
        const { matchedString , remainingString }  = searchForClosingBracket('{' , lines.join('\n'))
        //const result = parseText(lines.join('\n'));
        return {
            remainingLines: this.trimLines(remainingString),
            inner: matchedString || ''
        }
    }

    /**
     * Method will return an array of string and will remove all lines which only contain a new line (\n) character
     *
     * @param {string} lines
     * @returns {string[]}
     * @memberof DataParser
     */
    trimEmptyLines(lines: string): string[] {
        return lines.split('\n').filter(l => {
            return (l.trim() !== '\n') ? l.trim() : undefined
        })
    }

    /**
     * Method will return an array of string and will remove all lines which only contain a new line (\n) character
     *
     * @param {string} lines
     * @returns {string[]}
     * @memberof DataParser
     */
    trimLines(lines: string): string[] {
       return this.trimEmptyLines(lines)
    }
}
