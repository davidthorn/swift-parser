/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { DataMethodParser } from "../../src/DataMethodParser/DataMethodParser";
import { expect } from 'chai'

@suite('Data Method Parser')
class DataMethodParserUnitTest extends DataMethodParser {


    @test "that this throwIfMatchNotFound Throws an error with invalid data" () {

        const data = `
            public func testFun() {
                print("this is happening here")
            }

            open func testOpenFun() {
                print("this is happening here")
            }
        `

        const lines = this.trimLines(data)
        expect(lines[0].trim()).to.equal('public func testFun() {')
        expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.not.throw()
        expect( () => { this.throwIfMatchNotFound(lines[1]) } ).to.throw()
        expect( () => { this.throwIfMatchNotFound(lines[2]) } ).to.throw()
        expect( () => { this.throwIfMatchNotFound(lines[3]) } ).to.not.throw()
        expect( () => { this.throwIfMatchNotFound(lines[4]) } ).to.throw()
        expect( () => { this.throwIfMatchNotFound(lines[5]) } ).to.throw()
    }

    @test "that a method with arguments can be parsed and not throw" () {

        const data = `
        public func testFun(_ name: String , _ surname: String? = nil ) {
            print("this is happening here")
        }
        `
        const lines = this.trimLines(data)
        expect(lines[0].trim()).to.equal('public func testFun(_ name: String , _ surname: String? = nil ) {')
        expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.not.throw()
        expect( () => { this.throwIfMatchNotFound(lines[1]) } ).to.throw()
        expect( () => { this.throwIfMatchNotFound(lines[2]) } ).to.throw()
    }

    @test "that a method can have the @IBOutlet preceeding the access level" () {
        
        const data = `
        @IBAction public func testFun(_ name: String , _ surname: String? = nil ) {
            print("this is happening here")
        }
        `
        const lines = this.trimLines(data)
        expect(lines[0].trim()).to.equal('@IBAction public func testFun(_ name: String , _ surname: String? = nil ) {')
        expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.not.throw()
        expect( () => { this.throwIfMatchNotFound(lines[1]) } ).to.throw()
        expect( () => { this.throwIfMatchNotFound(lines[2]) } ).to.throw()
    }

    @test "that a methods access level" () {
        
        const data = (access_level: string) => {
            return `@IBAction ${access_level} func testFun(_ name: String , _ surname: String? = nil ) {
                print("this is happening here")
            }
            `
        }
        
        let lines = this.trimLines(data('internal'))
        expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.not.throw()

        lines = this.trimLines(data('public'))
        expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.not.throw()

        lines = this.trimLines(data('open'))
        expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.not.throw()

        lines = this.trimLines(data('private'))
        expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.not.throw()

        lines = this.trimLines(data('fileprivate'))
        expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.not.throw()

        // lines = this.trimLines(data('unknown'))
        // expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.throw()

    }

    @test "retrieving all func declaration data" () {

        const reg = /(@IB[\w]+|)(?=\s*(public|private|internal|open|fileprivate|)(?=\s*(func(?=\s+([\w]+(?=\s*([\w\s\W\d]*)))))))/
        const data = (access_level: string) => {
            return `@IBAction ${access_level} func testFun(_ name: String , _ surname: String? = nil ) {
                print("this is happening here")
            } 
            `
        }

        let lines = this.trimLines(data('internal'))
        const result: RegExpMatchArray | null = lines[0].match(reg)
        expect(reg).to.not.null
        if(result === null) throw new Error()
       
        console.log(result)
        expect(result[1]).to.equal('@IBAction')
        expect(result[2]).to.equal('internal')
        expect(result[3]).to.equal('func')
        expect(result[4]).to.equal('testFun')
        expect(result[5]).to.equal('(_ name: String , _ surname: String? = nil ) {')
        expect(this.regexp.source).to.equal(reg.source)


    }

}