export interface AccessControlType {
    name: string | undefined
}

export class PublicAccessControl implements AccessControlType {
    name: string = "public"
}

export class UndefinedAccessControl implements AccessControlType {
    name: string | undefined = undefined
}

export class InternalAccessControl implements AccessControlType {
    name: string = "internal"
}

export class PrivateAccessControl implements AccessControlType {
    name: string = "private"
}

export class FilePrivateAccessControl implements AccessControlType {
    name: string = "fileprivate"
}

export class OpenAccessControl implements AccessControlType {
    name: string = "open"
}

export class RawAccessControl {

    /**
     * Parses the access string provided into a AccessControlType
     *
     * @static
     * @param {(String | undefined | null)} access
     * @returns {AccessControlType}
     * @memberof RawAccessControl
     */
    public static parse(access: String | undefined | null): AccessControlType {
        switch(access) {
            case undefined: 
            return new InternalAccessControl()
            case "open": 
            return new OpenAccessControl()
            case "internal": 
            return new InternalAccessControl()
            case "public": 
            return new PublicAccessControl()
            case "private": 
            return new PrivateAccessControl()
            case "fileprivate": 
            return new FilePrivateAccessControl()
            default:
                return new UndefinedAccessControl()
        }
    }

}