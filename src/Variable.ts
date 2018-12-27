export interface VariableType {
    name: string | undefined
}

export class ImmutableVariable implements VariableType {
    name: string  = "let"
}

export class MutableVariable implements VariableType {
    name: string  = "var"
}

export class DynamicVariable implements VariableType {
    name: string  = "dynamic"
}

export class UndefinedVariable implements VariableType {
    name: string | undefined  = undefined
}

export class RawVariable {

    public static parse(identifier: String | undefined | null): VariableType {
        if(identifier === undefined || identifier === null) throw new Error('The identifier must be either var or let it cannot be null or undefined')
        switch(identifier) {
            case "var": return new MutableVariable()
            case "dynamic": return new DynamicVariable()
            case "let": return new ImmutableVariable()
            default: return new UndefinedVariable()
        }
    }

}