import { AccessControlType } from '../AccessControl';
import { VariableType } from '../Variable';

export interface DataPropertyType {
    accessControl: AccessControlType
    variableType: VariableType
    arc: string
    name: string
    value: any | undefined
    type: string
}