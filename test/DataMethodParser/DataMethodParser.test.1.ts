/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { DataMethodParser } from "../../src/DataMethodParser/DataMethodParser";
import { expect } from 'chai'

@suite('Data Method Extract Method Parameters from string')
class DataMethodParserUnitTest extends DataMethodParser {

    mockData(options?: { outlet?: string ,  access_level?: string , params?: string[], methodName?: string , returnValue?: string }): string[] {
        const opts = options === undefined ? {} : options 
        const outlet = opts.outlet === undefined ? '' : `${opts.outlet} `
        const returnValue = opts.returnValue === undefined ? '' : ` -> ${opts.returnValue} `
        const access_level = opts.access_level === undefined ? '' : `${opts.access_level} `
        const methodName = opts.methodName === undefined ? 'testFunc' : `${opts.methodName}`
        const params = opts.params === undefined ? [] : opts.params
        const data = `${outlet}${access_level}func ${methodName}(${params.join(',')})${returnValue}{
            print("this is happening here")
        } 
        `
        return this.trimLines(data)
    }

    @test " new brakcet finder" () {
        const data = this.mockData({params: ['_ name: ((_ String?) -> Void)? = nil ' , '_ surname: String']})
        const { remainingString } = this.extractMethodInformationFromString(data.join('\n'))
        const { params } = this.extractMethodParams(remainingString)
        expect(params.length).to.equal(2)
    }

   @test "extract Params _ name: String ,  _ surname: String from string" () {
        const data = this.mockData({params: ['_ name: String' , '_ surname: String']})
        const { remainingString } = this.extractMethodInformationFromString(data.join('\n'))
        const { params } = this.extractMethodParams(remainingString)
        expect(params.length).to.equal(2)
   }

   @test "extract 0 Params from string" () {
        const data = this.mockData()
        const { remainingString } = this.extractMethodInformationFromString(data.join('\n'))
        const { params } = this.extractMethodParams(remainingString)
        expect(params.length).to.equal(0)
    }
  
    @test "extract an optional completion handler with default value from parameters" () {
        const data = this.mockData({params: ['_ name: ((_ String?) -> Void)? = nil ']})
        const { remainingString } = this.extractMethodInformationFromString(data.join('\n'))
        const { params } = this.extractMethodParams(remainingString)
        expect(params.length).to.equal(1)
    }

    @test "extract an optional completion handler with default value from parameters followed by additional simple parameter" () {
        const data = this.mockData({params: ['_ name: ((_ String?) -> Void)? = nil ' , '_ surname: String']})
        const { remainingString } = this.extractMethodInformationFromString(data.join('\n'))
        const { params } = this.extractMethodParams(remainingString)
        expect(params.length).to.equal(2)
    }

    @test "extract parameter with no default names" () {
        const data = this.mockData({params: ['name: ((_ String?) -> Void)? = nil ' , 'surname: String']})
        const { remainingString } = this.extractMethodInformationFromString(data.join('\n'))
        const { params } = this.extractMethodParams(remainingString)
        expect(params.length).to.equal(2)
    }

}