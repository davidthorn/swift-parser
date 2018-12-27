import { DataStructureTypeName } from './DataStructureTypeName';
import { DataStructureType } from './DataStructureType';
import { DataMethodType } from '../DataMethod/DataMethodType';
import { AccessLevelType } from '../AccessLevel';
import { DataPropertyType } from '../DataProperty/DataPropertyType';
export declare class DataStructure implements DataStructureType {
    type: DataStructureTypeName;
    AccessLevel: AccessLevelType;
    name: string;
    properties: DataPropertyType[];
    methods: DataMethodType[];
    constructor(name: string, type: DataStructureTypeName, AccessLevel: AccessLevelType);
}
