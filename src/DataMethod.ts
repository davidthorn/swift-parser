import { AccessLevelType } from './AccessLevel';
import { DataMethodType } from './DataMethodType';

export class DataMethod implements DataMethodType {
    
    accessLevel: AccessLevelType
    methodName: string
    parameters: string[]
    inner: string = ""

    constructor(methodName: string , accessLevel: AccessLevelType, parameters: string[]  ) {
        this.methodName = methodName
        this.accessLevel = accessLevel
        this.parameters = parameters
    }
    
}
