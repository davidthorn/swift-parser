"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImmutableVariable {
    constructor() {
        this.name = "let";
    }
}
exports.ImmutableVariable = ImmutableVariable;
class MutableVariable {
    constructor() {
        this.name = "var";
    }
}
exports.MutableVariable = MutableVariable;
class UndefinedVariable {
    constructor() {
        this.name = undefined;
    }
}
exports.UndefinedVariable = UndefinedVariable;
exports.getVariableType = (identifier) => {
    if (identifier === undefined || identifier === null)
        throw new Error('The identifier must be either var or let it cannot be null or undefined');
    switch (identifier) {
        case "var": return new MutableVariable();
        case "let": return new ImmutableVariable();
        default: return new UndefinedVariable();
    }
};
