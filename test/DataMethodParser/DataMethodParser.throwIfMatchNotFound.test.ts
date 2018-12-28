/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { DataMethodParser } from "../../src/DataMethodParser/DataMethodParser";
import { expect } from 'chai'

@suite('Data Method Parser - throwIfMatchNotFound')
class DataMethodParserUnitTest extends DataMethodParser {

    mockData(options?: { outlet?: string ,  access_level?: string , params?: string[], methodName?: string , returnValue?: string }): string[] {
        const opts = options === undefined ? {} : options 
        const outlet = opts.outlet === undefined ? '' : `${opts.outlet} `
        const returnValue = opts.returnValue === undefined ? '' : ` -> ${opts.returnValue} `
        const access_level = opts.access_level === undefined ? '' : `${opts.access_level} `
        const methodName = opts.methodName === undefined ? 'testFun' : `${opts.methodName}`
        const params = opts.params === undefined ? [] : opts.params
        const data = `${outlet}${access_level}func ${methodName}(${params.join(',')})${returnValue}{
            print("this is happening here")
        } 
        `
        return this.trimLines(data)
    }

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

    }


}