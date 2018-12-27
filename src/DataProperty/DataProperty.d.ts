import { AccessLevelType } from '../AccessLevel';
import { VariableType } from '../Variable';
import { DataPropertyType as DataPropertyType } from './DataPropertyType';
export declare class DataProperty implements DataPropertyType {
    accessLevel: AccessLevelType;
    variableType: VariableType;
    arc: string;
    name: string;
    value: any;
    type: string;
    /**
     *Creates an instance of DataProperty.
     * @param {VariableType} varType
     * @param {string} name
     * @param {string} type
     * @param {string} value
     * @param {AccessLevelType} AccessLevel
     * @memberof DataProperty
     */
    constructor(varType: VariableType, name: string, type: string, value: string, AccessLevel: AccessLevelType, arc: string);
}
