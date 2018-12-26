import { AccessControlType, UndefinedAccessControl, RawAccessControl } from './AccessControl';

export type DataStructureMethod = {
    regexp: RegExp
    accessControl: AccessControlType
    methodName: string | undefined
    value: any | undefined
    completed: boolean
    started: boolean
}

const rawMethod: DataStructureMethod = {
    regexp: /(public|internal|private|fileprivate)?\s*(func)\s+([\w\d]+)\s*/,
    accessControl: new UndefinedAccessControl(),
    methodName: undefined,
    value: undefined,
    completed: false,
    started: false
    
}

export class RawMethod {

    public static create(): DataStructureMethod {
        return Object.create(rawMethod)
    }

    public static parse(line: undefined | null | string): DataStructureMethod {
        if(line === undefined || line === null) throw new Error('the line cannot be null')
        const search = line.match(rawMethod.regexp)
        if(search === null || search === undefined)  throw new Error('no match found for a line')
        let data = RawMethod.create()
        data.started = true
        data.accessControl = RawAccessControl.parse(search[1])
        data.methodName = search[3]
        return data
    }

}
