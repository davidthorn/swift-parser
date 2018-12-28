/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { expect } from 'chai' 
import { DataStructureParser } from '../../src/DataStructureParser/DataStructureParser';
import { accessLevel } from '../../src/AccessLevel';
import { structureTypeName } from '../../src/DataStructure/DataStructureType';

@suite('DataStructureParser - extractStructInfo')
export class DataStructureParserUnitTest extends DataStructureParser {


    getMockData(options?: { access_level?: string, type?: string,  name?: string}): string[] {

        const opts = options || {
            access_level: 'internal',
            type: 'class',
            name: "SimpleObject"
        }

        const access_level = accessLevel(opts.access_level)
        const type = structureTypeName(opts.type)
        const name = opts.name

        let lines: string[] = []

        let data = `
            ${access_level.name} ${type.name} ${name}{

                internal var home: String = "david"

                public init() {

                }

            }

            public class OtherObject {

                internal var surname: String? = nil

                public func sayHello(_ message: String) -> Void {
                    print("hello \(message)")
                }

            }
        `

        return data.split('\n')
    }

    @test "can extract internal class SimpleObject from lines" () {
        const lines = this.getMockData({ access_level: 'internal' , name: 'SimpleObject' })
        const structure = this.extractStructInfo(lines)
        expect(structure.info).to.not.be.undefined
        if(structure.info === undefined) throw new Error('it cannot be undefined')
        const { access_level , type , name  } = structure.info
        expect(access_level.name).to.equal('internal')
        expect(type.name).to.equal('class')
        expect(name).to.equal('SimpleObject')
    }

    @test "can extract internal struct SimpleObject from lines" () {
        const lines = this.getMockData({ access_level: 'internal' , name: 'SimpleObject' , type: 'struct' })
        const structure = this.extractStructInfo(lines)
        expect(structure.info).to.not.be.undefined
        if(structure.info === undefined) throw new Error('it cannot be undefined')
        const { access_level , type , name  } = structure.info
        expect(access_level.name).to.equal('internal')
        expect(type.name).to.equal('struct')
        expect(name).to.equal('SimpleObject')
    }

    @test "can extract struct SimpleObject from lines" () {
        const lines = this.getMockData({ name: 'SimpleObject' , type: 'struct' })
        const structure = this.extractStructInfo(lines)
        expect(structure.info).to.not.be.undefined
        if(structure.info === undefined) throw new Error('it cannot be undefined')
        const { access_level , type , name  } = structure.info
        expect(access_level.name).to.equal('internal')
        expect(type.name).to.equal('struct')
        expect(name).to.equal('SimpleObject')
    }

    @test "can extract multiple classes from file" () {
        const lines = this.getMockData({ name: 'SimpleObject' , type: 'struct' })
        const structure = this.extractStructInfo(lines)
       
        expect(structure.info).to.not.be.undefined
       
       
        if(structure.info === undefined) throw new Error('it cannot be undefined')
        const structInfo = structure.info
        expect(structure.remainingLines).to.not.be.undefined
        expect(structInfo.access_level.name).to.equal('internal')
        expect(structInfo.type.name).to.equal('struct')
        expect(structInfo.name).to.equal('SimpleObject')

        expect(structure.remainingLines).to.not.be.undefined
        if(structure.remainingLines === undefined) throw new Error('this should not be undefined')
        const structure1 = this.extractStructInfo(structure.remainingLines.split('\n'))
        expect(structure1.info).to.not.be.undefined
        if(structure1.info === undefined) throw new Error('it cannot be undefined')
        const { access_level , type , name  } = structure1.info
        expect(access_level.name).to.equal('public')
        expect(type.name).to.equal('class')
        expect(name).to.equal('OtherObject')
    }

    @test "can handle invalid  data" () {
        const lines = `

            import Foundation

            /// this will be used for later

        
        `
        const structure = this.extractStructInfo(lines.split('\n'))
        expect(structure.info).to.be.undefined
        if(structure.info !== undefined) throw new Error('it cannot be undefined')
        expect(structure.remainingLines).to.not.be.undefined
        expect(structure.remainingLines).to.equal(lines)
    }
}