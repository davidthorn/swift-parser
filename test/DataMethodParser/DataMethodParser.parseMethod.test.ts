/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { DataMethodParser } from "../../src/DataMethodParser/DataMethodParser";
import { expect } from 'chai'
import { DataStructureParser } from "../../src/DataStructureParser/DataStructureParser";

@suite('Data Method Parser - parseMethod')
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
        
        
        /// this comment is also here

        

        `
        return this.trimLines(data)
    }

    @test "parseMethod can parse the method data from a string with comments below it" () {

        const lines = this.mockData({ params: ['_ name: String' , '_ surname: String = nil'] })

        const { remainingLines , method } = this.parseStructureMethod(lines)

        expect(method).to.be.not.undefined
        if(method === undefined) throw new Error('this cannot be undefined')
        expect(method.inner).to.equal('print("this is happening here")')
        expect(remainingLines.join('\n').trim()).to.equal('/// this comment is also here')
        expect(method.parameters.length).to.equal(2)
        expect(method.parameters[0]).equal('_ name: String')
        expect(method.parameters[1]).equal('_ surname: String = nil')
    }

    @test "parseMethod should return undefined when commnets are provided prior to the method declaration" () {
        const lines = this.mockData({ params: ['_ name: String' , '_ surname: String = nil'] })

        const preComments = `
        /**
        * This is a comment which should be used to comment the method
        * 
        */
        `

        const searchData = `${preComments}${lines.join('\n')}`
      
        const { remainingLines , method } = this.parseStructureMethod(this.trimLines(searchData))
        
        expect(method).to.be.undefined
        if(method !== undefined) throw new Error('this cannot be undefined')

    }

    @test "parseMethod should return undefined if a method is wrapped in a class" () {

        const lines = `
        internal var home: String = "this is here"
        class home {
            func test() -> Void {
                print("this is here")
            }
        }
        `.split('\n')

        const { method } = this.parseStructureMethod(lines)
        expect(method).to.be.undefined
    }

    @test "parseMethod returns defined when it is passed the inner from a class result and no other properties preceed it"() {

        const lines = `
        internal var home: String = "this is here"
        class home {
            func test() -> Void {
                print("this is here")
            }
        }
        `.split('\n')

        const parser = new DataStructureParser()
        const { inner  } = parser.extractStructInfo(lines)
        const { method } = this.parseStructureMethod(inner!.split('\n') )
        expect(method).to.not.be.undefined
    }

    @test "parseMethod returns undefined when it is passed the inner from a class result and no a property preceeds it"() {

        const lines = `
        internal var home: String = "this is here"
        class home {

            internal var home: String = "hello"

            func test() -> Void {
                print("this is here")
            }
        }


        `.split('\n')

        const parser = new DataStructureParser()
        const { inner  } = parser.extractStructInfo(lines)
        const { method } = this.parseStructureMethod(inner!.split('\n') )
        expect(method).to.be.undefined
    }

}