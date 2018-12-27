import { parseText } from "./parseLastBracket";

export class DataParser {

    public constructor() { }

    getParseResult(lines: string[]): { remainingLines: string[] , newLines: string[] , inner: string } {
        const result = parseText(lines.join('\n'));
        return {
            newLines: this.trimLines(result.closed),
            remainingLines: this.trimLines(result.remaining),
            inner: result.closed
        }
    }

    trimLines(lines: string): string[] {
        return lines.split('\n').filter(l => {
            return (l.trim() !== '\n') ? l.trim() : undefined
        })
    }
}
