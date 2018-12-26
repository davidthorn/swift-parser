import { AccessControlType, UndefinedAccessControl } from './AccessControl';
import { UndefinedVariable, VariableType } from './Variable';

export type DataStructureProperty = {
    accessControl: AccessControlType
    variableType: VariableType
    name: string | undefined
    value: any | undefined
    completed: boolean
    started: boolean
    type: string | undefined
}

const rawProperty: DataStructureProperty = {
    accessControl: new UndefinedAccessControl(),
    variableType: new UndefinedVariable(),
    name: undefined,
    value: undefined,
    completed: false,
    started: false,
    type: undefined
    
}

export class RawProperty {

    public static create(): DataStructureProperty {
        return Object.create(rawProperty)
    }

}
