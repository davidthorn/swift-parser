import { DataStructureParser } from '../../src/DataStructureParser/DataStructureParser';
export declare class DataStructureParserUnitTest extends DataStructureParser {
    getMockData(options?: {
        access_level?: string;
        type?: string;
        name?: string;
    }): string[];
    "can extract internal class SimpleObject from lines"(): void;
    "can extract internal struct SimpleObject from lines"(): void;
    "can extract struct SimpleObject from lines"(): void;
    "can extract multiple classes from file"(): void;
    "can handle invalid  data"(): void;
}
