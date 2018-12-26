import { DataStructureProperty } from './DataStructureProperty'
import { AccessControlType, UndefinedAccessControl, RawAccessControl } from './AccessControl';

export type DataStructure = {
    regexp: RegExp
    type: DataStructureType
    accessControl: AccessControlType
    name: string | undefined
    properties: DataStructureProperty[]
    methods: string[]
    completed: boolean
    started: boolean
}

export interface DataStructureType {
    name: string | undefined
}

export class ClassDataStructure implements DataStructureType {
    name: string = "class"
}

export class EnumDataStructure implements DataStructureType {
    name: string = "enum"
}

export class ProtocolDataStructure implements DataStructureType {
    name: string = "protocol"
}

export class StructDataStructure implements DataStructureType {
    name: string = "struct"
}

export class UndefinedDataStructure implements DataStructureType {
    name: string | undefined = undefined
}

const getStructureType = (structure: string | undefined | null ): DataStructureType =>  {
    if(structure === undefined || structure === null) throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol')
    switch (structure) {
        case "struct" : return new StructDataStructure()
        case "class" : return new ClassDataStructure()
        case "enum" : return new EnumDataStructure()
        case "protocol" : return new ProtocolDataStructure()
        default: 
            throw new Error('The structure cannot be null or undefined it must be either class|struct|enum|protocol')
    }
}


const rawDataStructure:DataStructure = {
    regexp: /(public|private|internal)?\s*(class|struct|protocol|enum)\s+([\w\d]+)\s+{$/,
    type: new UndefinedDataStructure(),
    accessControl: new UndefinedAccessControl(),
    name: undefined,
    properties: [],
    methods: [],
    completed: false,
    started: false
}

export class RawDataStructure {
   
    public static create(): DataStructure {
        return Object.create(rawDataStructure)
    }

    public static parse(line: string | undefined | null): DataStructure {
        if(line === undefined || line === null) throw new Error('the line cannot be null')
        const search = line.match(rawDataStructure.regexp)
        if(search === null || search === undefined)  throw new Error('no match found for a line')
        let data = RawDataStructure.create()
        data.started = true
        data.type = getStructureType(search[2])
        data.accessControl = RawAccessControl.parse(search[1])
        data.name = search[3]
        return data
    }

}


