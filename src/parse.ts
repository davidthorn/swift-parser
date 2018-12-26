import * as fs from 'fs'
import * as path from 'path'
import  { DataStructure, RawDataStructure } from './DataStructure'
import { DataStructureProperty, RawProperty} from './DataStructureProperty'
import { DataStructureMethod, RawMethod } from './DataStructureMethod'

let currentProperty: DataStructureProperty = RawProperty.create()
let  currentDataStructure: DataStructure = RawDataStructure.create()
let currentMethod: DataStructureMethod = RawMethod.create()

let classes: DataStructure[] = []

const contents = fs.readFileSync(path.join(process.cwd() , 'Sources' , 'swift-reflection' , 'SimpleObject.swift') , { encoding: 'utf8' } )
let lines = contents.split('\n')

while(lines.length > 0) {

    const handlingClass = currentDataStructure.started

    switch(handlingClass) {
        case true:
            const handlingMethod = currentMethod.started && !currentMethod.completed
            // let handlingProperty = currentProperty.started && !currentProperty.completed
            
 
            // switch(handlingProperty) {
            //     default: break
            //     case false:
                
            //         try {
            //             const { remainingLines , property, error } = RawProperty.parse(lines)
            //             if(error !== undefined) throw error
            //             if(property === undefined) throw new Error('something wrong happened here')
            //             currentProperty = property
            //             currentProperty.completed = true
            //             handlingProperty = currentProperty.started && currentProperty.completed
            //             lines = remainingLines
            //             currentDataStructure.properties.push(currentProperty)
            //             currentProperty = RawProperty.create()
            //             continue
            //         } catch(error){
            //             //console.log('did not find a property')
            //         }
          
            //     break;
            // }

            // if(handlingProperty) break

            switch(handlingMethod) {
                case false:
                try {
                    const { remainingLines , property, error }  = RawMethod.parse(lines)
                    if(error !== undefined) throw error
                    if(property === undefined) throw new Error('something wrong happened here')
                    currentMethod = property
                    currentMethod.completed = true
                    lines = remainingLines
                    continue
                } catch(error) {
                    console.log(error.message)
                }
                
                
                break;
                case true:
               
                break;
            }

        break;
        case false:

            const { remainingLines , property, error }  = RawDataStructure.parse(lines)
            if(error !== undefined) throw error
            if(property === undefined) throw new Error('something wrong happened here')
            currentDataStructure = property
            lines = remainingLines
            classes.push(currentDataStructure)
            continue
        break;

    }

}


console.log(currentDataStructure)
console.log(currentProperty)

