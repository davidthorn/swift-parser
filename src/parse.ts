import * as fs from 'fs'
import * as path from 'path'
import { getAccessControl } from './AccessControl'
import  { DataStructure, RawDataStructure } from './DataStructure'
import { DataStructureProperty, RawProperty} from './DataStructureProperty'

import {    parsePropertyFromLine

        } from './SwiftParser'


let currentProperty: DataStructureProperty = RawProperty.create()
let  currentDataStructure: DataStructure = RawDataStructure.create()

const contents = fs.readFileSync(path.join(process.cwd() , 'Sources' , 'swift-reflection' , 'MyObject.swift') , { encoding: 'utf8' } )
const lines = contents.split('\n')

for(let line of lines) {

    const handlingClass = currentDataStructure.started

    switch(handlingClass) {
        case true:

            const handlingProperty = currentProperty.started

            switch(handlingProperty) {
                case true:
                const searchEndOfDataStructure = line.match(/\s*}\s*/)
                
                break;
                case false:
                
                try {
                    currentProperty = parsePropertyFromLine(line.trim())
                    
                    console.log(currentProperty)
                } catch(error){
                    //console.log(error.message)
                }
          
                break;
            }

        break;
        case false:

            currentDataStructure = RawDataStructure.parse(line)
            // const search = line.match(/(public|private|internal)?\s*(class|struct|protocol|enum)\s+([\w\d]+)\s+{$/)
            // if(search === null || search === undefined) continue 
            // currentDataStructure.started = true
            // currentDataStructure.type = getStructureType(search[2])
            // currentDataStructure.accessControl = getAccessControl(search[1])
            // currentDataStructure.name = search[3]
        
        break;

    }

}


console.log(currentDataStructure)
console.log(currentProperty)

