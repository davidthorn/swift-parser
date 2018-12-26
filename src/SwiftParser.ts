import { DataStructure, 
    DataStructureType, 
    StructDataStructure, 
    ClassDataStructure, 
    EnumDataStructure, 
    ProtocolDataStructure } from './DataStructure'

import { getVariableType } from './Variable'
import { getAccessControl } from './AccessControl'

import { DataStructureProperty, RawProperty } from './DataStructureProperty'

export const DataStructureAccessControlIdentifiers: string[] = [ "public" , "internal" , "private" ]

export let classes: DataStructure[] = []


export const getPropertyField = (propertyIdentifier: string | undefined | null ): string =>  {
    if(propertyIdentifier === undefined || propertyIdentifier === null) throw new Error('The property cannot be null or undefined')
    return propertyIdentifier
}

export const parsePropertyFromLine = (line: string | undefined | null): DataStructureProperty => {
    if(line === undefined || line === null ) throw new Error('line must not be null or undefined')
    const searchProperty = line.trim().match(/(public|internal|private|fileprivate)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+)\s*=\s*\"?([\w\d]+)"?;?{?/) 
    if(searchProperty === undefined || searchProperty === null) throw new Error('no property found in line data')
    const localProperty = RawProperty.create()
    localProperty.accessControl = getAccessControl(searchProperty[1])
    localProperty.variableType = getVariableType(searchProperty[2])
    localProperty.name = getPropertyField(searchProperty[3])
    localProperty.type = getPropertyField(searchProperty[4])
    localProperty.value = getPropertyField(searchProperty[5])
    localProperty.started = true
    localProperty.completed = false
    return localProperty

}
