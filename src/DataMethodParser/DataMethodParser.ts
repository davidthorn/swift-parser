import { DataParser } from "../DataParser";
import { DataMethodParsingResult } from "./DataMethodParsingResult";
import { RawAccessLevel } from "../AccessLevel";
import { DataMethod } from "../DataMethod/DataMethod";
import { DataMethodType } from "../DataMethod/DataMethodType";
import { stringify } from "querystring";
import { searchForClosingBracket } from "../parseLastBracket";

export type DataMethodInfo = { 
    outlet?: string ,  
    access_level?: string , 
    params?: string[], 
    methodName?: string,
    returnValue?: string,
    paramsString?: string
}

export class DataMethodParser extends DataParser {

    /// 0 : "Matched string"
    /// 1 : (\@IBAction)?
    /// 2 : (public|internal|private|open)?
    /// 3 : (func)
    /// 4 : ([\w\d]+) 
    /// 5 : ([\w\d: _,\s \?=]*)
    /// 6: ([.\s\w\W\S\n]*)
    //regexp: RegExp = /(IBAction)?\s*(public|internal|private|open|)?\s*(func)\s*([\w\d]+)\s?\(([\w\d: _,\s \?=]*)\)\s*{([.\s\w\W\S\n]*)/
    regexp: RegExp = /(@IB[\w]+|)(?=\s*(public|private|internal|open|fileprivate|)(?=\s*(func(?=\s+([\w]+(?=\s*([\w\s\W\d]*)))))))/
    paramsRegexp: RegExp = /\(\s*([\w\d]+\s*[\w\d]+\s*:\s*[^,]+)\s*,?\)/
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

    /**
     * Parses the data line by line attempting to convert the data into a swift method
     * 
     *
     * @param {string[]} lines
     * @returns {DataMethodParsingResult}
     * @memberof DataMethodParser
     */
    public parseMethod(lines: string[]): DataMethodParsingResult {
        const line = lines.shift()
        if(line === undefined || line === null) return { remainingLines: lines , error: new Error('the line cannot be null') }
        const search = line.match(this.regexp)
        if(search === null || search === undefined) return { remainingLines: lines, error: new Error('no match found for a line') }
        
        const accessLevel = RawAccessLevel.parse(search[2])
        const methodName = search[4]
        
        const dataMethod = new DataMethod(methodName , accessLevel , [])

        let end = search[6].split('\n').concat(lines)

        const { inner , remainingLines } = this.getParseResult(end)
        
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

    extractMethodParams(search: string) : { params: string[] , remainingString: string } {

        const { matchedString , remainingString  } = searchForClosingBracket('(' , search)
        
        const paramsString = matchedString || ''
        return {
            params: paramsString.split(',').filter(i => { return i.trim() }),
            remainingString
        }
    }

    extractMethodInformationFromString(search: string): { remainingString: string, data: DataMethodInfo } {

        const reg = /\s*(@IB[\w]+|)(?=\s*(public|private|internal|open|fileprivate|)(?=\s*(func(?=\s+([\w]+(?=\s*([\w\s\W\d]*)))))))/
        const result: RegExpMatchArray | null = search.match(reg)
        if(result === null) return {
            remainingString: search,
            data: {}
        } 

        const { params } = this.extractMethodParams(result[5])
        return {
            remainingString: result[5],
            data: {
                outlet: result[1].length > 0 ? result[1] : undefined,
                access_level: result[2].length > 0 ? result[2] : undefined,
                methodName: result[4],
                params,
                paramsString: result[5]
            }
        }
    
    }

    extractBodyFromString(search: string): { remainingString: string, data: string } {
        const { remainingString , matchedString } = searchForClosingBracket('{' , search)
        return {
            remainingString: remainingString.trim(),
            data: matchedString || '',
        }
    }
    

}