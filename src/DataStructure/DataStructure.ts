import { DataStructureTypeName} from './DataStructureTypeName';
import { DataStructureType } from './DataStructureType';
import { DataStructureMethod } from '../DataStructureMethod';
import { AccessControlType } from '../AccessControl';
import { DataPropertyType } from '../DataProperty/DataPropertyType';

export class DataStructure implements DataStructureType {
    
    type: DataStructureTypeName
    accessControl: AccessControlType
    name: string
    properties: DataPropertyType[]
    methods: DataStructureMethod[]

    public constructor(name: string , type: DataStructureTypeName , accessControl: AccessControlType ) {
        this.name = name
        this.type = type
        this.accessControl = accessControl
        this.properties = []
        this.methods = []
    }
}


