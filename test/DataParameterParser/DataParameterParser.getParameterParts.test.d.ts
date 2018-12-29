import { DataParameterParser } from "../../src/DataParameterParser/DataParameterParser";
export declare class DataParameterParserUnitTest extends DataParameterParser {
    "returns data for ( _ name: String ) = varName: _ , name: name , type: String, isOptional: false"(): void;
    "returns data for ( _ name: inout String ) = varName: _ , name: name , type: String, isOptional: false"(): void;
    "returns data for ( person name: inout String? = nil ) = varName: person , name: name , type: String?, isOptional: true"(): void;
    "returns data for ( name: String = nil ) = varName: undefined , name: name , type: String, isOptional: false"(): void;
    "returns data for ( completion: ((_ data:  Data? , _ response: HttpResponse , _ error: Error? ) -> Void)? = nil ) = varName: undefined , name: completion , type: ((_ data:  Data? , _ response: HttpResponse , _ error: Error? ) -> Void)?, isOptional: true"(): void;
}
