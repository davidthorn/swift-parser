export declare class DataParser {
    constructor();
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
    getMethodBody(lines: string[]): {
        remainingLines: string[];
        inner: string;
    };
    /**
     * Method will return an array of string and will remove all lines which only contain a new line (\n) character
     *
     * @param {string} lines
     * @returns {string[]}
     * @memberof DataParser
     */
    trimEmptyLines(lines: string): string[];
    /**
     * Method will return an array of string and will remove all lines which only contain a new line (\n) character
     *
     * @param {string} lines
     * @returns {string[]}
     * @memberof DataParser
     */
    trimLines(lines: string): string[];
}
