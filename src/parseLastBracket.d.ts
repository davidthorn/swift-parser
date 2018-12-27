export declare type ParseTextResult = {
    closed: string;
    remaining: string;
    old: string;
    completed: boolean;
};
export declare const parseText: (text: string) => ParseTextResult;
