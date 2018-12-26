import * as fs from 'fs'
import * as path from 'path'
import  { DataStructure, RawDataStructure } from './DataStructure'
import { DataStructureProperty, RawProperty} from './DataStructureProperty'
import { DataStructureMethod, RawMethod } from './DataStructureMethod'

import {    

        } from './SwiftParser'


let currentProperty: DataStructureProperty = RawProperty.create()
let  currentDataStructure: DataStructure = RawDataStructure.create()
let currentMethod: DataStructureMethod = RawMethod.create()


const contents = fs.readFileSync(path.join(process.cwd() , 'Sources' , 'swift-reflection' , 'MyObject.swift') , { encoding: 'utf8' } )
const lines = contents.split('\n')

for(let line of lines) {

    const handlingClass = currentDataStructure.started

    switch(handlingClass) {
        case true:

            let handlingProperty = currentProperty.started && !currentProperty.completed
            const handlingMethod = currentMethod.started && !currentMethod.completed
 
            switch(handlingProperty) {
                default: break
                case false:
                
                    try {
                        currentProperty = RawProperty.parse(line.trim())
                        currentProperty.completed = true
                        handlingProperty = currentProperty.started && currentProperty.completed
                    } catch(error){
                        //console.log('did not find a property')
                    }
          
                break;
            }

            if(handlingProperty) break

            switch(handlingMethod) {
                case false:
                try {
                    currentMethod = RawMethod.parse(line)
                    currentMethod.completed = true
                    console.log(currentMethod)
                } catch(error) {
                    console.log(error.message)
                }
                
                
                break;
                case true:
               
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


//console.log(currentDataStructure)
//console.log(currentProperty)

