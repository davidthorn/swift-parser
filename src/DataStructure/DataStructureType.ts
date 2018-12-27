import { AccessLevelType } from '../AccessLevel';
import { DataStructureMethod } from '../DataStructureMethod';
import { DataStructureTypeName} from './DataStructureTypeName';
import { DataPropertyType } from '../DataProperty/DataPropertyType';

export interface DataStructureType {
    type: DataStructureTypeName
    AccessLevel: AccessLevelType
    name: string | undefined
    properties: DataPropertyType[]
    methods: DataStructureMethod[]
}
