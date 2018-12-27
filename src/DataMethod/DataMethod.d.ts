import { AccessLevelType } from '../AccessLevel';
import { DataMethodType } from './DataMethodType';
export declare class DataMethod implements DataMethodType {
    accessLevel: AccessLevelType;
    methodName: string;
    parameters: string[];
    inner: string;
    constructor(methodName: string, accessLevel: AccessLevelType, parameters: string[]);
}
