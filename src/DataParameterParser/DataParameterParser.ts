import { searchForClosingBracket } from "../parseLastBracket";
import { DataParameter } from "../DataParameter/DataParameter";

export class DataParameterParser {

    paramsRegexp: RegExp = /\(\s*([\w\d]+\s*[\w\d]+\s*:\s*[^,]+)\s*,?\)/

    public constructor() {

    }

    public parse(lines: string[]): { remainingLines?: string[] , parameters: any[] } {

        const { remainingString , params } = this.extractMethodParams(lines.join('\n'))

        const parameters = params.map(this.getParameterParts).map( i => {
            return new DataParameter(i)
        })

        return {
            remainingLines: undefined,
            parameters
        }

    }

    extractMethodParams(search: string) : { params: string[] , remainingString: string } {

        const { matchedString , remainingString  } = searchForClosingBracket('(' , search)
        
        const paramsString = matchedString || ''
        return {
            params: paramsString.split(',').filter(i => { return i.trim() }),
            remainingString
        }
    }
    
    /**
     * Parses the string and returns all data which is provided to know what each parameters types are
     *
     * @param {string} paramString
     * @returns {{ varName?: string , name: string , type: string , defaultValue?: any , isOptional: boolean , inout?: boolean  }}
     * @memberof DataParameterParser
     */
    getParameterParts(paramString: string) : { varName?: string , name: string , type: string , defaultValue?: any , isOptional: boolean , inout?: boolean  } {
        
        const s = paramString    
        const parts = /([\w\d]*?)\s*([\w\d]+)\s*\:\s*(inout)?\s*([^=]+)\s*=?\s*([\w\d\W\s]*)/
        const result = s.match(parts) 
        if(result === null) throw new Error('invalid parameters provided')
        result.shift()
        const varName = result.shift() || ''
        const name = result.shift()!
        const inout = result.shift() || ''
        const type = result.shift()!.trim()
        const defaultValue = result.shift() || ''
        
        const questionMark = type.substring(type.length - 1 , type.length)

        return {
            varName: varName.length === 0 ? undefined : varName,
            name,
            type,
            defaultValue: defaultValue.length === 0 ? undefined : defaultValue,
            isOptional: questionMark === '?' ? true : false,
            inout: inout === undefined ? undefined : true
        }
    }
}