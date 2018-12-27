import { AccessControlType as AccessLevelType } from '../AccessLevel';
import { VariableType } from '../Variable';

export interface DataPropertyType {

    /**
     * Access Level
     * public
     * open
     * private
     * fileprivate
     * internal
     * 
     * By default all methods, structures and variables are internal if none is supplied
     *
     * @type {AccessLevelType}
     * @memberof DataPropertyType
     */
    accessLevel: AccessLevelType
    variableType: VariableType
    arc: string
    name: string
    value: any | undefined
    type: string
}