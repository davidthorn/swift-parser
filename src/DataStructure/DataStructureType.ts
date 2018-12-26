import { DataStructureProperty } from '../DataStructureProperty/DataStructureProperty';
import { AccessControlType } from '../AccessControl';
import { DataStructureMethod } from '../DataStructureMethod';
import { DataStructureTypeName} from './DataStructureTypeName';

export interface DataStructureType {
    type: DataStructureTypeName
    accessControl: AccessControlType
    name: string | undefined
    properties: DataStructureProperty[]
    methods: DataStructureMethod[]
    completed: boolean
    started: boolean
    inner: string
}
