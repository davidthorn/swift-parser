import { DataStructure, 
    DataStructureType, 
    StructDataStructure, 
    ClassDataStructure, 
    EnumDataStructure, 
    ProtocolDataStructure } from './DataStructure'


import { DataStructureProperty, RawProperty } from './DataStructureProperty'

export const DataStructureAccessControlIdentifiers: string[] = [ "public" , "internal" , "private" ]

export let classes: DataStructure[] = []


