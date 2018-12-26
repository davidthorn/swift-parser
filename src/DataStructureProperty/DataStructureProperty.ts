import { AccessControlType, UndefinedAccessControl } from '../AccessControl';
import { UndefinedVariable, VariableType } from '../Variable';
import { DataStructurePropertyType } from './DataStructurePropertyType';

export class DataStructureProperty implements DataStructurePropertyType{
    
    static regexp: RegExp = /(public|internal|private|fileprivate)?\s*(weak|unowned)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+)\s*=\s*\"?([\w\d]+)"?;?{?/
    accessControl: AccessControlType = new UndefinedAccessControl()
    variableType: VariableType = new UndefinedVariable()
    arc: string | undefined = undefined
    name: string | undefined = undefined
    value: any | undefined = undefined
    completed: boolean = false
    started:  boolean = false
    type: string | undefined = undefined
    
}



