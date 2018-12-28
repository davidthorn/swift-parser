import { AccessLevelType } from '../AccessLevel';
import { DataMethodType } from '../DataMethod/DataMethodType';
import { DataStructureTypeName} from './DataStructureTypeName';
import { DataPropertyType } from '../DataProperty/DataPropertyType';
import { ClassDataStructureTypeName } from './implementations/ClassDataStructureTypeName';
import { StructDataStructureTypeName } from './implementations/StructDataStructureTypeName';
import { EnumDataStructureTypeName } from './implementations/EnumDataStructureTypeName';
import { ProtocolDataStructureTypeName } from './implementations/ProtocolDataStructure';

export interface DataStructureType {
    type: DataStructureTypeName
    AccessLevel: AccessLevelType
    name: string | undefined
    properties: DataPropertyType[]
    methods: DataMethodType[]
}

export const structureTypeName =  (type?: string): DataStructureTypeName => {
    switch(type) {
        case undefined: 
        return new ClassDataStructureTypeName()
        case "class": 
        return new ClassDataStructureTypeName()
        case "struct": 
        return new StructDataStructureTypeName()
        case "enum": 
        return new EnumDataStructureTypeName()
        case "protocol": 
        return new ProtocolDataStructureTypeName()
        default:
            return new ClassDataStructureTypeName()
    }
}
