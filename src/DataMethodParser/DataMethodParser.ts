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

    /**
     * Should extract all method arguments / parameters contained within brackets
     * The format of the search string should follow the synthax guide lines of swift 2+
     *
     * @param {string} search
     * @returns {string[]}
     * @memberof DataMethodParser
     */
    // extractParamsFromString(search: string): { params: string[] , remainingString?: string  } {
    //     const reg = /\((\s*[\w\d]*\s*[\w\d]*:?\s*[\w\d]*\s*,?){0,}\)/
        
    //     const paramsResult = search.match(reg)
    //     const paramsString = paramsResult === null ? undefined : paramsResult[1]
    //     const params = paramsString === undefined ? [] : paramsString.split(',').map(f => { return f.trim() })
    //     return {
    //         params
    //     }
    // }

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

    

}