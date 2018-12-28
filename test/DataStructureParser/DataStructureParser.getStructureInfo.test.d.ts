import { DataStructureParser } from '../../src/DataStructureParser/DataStructureParser';
import { AccessLevelType } from '../../src/AccessLevel';
import { DataStructureTypeName } from '../../src/DataStructure/DataStructureTypeName';
export declare class DataStructureParserUnitTest extends DataStructureParser {
    getMockData(options?: {
        access_level?: AccessLevelType;
        type: DataStructureTypeName;
        name?: string;
    }): string[];
    "create a basic data structure info using public class SimpleObject"(): void;
    "create a basic data structure info using private class SimpleObject"(): void;
    "create a basic data structure info using fileprivate class SimpleObject"(): void;
    "create a basic data structure info using open class SimpleObject"(): void;
    "create a basic data structure info using class SimpleObject"(): void;
    "create a basic data structure info using undefined undefined SimpleObject"(): void;
    "create a basic data structure info using undefined struct SimpleObject"(): void;
    "create a basic data structure info using undefined protocol SimpleObject"(): void;
    "create a basic data structure info using undefined enum SimpleObject"(): void;
    "should match public class SimpleObject"(): void;
}
