import { AccessLevelType } from '../AccessLevel';
import { DataMethodType } from '../DataMethod/DataMethodType';
import { DataStructureTypeName } from './DataStructureTypeName';
import { DataPropertyType } from '../DataProperty/DataPropertyType';
export interface DataStructureType {
    type: DataStructureTypeName;
    AccessLevel: AccessLevelType;
    name: string | undefined;
    properties: DataPropertyType[];
    methods: DataMethodType[];
}
export declare const structureTypeName: (type?: string | undefined) => DataStructureTypeName;
