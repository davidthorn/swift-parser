/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { DataMethodParser } from "../../src/DataMethodParser/DataMethodParser";
import { expect } from 'chai'

@suite('Data Method Parser - Extra Method Information from string (extractMethodInformationFromString)')
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

    @test 'returns the method data for func testFun()' () {
        let lines = this.mockData()
        let line = lines.join('\n')
        const { remainingString , data } = this.extractMethodInformationFromString(line)
        expect(data.outlet).to.be.undefined
        expect(data.access_level).to.be.undefined
        expect(data.methodName).to.equal('testFun')
        expect(remainingString).to.equal(line.replace('func testFun' , ''))
    }

    @test 'returns the method data for func testFun(_ name: String , _ surname: String? = nil )' () {
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

    @test 'returns the method data for @IBAction func testFun(_ name: String , _ surname: String? = nil )' () {
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

    @test 'returns the method data for ${access_level} func testFun(_ name: String , _ surname: String? = nil )' () {
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

    @test 'returns the method data for @IBAction ${access_level} func testFun(_ name: String , _ surname: String? = nil )' () {
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