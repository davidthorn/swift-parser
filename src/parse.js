"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const SwiftParser_1 = require("./SwiftParser");
let currentProperty = Object.create(SwiftParser_1.property);
const contents = fs.readFileSync(path.join(process.cwd(), 'Sources', 'swift-reflection', 'MyObject.swift'), { encoding: 'utf8' });
const lines = contents.split('\n');
for (let line of lines) {
    const handlingClass = SwiftParser_1.currentDataStructure.started;
    switch (handlingClass) {
        case true:
            const handlingProperty = SwiftParser_1.property.started;
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
                    // //const searchProperty = line.trim().match(/(public|internal|private|fileprivate)?\s*(var|let)\s+([\w\d]+)\s+:\s*([\w\d]+)\s+=\s+("?[\w\d]+"?;?)/)
                    // const searchProperty = line.trim().match(/(public|internal|private|fileprivate)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+\s*)=\s*\"?([\w\d]+)"?;?{?/) 
                    // if(searchProperty === undefined || searchProperty === null) continue
                    // property.accessControl = getAccessControl(searchProperty[1])
                    // property.readonly = isReadOnly(searchProperty[2])
                    // /// we have handled all the way to the end of the line but not t
                    // /// should handle parsing property
                    // property.started = true
                    // console.log(property)
                    //console.log("found a closing bracket")
                    //console.log(searchEndOfDataStructure)
                    /// should handle parsing method
                    break;
            }
            break;
        case false:
            const search = line.match(/(public|private|internal)?\s*(class|struct|protocol|enum)\s+([\w\d]+)\s+{$/);
            if (search === null || search === undefined)
                continue;
            SwiftParser_1.currentDataStructure.started = true;
            SwiftParser_1.currentDataStructure.type = SwiftParser_1.getStructureName(search[2]);
            SwiftParser_1.currentDataStructure.accessControl = SwiftParser_1.getAccessControl(search[1]);
            SwiftParser_1.currentDataStructure.name = search[3];
            break;
    }
}
