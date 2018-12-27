import * as fs from 'fs'
import * as path from 'path'
import { DataStructureParser } from './DataStructureParser/DataStructureParser';
import { DataStructureType } from './DataStructure/DataStructureType';


let classes: DataStructureType[] = []

const contents = fs.readFileSync(path.join(process.cwd() , 'Sources' , 'swift-reflection' , 'SimpleObject.swift') , { encoding: 'utf8' } )
let lines = contents.split('\n')

let structureParser = new DataStructureParser()

while(lines.length > 0) {
    
    const { remainingLines , property, error }  = structureParser.parse(lines)
    if(error !== undefined) throw error
    if(property === undefined) throw new Error('something wrong happened here')
    lines = remainingLines 
    classes.push(property)
    
}

let d = ''
classes.forEach(cl => {

d += `
    ${cl.accessControl.name} ${cl.type.name} ${cl.name} {
`
cl.properties.forEach(p => {
d += `        
        ${p.accessControl.name} ${p.arc} ${p.variableType.name} ${p.name}: ${p.type} = "${p.value}"
` 
})
d += `
    }
` 
})

console.log(d)



