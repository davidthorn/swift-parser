"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseText = (text) => {
    const result = text.split('').reduce((a, b) => {
        if (a.completed === true) {
            return Object.assign({}, a, { r: `${a.r}${b}` });
        }
        let d = "";
        let e = "";
        let _open = a.open;
        let _closed = a.closed;
        let isCompleted = a.completed;
        if (b === '{') {
            _open += 1;
        }
        if (b === '}') {
            _closed += 1;
        }
        if (_closed > _open && b === '}') {
            isCompleted = true;
            d = a.n;
        }
        if (!isCompleted) {
            d = `${a.n}${b}`;
        }
        else {
            e = `${a.r}`;
        }
        return {
            n: d,
            r: e,
            open: _open,
            closed: _closed,
            completed: isCompleted
        };
    }, { n: "", r: "", open: 0, closed: 0, completed: false });
    return {
        closed: result.n,
        remaining: result.r,
        old: text,
        completed: result.completed
    };
};
