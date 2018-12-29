import { DataParameterType } from "./DataParameterType";

export class DataParameter implements DataParameterType {

    name: string
    varName?: string
    isOptional: boolean
    defaultValue?: any
    type: string

    constructor(options: { varName?: string , name: string , type: string , isOptional: boolean , defaultValue?: any }) {
        this.name = options.name
        this.varName = options.varName
        this.type = options.type
        this.isOptional = options.isOptional
        this.defaultValue = options.defaultValue
    }


}