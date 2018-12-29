/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { expect } from 'chai'

import { DataParameterParser } from "../../src/DataParameterParser/DataParameterParser";
import { DataParameterType } from "../../src/DataParameter/DataParameterType";
import { DataParameter } from "../../src/DataParameter/DataParameter";

@suite('DataParameterParser - getParameterParts')
export class DataParameterParserUnitTest extends DataParameterParser {

    @test "returns data for ( _ name: String ) = varName: _ , name: name , type: String, isOptional: false" () {
        const testString = '_ name: String'
        const data = this.getParameterParts(testString)
        expect(data.defaultValue, "default value should be undefined").to.be.undefined
        expect(data.varName).to.be.equal('_')
        expect(data.name).to.be.equal('name')
        expect(data.type).to.be.equal('String')
        expect(data.isOptional).to.be.equal(false)
    }

    @test "returns data for ( _ name: inout String ) = varName: _ , name: name , type: String, isOptional: false" () {
        const testString = '_ name: inout String'
        const data = this.getParameterParts(testString)
        expect(data.defaultValue, "default value should be undefined").to.be.undefined
        expect(data.varName).to.be.equal('_')
        expect(data.name).to.be.equal('name')
        expect(data.type).to.be.equal('String')
        expect(data.isOptional).to.be.equal(false)
    }

    @test "returns data for ( person name: inout String? = nil ) = varName: person , name: name , type: String?, isOptional: true" () {
        const testString = 'person name: inout String?'
        const data = this.getParameterParts(testString)
        expect(data.defaultValue).to.be.undefined
        expect(data.varName).to.be.equal('person')
        expect(data.name).to.be.equal('name')
        expect(data.type).to.be.equal('String?')
        expect(data.isOptional).to.be.equal(true)
    }

    @test "returns data for ( name: String = nil ) = varName: undefined , name: name , type: String, isOptional: false" () {
        const testString = 'name: String = nil'
        const data = this.getParameterParts(testString)
        expect(data.defaultValue).to.be.equal('nil')
        expect(data.varName).to.be.undefined
        expect(data.name).to.be.equal('name')
        expect(data.type).to.be.equal('String')
        expect(data.isOptional).to.be.equal(false)
    }

    @test "returns data for ( completion: ((_ data:  Data? , _ response: HttpResponse , _ error: Error? ) -> Void)? = nil ) = varName: undefined , name: completion , type: ((_ data:  Data? , _ response: HttpResponse , _ error: Error? ) -> Void)?, isOptional: true" () {
        const testString = 'completion: ((_ data:  Data? , _ response: HttpResponse , _ error: Error? ) -> Void)? = nil'
        const data = this.getParameterParts(testString)
        expect(data.defaultValue).to.be.equal('nil')
        expect(data.varName).to.be.undefined
        expect(data.name).to.be.equal('completion')
        expect(data.type).to.be.equal('((_ data:  Data? , _ response: HttpResponse , _ error: Error? ) -> Void)?')
        expect(data.isOptional).to.be.equal(true)
    }

    
}
