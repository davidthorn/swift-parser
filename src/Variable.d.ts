export interface VariableType {
    name: string | undefined;
}
export declare class ImmutableVariable implements VariableType {
    name: string;
}
export declare class MutableVariable implements VariableType {
    name: string;
}
export declare class DynamicVariable implements VariableType {
    name: string;
}
export declare class UndefinedVariable implements VariableType {
    name: string | undefined;
}
export declare class RawVariable {
    static parse(identifier: String | undefined | null): VariableType;
}
