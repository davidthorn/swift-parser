import { DataParser } from "../DataParser";
import { accessLevel } from "../AccessLevel";
import { DataMethod } from "../DataMethod/DataMethod";
import { DataMethodType } from "../DataMethod/DataMethodType";
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

    //regexp: RegExp = /(IBAction)?\s*(public|internal|private|open|)?\s*(func)\s*([\w\d]+)\s?\(([\w\d: _,\s \?=]*)\)\s*{([.\s\w\W\S\n]*)/
    globalMethodRegExp: RegExp = /(@IB[\w]+|)(?=\s*(public|private|internal|open|fileprivate|)(?=\s*(func(?=\s+([\w]+(?=\s*([\w\s\W\d]*)))))))/
    structureMethodRegExp: RegExp = new RegExp(`^${this.globalMethodRegExp.source}`)
    
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
                let result = this.parseStructureMethod(tmpLines)
                const { remainingLines , method } = result
                tmpLines = remainingLines
                if(method === undefined) throw new Error('jump to next line')
                methods.push(method)
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
    public parseStructureMethod(lines: string[]): { remainingLines: string[] , method?: DataMethodType } {
        return this.parseMethod(this.structureMethodRegExp , lines)
    }

    /**
     * Parses the data line by line attempting to convert the data into a swift method
     * 
     *
     * @param {string[]} lines
     * @returns {DataMethodParsingResult}
     * @memberof DataMethodParser
     */
    public parseGlobalMethod(lines: string[]): { remainingLines: string[] , method?: DataMethodType } {
        return this.parseMethod(this.globalMethodRegExp , lines)
    }

    /**
     * Parses the data line by line attempting to convert the data into a swift method
     * 
     *
     * @param {string[]} lines
     * @returns {DataMethodParsingResult}
     * @memberof DataMethodParser
     */
    private parseMethod(regexp: RegExp , lines: string[]): { remainingLines: string[] , method?: DataMethodType } {
        
        const line = lines.join('\n').trim()
        if(line === undefined || line === null)  {
            return { remainingLines: lines }
        }
         
        const search = line.match(regexp)
        
        if(search === null || search === undefined) {
            return { remainingLines: lines   }
        }
        
        const access_level = accessLevel(search[2])
        const methodName = search[4]
        
        const dataMethod = new DataMethod(methodName , access_level , [])
        let end = search[5].split('\n')
        const { params, remainingString  } = this.extractMethodParams(search[5])
        dataMethod.parameters = dataMethod.parameters.concat(params)

        const { inner , remainingLines } = this.getMethodBody(remainingString.split('\n'))
        
        dataMethod.inner = inner
        
        const ignoredLines = line.substring(0, search.index).split('\n')
       
        return {
            remainingLines: ignoredLines.concat(remainingLines),
            method: dataMethod
        }
    } 

    throwIfMatchNotFound(line: string): RegExpMatchArray {
        if(line === undefined || line === null) new Error('The line is undefined or null')
        const search = line.trim().match(this.structureMethodRegExp)
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