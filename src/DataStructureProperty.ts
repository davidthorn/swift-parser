import { AccessControlType, UndefinedAccessControl, RawAccessControl } from './AccessControl';
import { UndefinedVariable, VariableType, RawVariable } from './Variable';

export type DataStructureProperty = {
    regexp: RegExp
    accessControl: AccessControlType
    variableType: VariableType
    arc: string | undefined
    name: string | undefined
    value: any | undefined
    completed: boolean
    started: boolean
    type: string | undefined
}

const rawProperty: DataStructureProperty = {
    regexp: /(public|internal|private|fileprivate)?\s*(weak|unowned)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+)\s*=\s*\"?([\w\d]+)"?;?{?/,
    accessControl: new UndefinedAccessControl(),
    variableType: new UndefinedVariable(),
    arc: undefined,
    name: undefined,
    value: undefined,
    completed: false,
    started: false,
    type: undefined
    
}

const getPropertyField = (propertyIdentifier: string | undefined | null ): string =>  {
    if(propertyIdentifier === undefined || propertyIdentifier === null) throw new Error('The property cannot be null or undefined')
    return propertyIdentifier
}

export class RawProperty {

    public static create(): DataStructureProperty {
        return Object.create(rawProperty)
    }

    public static parse(line: string | undefined | null): DataStructureProperty {
        if(line === undefined || line === null ) throw new Error('line must not be null or undefined')
        const searchProperty = line.trim().match(rawProperty.regexp) 
        if(searchProperty === undefined || searchProperty === null) throw new Error('no property found in line data')
        const localProperty = RawProperty.create()
        localProperty.accessControl = RawAccessControl.parse(searchProperty[1])
        localProperty.arc = searchProperty[2]
        localProperty.variableType = RawVariable.parse(searchProperty[3])
        localProperty.name = getPropertyField(searchProperty[4])
        localProperty.type = getPropertyField(searchProperty[5])
        localProperty.value = getPropertyField(searchProperty[6])
        localProperty.started = true
        localProperty.completed = false
        return localProperty
    }

}
