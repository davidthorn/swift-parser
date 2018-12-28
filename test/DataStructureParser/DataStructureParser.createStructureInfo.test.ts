/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { expect } from 'chai' 
import { DataStructureParser } from '../../src/DataStructureParser/DataStructureParser';
import { AccessLevelType, InternalAccessLevel, PrivateAccessLevel, FilePrivateAccessLevel, OpenAccessLevel, PublicAccessLevel } from '../../src/AccessLevel';
import { DataStructureTypeName } from '../../src/DataStructure/DataStructureTypeName';
import { ClassDataStructureTypeName } from '../../src/DataStructure/implementations/ClassDataStructureTypeName';
import { DataMethod } from '../../src/DataMethod/DataMethod';
import { StructDataStructureTypeName } from '../../src/DataStructure/implementations/StructDataStructureTypeName';
import { ProtocolDataStructureTypeName } from '../../src/DataStructure/implementations/ProtocolDataStructure';
import { EnumDataStructureTypeName } from '../../src/DataStructure/implementations/EnumDataStructureTypeName';

@suite('DataStructureParser - createStructureInfo')
export class DataStructureParserUnitTest extends DataStructureParser {


    getMockData(options?: { access_level?: AccessLevelType, type: DataStructureTypeName,  name?: string}): string[] {

        const opts = options || {
            access_level: new InternalAccessLevel(),
            type: new ClassDataStructureTypeName(),
            name: "SimpleObject"
        }

        const access_level = opts.access_level || new InternalAccessLevel()
        const type = opts.type || new ClassDataStructureTypeName()
        const name = opts.name || "SimpleObject"

        let lines: string[] = []

        let data = `
            ${access_level}${type}${name}{

                internal var home: String = "david"

                public init() {

                }

            }
        `
  
        return lines
    }

    @test "create a basic data structure info using public class SimpleObject" () {
        let info = this.createStructureInfo('SimpleObject' , 'public')
        expect(info.name).to.equal('SimpleObject')
        expect(info.type).to.instanceOf(ClassDataStructureTypeName)
        expect(info.access_level).to.instanceOf(PublicAccessLevel)
    }

    @test "create a basic data structure info using private class SimpleObject" () {
        let info = this.createStructureInfo('SimpleObject' , 'private')
        expect(info.name).to.equal('SimpleObject')
        expect(info.type).to.instanceOf(ClassDataStructureTypeName)
        expect(info.access_level).to.instanceOf(PrivateAccessLevel)
    }

    @test "create a basic data structure info using fileprivate class SimpleObject" () {
        let info = this.createStructureInfo('SimpleObject' , 'fileprivate')
        expect(info.name).to.equal('SimpleObject')
        expect(info.type).to.instanceOf(ClassDataStructureTypeName)
        expect(info.access_level).to.instanceOf(FilePrivateAccessLevel)
    }

    @test "create a basic data structure info using open class SimpleObject" () {
        let info = this.createStructureInfo('SimpleObject' , 'open')
        expect(info.name).to.equal('SimpleObject')
        expect(info.type).to.instanceOf(ClassDataStructureTypeName)
        expect(info.access_level).to.instanceOf(OpenAccessLevel)
    }

    @test "create a basic data structure info using class SimpleObject" () {
        let info = this.createStructureInfo('SimpleObject')
        expect(info.name).to.equal('SimpleObject')
        expect(info.type).to.instanceOf(ClassDataStructureTypeName)
        expect(info.access_level).to.instanceOf(InternalAccessLevel)
    }

    @test "create a basic data structure info using undefined undefined SimpleObject" () {
        let info = this.createStructureInfo('SimpleObject', undefined , undefined)
        expect(info.name).to.equal('SimpleObject')
        expect(info.type).to.instanceOf(ClassDataStructureTypeName)
        expect(info.access_level).to.instanceOf(InternalAccessLevel)
    }

    @test "create a basic data structure info using undefined struct SimpleObject" () {
        let info = this.createStructureInfo('SimpleObject', undefined , 'struct')
        expect(info.name).to.equal('SimpleObject')
        expect(info.type).to.instanceOf(StructDataStructureTypeName)
        expect(info.access_level).to.instanceOf(InternalAccessLevel)
    }

    @test "create a basic data structure info using undefined protocol SimpleObject" () {
        let info = this.createStructureInfo('SimpleObject', undefined , 'protocol')
        expect(info.name).to.equal('SimpleObject')
        expect(info.type).to.instanceOf(ProtocolDataStructureTypeName)
        expect(info.access_level).to.instanceOf(InternalAccessLevel)
    }

    @test "create a basic data structure info using undefined enum SimpleObject" () {
        let info = this.createStructureInfo('SimpleObject', undefined , 'enum')
        expect(info.name).to.equal('SimpleObject')
        expect(info.type).to.instanceOf(EnumDataStructureTypeName)
        expect(info.access_level).to.instanceOf(InternalAccessLevel)
    }

    @test "should match public class SimpleObject"()  {
        // let lines = this.getMockData()
        // let parser = this.parse(lines)
        // console.log(parser)
    }



}