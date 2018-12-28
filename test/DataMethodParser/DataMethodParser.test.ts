/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { DataMethodParser } from "../../src/DataMethodParser/DataMethodParser";
import { expect } from 'chai'

@suite('Data Method Parser')
class DataMethodParserUnitTest extends DataMethodParser {

    mockData(options?: { outlet?: string ,  access_level?: string , params?: string[], methodName?: string }): string[] {
        const opts = options === undefined ? {} : options 
        const outlet = opts.outlet === undefined ? '' : `${opts.outlet} `
        const access_level = opts.access_level === undefined ? '' : `${opts.access_level} `
        const methodName = opts.methodName === undefined ? 'testFun' : `${opts.methodName}`
        const params = opts.params === undefined ? [] : opts.params
        const data = `${outlet}${access_level}func ${methodName}(${params.join(',')}) -> String {
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

        // lines = this.trimLines(data('unknown'))
        // expect( () => {this.throwIfMatchNotFound(lines[0]) } ).to.throw()

    }

    @test "retrieving all func declaration data" () {

        const reg = this.regexp
        const data = (access_level: string) => {
            return `@IBAction ${access_level} func testFun(_ name: String , _ surname: String? = nil ) {
                print("this is happening here")
            } 
            `
        }

        let lines = this.trimLines(data('internal'))
        const result: RegExpMatchArray | null = lines[0].match(this.regexp)
        expect(result).to.not.null
        if(result === null) throw new Error()
        
        expect(result[1]).to.equal('@IBAction')
        expect(result[2]).to.equal('internal')
        expect(result[3]).to.equal('func')
        expect(result[4]).to.equal('testFun')
        expect(result[5]).to.equal('(_ name: String , _ surname: String? = nil ) {')
        expect(this.regexp.source).to.equal(reg.source)


    }

    @test "extract params ( _ name: String , _ surname: String? = nil )" () {

        let mockParams = ['_ name: String' , '_ surname: String? = nil']
        let lines = this.mockData({params: mockParams })
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        const params = this.extractParamsFromString(remainingString)
        expect(params.length).to.equal(2)
        expect(params[0]).to.equal('_ name: String')
        expect(params[1]).to.equal('_ surname: String? = nil')
    }

    @test "extract params ( _ name: String , _ surname: String? = nil , completion: (( _ name: String) -> Void)? = nil )" () {
 
        let mockParams = ['_ name: String' , '_ surname: String? = nil', 'completion: (( _ name: String) -> Void)? = nil']
        let lines = this.mockData({params: mockParams })
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        const params = this.extractParamsFromString(remainingString)
        expect(params.length).to.equal(3)
        expect(params[0]).to.equal('_ name: String')
        expect(params[1]).to.equal('_ surname: String? = nil')
        expect(params[2]).to.equal('completion: (( _ name: String) -> Void)? = nil')
    }

    @test 'paramsRegexp with func testFun(_ name: String , _ surname: String? = nil )' () {

        let options = { 
            params: ['_ name: String', '_ surname: String? = nil'] }
        let lines = this.mockData(options)
        
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        expect(data.methodName).to.equal('testFun')
        expect(data.params).to.not.be.undefined
        if(data.params === undefined) throw new Error()
        expect(data.params[0]).to.equal('_ name: String')
        expect(data.params[1]).to.equal('_ surname: String? = nil')
        expect(remainingString).to.equal(line.replace('func testFun' , ''))

    } 

    @test 'extractMethodInformationFromString returns the method data for func testFun()' () {
        let lines = this.mockData()
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        expect(data.outlet).to.be.undefined
        expect(data.access_level).to.be.undefined
        expect(data.methodName).to.equal('testFun')
        expect(remainingString).to.equal(line.replace('func testFun' , ''))
    }

    @test 'extractMethodInformationFromString returns the method data for func testFun(_ name: String)' () {
        let lines = this.mockData({ params: ['_ name: String'] })
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        expect(data.outlet).to.be.undefined
        expect(data.access_level).to.be.undefined
        expect(data.methodName).to.equal('testFun')
        expect(data.params).to.not.be.undefined
        if(data.params === undefined) throw new Error()
        expect(data.params[0]).to.equal('_ name: String')
        expect(remainingString).to.equal(line.replace('func testFun' , ''))
    }

    @test 'extractMethodInformationFromString returns the method data for func testFun(_ name: String , _ surname: String? = nil )' () {
        let lines = this.mockData({ params: ['_ name: String', '_ surname: String? = nil'] })
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        expect(data.outlet).to.be.undefined
        expect(data.access_level).to.be.undefined
        expect(data.methodName).to.equal('testFun')
        expect(data.params).to.not.be.undefined
        if(data.params === undefined) throw new Error()
        expect(data.params[0]).to.equal('_ name: String')
        expect(data.params[1]).to.equal('_ surname: String? = nil')
        expect(remainingString).to.equal(line.replace('func testFun' , ''))
    } 

    @test 'extractMethodInformationFromString returns the method data for @IBAction func testFun(_ name: String , _ surname: String? = nil )' () {
        let lines = this.mockData({ outlet: '@IBAction', params: ['_ name: String', '_ surname: String? = nil'] })
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        expect(data.outlet).to.equal('@IBAction')
        expect(data.access_level).to.be.undefined
        expect(data.methodName).to.equal('testFun')
        expect(data.params).to.not.be.undefined
        if(data.params === undefined) throw new Error()
        expect(data.params[0]).to.equal('_ name: String')
        expect(data.params[1]).to.equal('_ surname: String? = nil')
        expect(remainingString).to.equal(line.replace('@IBAction func testFun' , ''))
    } 

    @test 'extractMethodInformationFromString returns the method data for ${access_level} func testFun(_ name: String , _ surname: String? = nil )' () {
        let lines = this.mockData({ access_level: 'internal', params: ['_ name: String', '_ surname: String? = nil'] })
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        expect(data.access_level).to.equal('internal')
        expect(data.outlet).to.be.undefined
        expect(data.methodName).to.equal('testFun')
        expect(data.params).to.not.be.undefined
        if(data.params === undefined) throw new Error()
        expect(data.params[0]).to.equal('_ name: String')
        expect(data.params[1]).to.equal('_ surname: String? = nil')
        expect(remainingString).to.equal(line.replace('internal func testFun' , ''))
    } 

    @test 'extractMethodInformationFromString returns the method data for @IBAction ${access_level} func testFun(_ name: String , _ surname: String? = nil )' () {
        let options = { 
            outlet: '@IBAction',
            access_level: 'internal', 
            params: ['_ name: String', '_ surname: String? = nil'] }
        let lines = this.mockData(options)
        
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        expect(data.access_level).to.equal('internal')
        expect(data.outlet).to.equal('@IBAction')
        expect(data.methodName).to.equal('testFun')
        expect(data.params).to.not.be.undefined
        if(data.params === undefined) throw new Error()
        expect(data.params[0]).to.equal('_ name: String')
        expect(data.params[1]).to.equal('_ surname: String? = nil')
        expect(remainingString).to.equal(line.replace('@IBAction internal func testFun' , ''))
    } 

}