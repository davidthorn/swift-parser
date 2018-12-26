export declare type DataStructure = {
    type: "class" | "enum" | "protocol" | "struct" | undefined;
    accessControl: "public" | "internal" | "private" | undefined;
    name: string | undefined;
    properties: DataStructureProperty[];
    methods: string[];
    completed: boolean;
    started: boolean;
};
export declare const DataStructureAccessControlIdentifiers: string[];
export declare type DataStructureProperty = {
    accessControl: "public" | "internal" | "private" | undefined;
    readonly: boolean | undefined;
    name: string | undefined;
    value: any | undefined;
    completed: boolean;
    started: boolean;
    type: string | undefined;
};
export declare const property: DataStructureProperty;
export declare let classes: DataStructure[];
export declare let currentDataStructure: DataStructure;
export declare const getAccessControl: (access: String | null | undefined) => "public" | "internal" | "private" | undefined;
export declare const isReadOnly: (identifier: string | null | undefined) => boolean;
export declare const getStructureName: (structure: string | null | undefined) => "class" | "enum" | "protocol" | "struct";
export declare const getPropertyField: (propertyIdentifier: string | null | undefined) => string;
export declare const parsePropertyFromLine: (line: string | null | undefined) => DataStructureProperty;
//# sourceMappingURL=SwiftParser.d.ts.map