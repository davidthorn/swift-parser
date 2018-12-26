"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const DataStructure_1 = require("./DataStructure");
const DataStructureProperty_1 = require("./DataStructureProperty");
const SwiftParser_1 = require("./SwiftParser");
let currentProperty = DataStructureProperty_1.RawProperty.create();
let currentDataStructure = DataStructure_1.RawDataStructure.create();
const contents = fs.readFileSync(path.join(process.cwd(), 'Sources', 'swift-reflection', 'MyObject.swift'), { encoding: 'utf8' });
const lines = contents.split('\n');
for (let line of lines) {
    const handlingClass = currentDataStructure.started;
    switch (handlingClass) {
        case true:
            const handlingProperty = currentProperty.started;
            switch (handlingProperty) {
                case true:
                    const searchEndOfDataStructure = line.match(/\s*}\s*/);
                    break;
                case false:
                    try {
                        currentProperty = SwiftParser_1.parsePropertyFromLine(line.trim());
                        console.log(currentProperty);
                    }
                    catch (error) {
                        //console.log(error.message)
                    }
                    break;
            }
            break;
        case false:
            currentDataStructure = DataStructure_1.RawDataStructure.parse(line);
            // const search = line.match(/(public|private|internal)?\s*(class|struct|protocol|enum)\s+([\w\d]+)\s+{$/)
            // if(search === null || search === undefined) continue 
            // currentDataStructure.started = true
            // currentDataStructure.type = getStructureType(search[2])
            // currentDataStructure.accessControl = getAccessControl(search[1])
            // currentDataStructure.name = search[3]
            break;
    }
}
console.log(currentDataStructure);
console.log(currentProperty);
