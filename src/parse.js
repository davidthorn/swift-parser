"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const DataStructure_1 = require("./DataStructure");
const DataStructureMethod_1 = require("./DataStructureMethod");
let currentDataStructure = DataStructure_1.RawDataStructure.create();
let currentMethod = DataStructureMethod_1.RawMethod.create();
let classes = [];
const contents = fs.readFileSync(path.join(process.cwd(), 'Sources', 'swift-reflection', 'SimpleObject.swift'), { encoding: 'utf8' });
let lines = contents.split('\n');
while (lines.length > 0) {
    const handlingClass = currentDataStructure.started && !currentDataStructure.completed;
    switch (handlingClass) {
        case true:
            const handlingMethod = currentMethod.started && !currentMethod.completed;
            switch (handlingMethod) {
                case false:
                    try {
                        const { remainingLines, property, error } = DataStructureMethod_1.RawMethod.parse(lines);
                        if (error !== undefined)
                            throw error;
                        if (property === undefined)
                            throw new Error('something wrong happened here');
                        currentMethod = property;
                        currentMethod.completed = true;
                        lines = remainingLines;
                        continue;
                    }
                    catch (error) {
                        console.log(error.message);
                    }
                    break;
                case true:
                    break;
            }
            break;
        case false:
            const { remainingLines, property, error } = DataStructure_1.RawDataStructure.parse(lines);
            if (error !== undefined)
                throw error;
            if (property === undefined)
                throw new Error('something wrong happened here');
            currentDataStructure = property;
            currentDataStructure.completed = true;
            lines = remainingLines;
            classes.push(currentDataStructure);
            continue;
            break;
    }
}
console.log(classes);
