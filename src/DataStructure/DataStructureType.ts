import { AccessControlType } from '../AccessControl';
import { DataStructureMethod } from '../DataStructureMethod';
import { DataStructureTypeName} from './DataStructureTypeName';
import { DataPropertyType } from '../DataProperty/DataPropertyType';

export interface DataStructureType {
    type: DataStructureTypeName
    accessControl: AccessControlType
    name: string | undefined
    properties: DataPropertyType[]
    methods: DataStructureMethod[]
}
