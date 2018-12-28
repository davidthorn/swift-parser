import { DataStructureTypeName} from '../DataStructure/DataStructureTypeName';
import { DataStructureType, structureTypeName } from '../DataStructure/DataStructureType';
import { DataStructure } from '../DataStructure/DataStructure';
import { DataStructureParsingResult } from './DataStructureParsingResult';
import { RawAccessLevel, AccessLevelType, accessLevel } from '../AccessLevel';
import { DataPropertyParser } from '../DataPropertyParser/DataPropertyParser';
import { DataParser } from '../DataParser';
import { DataMethodParser } from '../DataMethodParser/DataMethodParser';

export type DataStructureInfo  = {
    name: string
    access_level: AccessLevelType
    type: DataStructureTypeName
}

export const getStructureType = (structure: string | undefined | null): DataStructureTypeName => {
    return structureTypeName(structure || '')
}

export class DataStructureParser extends DataParser {

    regexp: RegExp = /\s*(public|private|internal)?\s*(class|struct|protocol|enum)\s+([\w\d]+)(\s*{[\w\W\s\d.]*)/
    completed: boolean = false
    started: boolean = false
    inner: string = ""
    structure?: DataStructureType

    public constructor() { 
        super()
    }

    public parse(lines: string[]): DataStructureParsingResult {
        const line = lines.length > 0 ? lines[0] : undefined
        if (line === undefined || line === null)
            return { remainingLines: lines, error: new Error('the line cannot be null') }
        const search = line.match(this.regexp)
        
        if (search === null || search === undefined)
            throw new Error('no match found for a line')
        
        const name = search[3]
        const AccessLevel = RawAccessLevel.parse(search[1])
        const type = getStructureType(search[2])
        
        this.structure = new DataStructure(name , type , AccessLevel)

        this.started = true;
        
        const { remainingLines , inner } = this.getMethodBody(lines.splice(1, lines.length))
        
        this.inner = inner;
        
        const propertyParser = new DataPropertyParser()
        const { properties , unusedLines } = propertyParser.parse(remainingLines);
        this.structure.properties = this.structure.properties.concat(properties);
        
        const methodParser = new DataMethodParser()
        let methods = methodParser.parse(unusedLines)
        this.structure.methods = this.structure.methods.concat(methods)

        return {
            property: this.structure,
            remainingLines: remainingLines
        };
    }

    /**
     * This method will reduce the lines provided into a string and then search from the beginning for a data structure
     * if none is directly found then the method will return the remaining lines to be the original string
     * 
     * All information about the data structure will be present within the info property
     * All data which has been found within the data strucuture open and closing {} will be saved in the inner property.
     * All data which is found afer the closing bracket of the data structure will then be saved to remainingLines string
      *
     * @param {string[]} lines
     * @returns {{ remainingLines?: string , inner?: string , info?: { access_level: AccessLevelType , type: DataStructureTypeName , name: string } }}
     * @memberof DataStructureParser
     */
    extractStructInfo(lines: string[]): { remainingLines?: string , inner?: string , info?: { access_level: AccessLevelType , type: DataStructureTypeName , name: string } } {
        
        /// place lines into a single line so that we can retrieve the class body without having to iterate through lines
        const stringLines = lines.join('\n').trim()
        
        /// if the line length is still 0 then basically just exit
        if(stringLines.length === 0) {
            return  {
                remainingLines: lines.join('\n'),
                inner: undefined,
                info: undefined
            }
        }
            
        const search = stringLines.match(this.regexp)
        
        /// we could not find a match, we will now exist gracefull returning what we were given back for
        /// others to test
        if (search === null || search === undefined) {
            return {
                remainingLines: lines.join('\n'),
                inner: undefined,
                info: undefined
            }
        }
        
        
        const { remainingLines , inner } = this.getMethodBody([search[4]])
        
        return {
            remainingLines: remainingLines.join('\n'),
            inner: inner,
            info: this.createStructureInfo(search[3], search[1] , search[2])
        } 

    }

    /**
     * Creates a StructureInfo using the strings provided
     * AccessLevel will always default to internal
     * DataStructureTypeName will always defaul to class
     *
     * @param {string} name
     * @param {string} [access_level]
     * @param {string} [type]
     * @returns {DataStructureInfo}
     * @memberof DataStructureParser
     */
    createStructureInfo(name: string , access_level?: string , type?: string): DataStructureInfo {
        return {
            access_level: accessLevel(access_level),
            type: structureTypeName(type),
            name: name
        }
    }

}
