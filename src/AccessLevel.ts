export interface AccessLevelType {
    name: string | undefined
}

export class PublicAccessLevel implements AccessLevelType {
    name: string = "public"
}

export class UndefinedAccessLevel implements AccessLevelType {
    name: string | undefined = undefined
}

export class InternalAccessLevel implements AccessLevelType {
    name: string = "internal"
}

export class PrivateAccessLevel implements AccessLevelType {
    name: string = "private"
}

export class FilePrivateAccessLevel implements AccessLevelType {
    name: string = "fileprivate"
}

export class OpenAccessLevel implements AccessLevelType {
    name: string = "open"
}

export class RawAccessLevel {

    /**
     * Parses the access string provided into a AccessLevelType
     *
     * @static
     * @param {(String | undefined | null)} access
     * @returns {AccessLevelType}
     * @memberof RawAccessLevel
     */
    public static parse(access: String | undefined | null): AccessLevelType {
        switch(access) {
            case undefined: 
            return new InternalAccessLevel()
            case "open": 
            return new OpenAccessLevel()
            case "internal": 
            return new InternalAccessLevel()
            case "public": 
            return new PublicAccessLevel()
            case "private": 
            return new PrivateAccessLevel()
            case "fileprivate": 
            return new FilePrivateAccessLevel()
            default:
                return new UndefinedAccessLevel()
        }
    }

}