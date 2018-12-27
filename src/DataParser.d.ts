export declare class DataParser {
    constructor();
    getParseResult(lines: string[]): {
        remainingLines: string[];
        newLines: string[];
        inner: string;
    };
    trimLines(lines: string): string[];
}
