import { AccessControlType, UndefinedAccessControl, RawAccessControl } from './AccessControl';
import { parseText } from './parseLastBracket';

export type DataStructureMethodParsingResult = {
    remainingLines: string[]
    property?: DataStructureMethod
    error?: Error
}

export type DataStructureMethod = {
    regexp: RegExp
    accessControl: AccessControlType
    methodName: string | undefined
    value: any | undefined
    completed: boolean
    started: boolean
    inner: string
}

const rawMethod: DataStructureMethod = {
    regexp: /\s*(public|internal|private)\s+(func)\s*([\w\d]+)\s?\(([\w\d: _,\s \?=]*)\)\s*{/,
    //regexp: /(public|internal|private|fileprivate)?\s*(func)\s+([\w\d]+)\s*/,
    accessControl: new UndefinedAccessControl(),
    methodName: undefined,
    value: undefined,
    completed: false,
    started: false,
    inner: ""
    
}

export class RawMethod {

    public static create(): DataStructureMethod {
        return Object.create(rawMethod)
    }

    public static parse(lines: string[]): DataStructureMethodParsingResult {
        const line = lines.shift()
        if(line === undefined || line === null) return { remainingLines: lines , error: new Error('the line cannot be null') }
        const search = line.match(rawMethod.regexp)
        if(search === null || search === undefined) return { remainingLines: lines, error: new Error('no match found for a line') }
        let data = RawMethod.create()
        data.started = true
        data.accessControl = RawAccessControl.parse(search[1])
        data.methodName = search[3]

        const parsedResult = parseText(lines.join('\n'))
        data.inner = parsedResult.closed
        const newLines = parsedResult.remaining.split('\n').filter(l => {
            let f = l.trim()
            if(f !== '\n') return f
        })

        return {
            remainingLines: newLines,
            property: data
        }
    }

}
