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
    static parse(access) {
        switch (access) {
            case undefined:
                return new UndefinedAccessControl();
            case "internal":
                return new InternalAccessControl();
            case "public":
                return new PublicAccessControl();
            case "private":
                return new PrivateAccessControl();
            case null: throw new Error('it cant be null');
            default:
                return new UndefinedAccessControl();
        }
    }
}
exports.RawAccessControl = RawAccessControl;
