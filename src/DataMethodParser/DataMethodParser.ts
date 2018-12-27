import { DataParser } from "../DataParser";
import { DataMethodParsingResult } from "./DataMethodParsingResult";
import { RawAccessLevel } from "../AccessLevel";
import { DataMethod } from "../DataMethod/DataMethod";
import { DataMethodType } from "../DataMethod/DataMethodType";

export class DataMethodParser extends DataParser {

    /// 0 : "Matched string"
    /// 1 : (\@IBAction)?
    /// 2 : (public|internal|private|open)?
    /// 3 : (func)
    /// 4 : ([\w\d]+) 
    /// 5 : ([\w\d: _,\s \?=]*)
    /// 6: ([.\s\w\W\S\n]*)
    regexp: RegExp = /(IBAction)?\s*(public|internal|private|open|)?\s*(func)\s*([\w\d]+)\s?\(([\w\d: _,\s \?=]*)\)\s*{([.\s\w\W\S\n]*)/
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

    throwIfMatchNotFound(line: string): RegExpMatchArray {
        if(line === undefined || line === null) new Error('The line is undefined or null')
        const search = line.trim().match(this.regexp)
        if(search === undefined|| search === null) throw new Error('No match was found for this line')
        return search
    } 

}