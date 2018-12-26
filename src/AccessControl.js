"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PublicAccessControl {
    constructor() {
        this.name = "public";
    }
}
exports.PublicAccessControl = PublicAccessControl;
class UndefinedAccessControl {
    constructor() {
        this.name = undefined;
    }
}
exports.UndefinedAccessControl = UndefinedAccessControl;
class InternalAccessControl {
    constructor() {
        this.name = "internal";
    }
}
exports.InternalAccessControl = InternalAccessControl;
class PrivateAccessControl {
    constructor() {
        this.name = "private";
    }
}
exports.PrivateAccessControl = PrivateAccessControl;
class RawAccessControl {
    /**
     * Parses the access string provided into a AccessControlType
     *
     * @static
     * @param {(String | undefined | null)} access
     * @returns {AccessControlType}
     * @memberof RawAccessControl
     */
    static parse(access) {
        switch (access) {
            case undefined:
                return new InternalAccessControl();
            case "internal":
                return new InternalAccessControl();
            case "public":
                return new PublicAccessControl();
            case "private":
                return new PrivateAccessControl();
            default:
                return new UndefinedAccessControl();
        }
    }
}
exports.RawAccessControl = RawAccessControl;
