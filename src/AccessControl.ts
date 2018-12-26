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

export const getAccessControl = (access: String | undefined | null): AccessControlType => {
    switch(access) {
        case undefined: 
        return new UndefinedAccessControl()
        case "internal": 
        return new InternalAccessControl()
        case "public": 
        return new PublicAccessControl()
        case "private": 
        return new PrivateAccessControl()
        case null: throw new Error('it cant be null')
        default:
            return new UndefinedAccessControl()
    }
}