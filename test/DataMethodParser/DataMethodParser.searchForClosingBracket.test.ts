/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
import { DataMethodParser } from "../../src/DataMethodParser/DataMethodParser";
import { expect } from 'chai'
import { searchForClosingBracket } from "../../src/parseLastBracket";

@suite('Data Method Parser - searchForClosingBracket')
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

    @test "method returns { print(\"hello there\") } when passed (){ print(\"hello there\") } "() {
      const result = searchForClosingBracket('(' , "(){ print(\"hello there\") }")
        expect(result.remainingString).to.equal('{ print("hello there") }')
    }

    @test "method returns { print(\"hello there\") } when passed (_ name: String , _ surname: (String) -> Void ){ print(\"hello there\") } "() {
        const result = searchForClosingBracket('(' , "(_ name: String , _ surname: (String) -> Void ){ print(\"hello there\") }")
          expect(result.remainingString).to.equal('{ print("hello there") }')
    }

    @test "method returns { print(\"hello there\") } when passed (_ name: String , _ surname: ((String?) -> Void)? = nil ){ print(\"hello there\") } "() {
        const result = searchForClosingBracket('(' , "(_ name: String , _ surname: ((String?) -> Void)? = nil ){ print(\"hello there\") }")
          expect(result.remainingString).to.equal('{ print("hello there") }')
    }

    @test "method returns matchedString print(\"hello there\") when passed { print(\"hello there\") } "() {
        const result = searchForClosingBracket('{' , "{ print(\"hello there\") }")
        expect(result.matchedString).to.equal('print("hello there")')
    }

    @test "method returns matchedString 5 === (3 + 2) when passed (5 === (3 + 2))"() {
        const result = searchForClosingBracket('(' , "(5 === (3 + 2))")
        expect(result.matchedString).to.equal('5 === (3 + 2)')
    }


}