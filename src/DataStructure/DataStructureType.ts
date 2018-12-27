import { AccessLevelType } from '../AccessLevel';
import { DataMethodType } from '../DataMethodType';
import { DataStructureTypeName} from './DataStructureTypeName';
import { DataPropertyType } from '../DataProperty/DataPropertyType';

export interface DataStructureType {
    type: DataStructureTypeName
    AccessLevel: AccessLevelType
    name: string | undefined
    properties: DataPropertyType[]
    methods: DataMethodType[]
}
