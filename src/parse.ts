import * as fs from 'fs'
import * as path from 'path'
import  { DataStructure } from './DataStructure/DataStructure'
import { RawDataStructure } from "./DataStructure/RawDataStructure";
import { DataStructureMethod, RawMethod } from './DataStructureMethod'

let  currentDataStructure: DataStructure = RawDataStructure.create()
let currentMethod: DataStructureMethod = RawMethod.create()

let classes: DataStructure[] = []

const contents = fs.readFileSync(path.join(process.cwd() , 'Sources' , 'swift-reflection' , 'SimpleObject.swift') , { encoding: 'utf8' } )
let lines = contents.split('\n')

while(lines.length > 0) {

    const handlingClass = currentDataStructure.started && !currentDataStructure.completed

    switch(handlingClass) {
        case true:
            const handlingMethod = currentMethod.started && !currentMethod.completed
          
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
            currentDataStructure= property
            currentDataStructure.completed = true
            lines = remainingLines
            classes.push(currentDataStructure)
            continue
        break;

    }

}


console.log(classes)


