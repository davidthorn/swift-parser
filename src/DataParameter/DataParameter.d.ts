import { DataParameterType } from "./DataParameterType";
export declare class DataParameter implements DataParameterType {
    name: string;
    varName?: string;
    isOptional: boolean;
    defaultValue?: any;
    type: string;
    constructor(options: {
        varName?: string;
        name: string;
        type: string;
        isOptional: boolean;
        defaultValue?: any;
    });
}
