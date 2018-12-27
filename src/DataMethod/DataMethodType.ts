import { AccessLevelType } from '../AccessLevel';
export interface DataMethodType {
    accessLevel: AccessLevelType;
    methodName: string;
    inner: string;
    parameters: string[];
}
