export declare type ParseTextResult = {
    closed: string;
    remaining: string;
    old: string;
    completed: boolean;
};
export declare const searchForClosingBracket: (bracket: "(" | "{", search: string) => {
    matchedString?: string | undefined;
    remainingString: string;
};
export declare const parseText: (text: string) => ParseTextResult;
