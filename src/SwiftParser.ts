export type DataStructure = {
    type: "class" | "enum" | "protocol" | "struct" | undefined
    accessControl: "public" | "internal" | "private" | undefined
    name: string | undefined
    properties: DataStructureProperty[]
    methods: string[]
    completed: boolean
    started: boolean
}

export const DataStructureAccessControlIdentifiers: string[] = [ "public" , "internal" , "private" ]

export type DataStructureProperty = {
    accessControl: "public" | "internal" | "private" | undefined
    readonly: boolean | undefined
    name: string | undefined
    value: any | undefined
    completed: boolean
    started: boolean
    type: string | undefined
}

export const property: DataStructureProperty = {
    accessControl: undefined,
    readonly: undefined,
    name: undefined,
    value: undefined,
    completed: false,
    started: false,
    type: undefined
    
}

export let classes: DataStructure[] = []

export let currentDataStructure:DataStructure = {
    type: undefined,
    accessControl: undefined,
    name: undefined,
    properties: [],
    methods: [],
    completed: false,
    started: false
}


export const getAccessControl = (access: String | undefined | null): "public" | "internal" | "private" | undefined => {
    switch(access) {
        case null: throw new Error('it cant be null')
        case undefined || "internal": 
        return "internal"
        break
        case "public": 
        return "public"
        break
        case "private": 
        return "private"
        break
    }
}

export const isReadOnly = (identifier: string | undefined | null ): boolean =>  {
    if(identifier === undefined || identifier === null) throw new Error('The identifier must be either var or let it cannot be null or undefined')
    return identifier === "var" ? false : true
}

export const getStructureName = (structure: string | undefined | null ): "class" | "enum" | "protocol" | "struct" =>  {
    if(structure === undefined || structure === null) throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol')
    switch (structure) {
        case "struct" : return "struct"
        case "class" : return "class"
        case "enum" : return "enum"
        case "protocol" : return "protocol"
        default: 
            throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol')
    }
}


export const getPropertyField = (propertyIdentifier: string | undefined | null ): string =>  {
    if(propertyIdentifier === undefined || propertyIdentifier === null) throw new Error('The property cannot be null or undefined')
    return propertyIdentifier
}

export const parsePropertyFromLine = (line: string | undefined | null): DataStructureProperty => {
    if(line === undefined || line === null ) throw new Error('line must not be null or undefined')
    const searchProperty = line.trim().match(/(public|internal|private|fileprivate)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+)\s*=\s*\"?([\w\d]+)"?;?{?/) 
    if(searchProperty === undefined || searchProperty === null) throw new Error('no property found in line data')
    const localProperty = Object.create(property)
    localProperty.accessControl = getAccessControl(searchProperty[1])
    localProperty.readonly = isReadOnly(searchProperty[2])
    localProperty.name = getPropertyField(searchProperty[3])
    localProperty.type = getPropertyField(searchProperty[4])
    localProperty.value = getPropertyField(searchProperty[5])
    localProperty.started = true
    localProperty.completed = false
    return localProperty

}
