"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataStructureProperty_1 = require("./DataStructureProperty");
const AccessControl_1 = require("../AccessControl");
const Variable_1 = require("../Variable");
class RawProperty {
    /**
     * Checks if the property Identifier provided is valid and if not throws an error
     *
     * @static
     * @param {(string | undefined | null)} propertyIdentifier
     * @returns {string}
     * @memberof RawProperty
     */
    static isPropertyField(propertyIdentifier) {
        if (propertyIdentifier === undefined || propertyIdentifier === null)
            throw new Error('The property cannot be null or undefined');
        return propertyIdentifier;
    }
    /**
     * Factory function to create a DataStructureProperty
     *
     * @static
     * @returns {DataStructureProperty}
     * @memberof RawProperty
     */
    static create() {
        return new DataStructureProperty_1.DataStructureProperty();
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
    static parse(lines) {
        let properties = [];
        let tmpLines = lines;
        while (tmpLines.length > 0) {
            try {
                let result = this.parseProperty(tmpLines);
                const { remainingLines, property, error } = result;
                tmpLines = remainingLines;
                if (error !== undefined)
                    throw error;
                if (property === undefined)
                    throw new Error('jump to next line');
                properties.push(property);
            }
            catch (_a) {
                tmpLines.shift(); /// could not parse that line
            }
        }
        return properties;
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
    static parseProperty(lines) {
        const line = lines[0];
        if (line === undefined || line === null)
            return { error: new Error('line must not be null or undefined'), remainingLines: lines, property: undefined };
        const searchProperty = line.trim().match(DataStructureProperty_1.DataStructureProperty.regexp);
        if (searchProperty === undefined || searchProperty === null)
            return { error: new Error('no property found in line data'), remainingLines: lines, property: undefined };
        const localProperty = RawProperty.create();
        localProperty.accessControl = AccessControl_1.RawAccessControl.parse(searchProperty[1]);
        localProperty.arc = searchProperty[2];
        localProperty.variableType = Variable_1.RawVariable.parse(searchProperty[3]);
        localProperty.name = RawProperty.isPropertyField(searchProperty[4]);
        localProperty.type = RawProperty.isPropertyField(searchProperty[5]);
        localProperty.value = RawProperty.isPropertyField(searchProperty[6]);
        localProperty.started = true;
        localProperty.completed = false;
        return {
            property: localProperty,
            error: undefined,
            remainingLines: lines.splice(1, lines.length)
        };
    }
}
exports.RawProperty = RawProperty;
