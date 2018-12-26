"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const DataStructure_1 = require("./DataStructure");
const DataStructureProperty_1 = require("./DataStructureProperty");
const DataStructureMethod_1 = require("./DataStructureMethod");
let currentProperty = DataStructureProperty_1.RawProperty.create();
let currentDataStructure = DataStructure_1.RawDataStructure.create();
let currentMethod = DataStructureMethod_1.RawMethod.create();
const contents = fs.readFileSync(path.join(process.cwd(), 'Sources', 'swift-reflection', 'MyObject.swift'), { encoding: 'utf8' });
const lines = contents.split('\n');
for (let line of lines) {
    const handlingClass = currentDataStructure.started;
    switch (handlingClass) {
        case true:
            let handlingProperty = currentProperty.started && !currentProperty.completed;
            const handlingMethod = currentMethod.started && !currentMethod.completed;
            switch (handlingProperty) {
                default: break;
                case false:
                    try {
                        currentProperty = DataStructureProperty_1.RawProperty.parse(line.trim());
                        currentProperty.completed = true;
                        handlingProperty = currentProperty.started && currentProperty.completed;
                    }
                    catch (error) {
                        //console.log('did not find a property')
                    }
                    break;
            }
            if (handlingProperty)
                break;
            switch (handlingMethod) {
                case false:
                    try {
                        currentMethod = DataStructureMethod_1.RawMethod.parse(line);
                        currentMethod.completed = true;
                        console.log(currentMethod);
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
//console.log(currentDataStructure)
//console.log(currentProperty)
