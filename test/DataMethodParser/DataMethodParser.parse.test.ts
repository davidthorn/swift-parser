/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { DataMethodParser } from "../../src/DataMethodParser/DataMethodParser";
import { expect } from 'chai'

@suite('Data Method Parser - parse')
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

    @test "parse multiples containing methods" () {

        let method1 = this.mockData({methodName: 'test1', params: ['_ name: String']})
        const test2 = this.mockData({methodName: 'test2'})
        const method2 = `
            ${method1.join('\n')}

            ${test2.join('\n')}

        ` 
        let parsablLine = method2
        let methods = []

        while(parsablLine.length > 0) {
            const methodData = this.extractMethodInformationFromString(parsablLine)
            const paramsData = this.extractMethodParams(methodData.remainingString.trim())
            
            const method1Body = this.extractBodyFromString(paramsData.remainingString)
            parsablLine = method1Body.remainingString
            methods.push(methodData)
        }

        


        // const methodData1 = this.extractMethodInformationFromString(mathod1Body.remainingString)
        // const paramsData1 = this.extractMethodParams(methodData1.remainingString)
        
        // const mathod2Body = this.extractBodyFromString(paramsData1.remainingString)

        // methods.push(methodData)
        // parsablLine = remainingString
   
        
        

        

    }


}