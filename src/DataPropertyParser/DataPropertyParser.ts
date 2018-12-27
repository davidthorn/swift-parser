
import { RawAccessLevel } from '../AccessLevel';
import { RawVariable } from '../Variable';
import { DataPropertyParsingResult } from './DataPropertyParsingResult';
import { DataPropertyType } from '../DataProperty/DataPropertyType';
import { DataProperty } from '../DataProperty/DataProperty';

export class DataPropertyParser {

    regexp: RegExp = /(public|internal|private|fileprivate)?\s*(weak|unowned)?\s*(var|let){1}\s+([\w\d]+)\s*:\s+([\w\d]+)\s*=\s*\"?([\w\d]+)"?;?{?/
    completed: boolean = false
    started:  boolean = false
    
    /**
     * Checks if the property Identifier provided is valid and if not throws an error
     *
     * @static
     * @param {(string | undefined | null)} propertyIdentifier
     * @returns {string}
     * @memberof RawProperty
     */
    isPropertyField(propertyIdentifier: string | undefined | null ): string {
        if(propertyIdentifier === undefined || propertyIdentifier === null) throw new Error('The property cannot be null or undefined')
        return propertyIdentifier
    }


    /**
     * Attempts to parse as many data structure property objects which it can 
     * from the lines provided
     *
     * @static
     * @param {string[]} lines
     * @returns {DataStructureProperty[]}
     * @memberof RawProperty
     */
    public parse(lines: string[]): DataPropertyType[] {
        
        let properties: DataPropertyType[] = []

        let tmpLines = lines

        while(tmpLines.length > 0) {
            try {
                let result = this.parseProperty(tmpLines)
                const { remainingLines , property , error } = result
                tmpLines = remainingLines
                if(error !== undefined) throw error
                if(property === undefined) throw new Error('jump to next line')
                properties.push(property)
            } catch {
                tmpLines.shift() /// could not parse that line
            }
        }

        return properties
    }
    
    /**
     * Attempts to parse a ata structure property object if it can 
     * from the lines provided
     * The lines are removed from the array everytime this method can successful use it
     *
     * @static
     * @param {string[]} lines
     * @returns {DataStructurePropertyParsingResult}
     * @memberof RawProperty
     */
    public parseProperty(lines: string[]): DataPropertyParsingResult {
        const line = lines[0]
        if(line === undefined || line === null ) return { error: new Error('line must not be null or undefined') , remainingLines: lines , property : undefined }
        const searchProperty = line.trim().match(this.regexp) 
        if(searchProperty === undefined || searchProperty === null) return { error: new Error('no property found in line data') , remainingLines: lines , property : undefined }
        
        const AccessLevel = RawAccessLevel.parse(searchProperty[1])
        const value = this.isPropertyField(searchProperty[6])
        const name = this.isPropertyField(searchProperty[4])
        const type = this.isPropertyField(searchProperty[5])
        const varType = RawVariable.parse(searchProperty[3])
        const arc = searchProperty[2]
        
        let property = new DataProperty(varType , name , type , value , AccessLevel, arc)
        
        this.started = true
        this.completed = false
        
        return {
            property: property,
            error: undefined,
            remainingLines: lines.splice(1 , lines.length)
        }
    }

}
