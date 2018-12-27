export interface AccessLevelType {
    name: string | undefined;
}
export declare class PublicAccessLevel implements AccessLevelType {
    name: string;
}
export declare class UndefinedAccessLevel implements AccessLevelType {
    name: string | undefined;
}
export declare class InternalAccessLevel implements AccessLevelType {
    name: string;
}
export declare class PrivateAccessLevel implements AccessLevelType {
    name: string;
}
export declare class FilePrivateAccessLevel implements AccessLevelType {
    name: string;
}
export declare class OpenAccessLevel implements AccessLevelType {
    name: string;
}
export declare class RawAccessLevel {
    /**
     * Parses the access string provided into a AccessLevelType
     *
     * @static
     * @param {(String | undefined | null)} access
     * @returns {AccessLevelType}
     * @memberof RawAccessLevel
     */
    static parse(access: String | undefined | null): AccessLevelType;
}
