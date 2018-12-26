import { UndefinedAccessControl, AccessControlType } from '../AccessControl';
import { DataStructureTypeName} from './DataStructureTypeName';
import { ClassDataStructureTypeName } from './ClassDataStructureTypeName';
import { EnumDataStructureTypeName } from './implementations/EnumDataStructureTypeName';
import { ProtocolDataStructure } from './implementations/ProtocolDataStructure';
import { StructDataStructureTypeName } from './implementations/StructDataStructureTypeName';
import { UndefinedDataStructureTypeName } from './implementations/UndefinedDataStructureTypeName';
import { DataStructureType } from './DataStructureType';
import { DataStructurePropertyType } from '../DataStructureProperty/DataStructurePropertyType';
import { DataStructureMethod } from '../DataStructureMethod';

export const getStructureType = (structure: string | undefined | null): DataStructureTypeName=> {
    if (structure === undefined || structure === null) throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol')
    switch (structure) {
        case "struct": return new StructDataStructureTypeName()
        case "class": return new ClassDataStructureTypeName()
        case "enum": return new EnumDataStructureTypeName()
        case "protocol": return new ProtocolDataStructure()
        default:
            throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol')
    }
}

export class DataStructure implements DataStructureType {

    static regexp: RegExp = /(public|private|internal)?\s*(class|struct|protocol|enum)\s+([\w\d]+)\s+{$/
    type: DataStructureTypeName= new UndefinedDataStructureTypeName()
    accessControl: AccessControlType = new UndefinedAccessControl()
    name: string | undefined = undefined
    properties: DataStructurePropertyType[] = []
    methods: DataStructureMethod[] = []
    completed: boolean = false
    started: boolean = false
    inner: string = ""
}


