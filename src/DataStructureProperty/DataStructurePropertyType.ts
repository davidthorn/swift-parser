import { AccessControlType } from '../AccessControl';
import { VariableType } from '../Variable';

export interface DataStructurePropertyType {
    accessControl: AccessControlType
    variableType: VariableType
    arc: string | undefined
    name: string | undefined
    value: any | undefined
    completed: boolean
    started: boolean
    type: string | undefined
}