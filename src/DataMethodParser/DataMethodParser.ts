import { DataParser } from "../DataParser";
import { DataMethodParsingResult } from "./DataMethodParsingResult";
import { RawAccessLevel } from "../AccessLevel";
import { DataMethod } from "../DataMethod";
import { DataMethodType } from "../DataMethodType";

export class DataMethodParser extends DataParser {

    regexp: RegExp = /\s*(\@IBAction)?\s*(public|internal|private|open)?\s+(func)\s*([\w\d]+)\s?\(([\w\d: _,\s \?=]*)\)\s*{([.\s\w\W\S\n]*)/
    //regexp: /(public|internal|private|fileprivate)?\s*(func)\s+([\w\d]+)\s*/,
    completed: boolean = false
    started: boolean = false
    inner: string = ""

    constructor() {
        super()
    }

    public parse(lines: string[]): DataMethodType[] {
        
        let methods: DataMethodType[] = []

        let tmpLines = lines

        while(tmpLines.length > 0) {
            try {
                let result = this.parseMethod(tmpLines)
                const { remainingLines , property , error } = result
                tmpLines = remainingLines
                if(error !== undefined) throw error
                if(property === undefined) throw new Error('jump to next line')
                methods.push(property)
            } catch {
                tmpLines.shift() /// could not parse that line
            }
        }

        return methods
    }

    public parseMethod(lines: string[]): DataMethodParsingResult {
        const line = lines.shift()
        if(line === undefined || line === null) return { remainingLines: lines , error: new Error('the line cannot be null') }
        const search = line.match(this.regexp)
        if(search === null || search === undefined) return { remainingLines: lines, error: new Error('no match found for a line') }
        
        const accessLevel = RawAccessLevel.parse(search[2])
        const methodName = search[4]
        
        const dataMethod = new DataMethod(methodName , accessLevel , [])

        let end = search[6].split('\n').concat(lines)

        const { inner , remainingLines} = this.getParseResult(end)
        
        dataMethod.inner = inner
        
        return {
            remainingLines: remainingLines,
            property: dataMethod
        }
    }

}