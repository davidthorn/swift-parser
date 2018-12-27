import { DataStructureTypeName} from './DataStructureTypeName';
import { DataStructureType } from './DataStructureType';
import { DataStructurePropertyType } from '../DataStructureProperty/DataStructurePropertyType';
import { DataStructureMethod } from '../DataStructureMethod';
import { AccessControlType } from '../AccessControl';

export class DataStructure implements DataStructureType {
    
    type: DataStructureTypeName
    accessControl: AccessControlType
    name: string
    properties: DataStructurePropertyType[]
    methods: DataStructureMethod[]

    public constructor(name: string , type: DataStructureTypeName , accessControl: AccessControlType ) {
        this.name = name
        this.type = type
        this.accessControl = accessControl
        this.properties = []
        this.methods = []
    }
}


