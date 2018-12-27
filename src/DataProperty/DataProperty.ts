import { AccessControlType } from '../AccessLevel';
import { VariableType } from '../Variable';
import { DataPropertyType as DataPropertyType } from './DataPropertyType';

export class DataProperty implements DataPropertyType{
    
    accessLevel: AccessControlType
    variableType: VariableType
    arc: string
    name: string
    value: any
    type: string

    /**
     *Creates an instance of DataProperty.
     * @param {VariableType} varType
     * @param {string} name
     * @param {string} type
     * @param {string} value
     * @param {AccessControlType} accessControl
     * @memberof DataProperty
     */
    public constructor(varType: VariableType , 
                        name: string , 
                        type: string , 
                        value: string , 
                        accessControl: AccessControlType, 
                        arc: string) {
        this.variableType = varType
        this.name = name
        this.type = type
        this.value = value
        this.accessLevel = accessControl
        this.arc = arc
    }

    
}



