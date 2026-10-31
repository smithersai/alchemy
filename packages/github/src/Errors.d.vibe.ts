declare const IssueNotFound_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "IssueNotFound";
} & Readonly<A>;
/** The issue does not exist in the repository. */
export declare class IssueNotFound extends IssueNotFound_base<{
    readonly owner: string;
    readonly repository: string;
    readonly number: number;
}> {
}
export {};
