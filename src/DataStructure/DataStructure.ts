import { DataStructureTypeName} from './DataStructureTypeName';
import { DataStructureType } from './DataStructureType';
import { DataStructureMethod } from '../DataStructureMethod';
import { AccessLevelType } from '../AccessLevel';
import { DataPropertyType } from '../DataProperty/DataPropertyType';

export class DataStructure implements DataStructureType {
    
    type: DataStructureTypeName
    AccessLevel: AccessLevelType
    name: string
    properties: DataPropertyType[]
    methods: DataStructureMethod[]

    public constructor(name: string , type: DataStructureTypeName , AccessLevel: AccessLevelType ) {
        this.name = name
        this.type = type
        this.AccessLevel = AccessLevel
        this.properties = []
        this.methods = []
    }
}


