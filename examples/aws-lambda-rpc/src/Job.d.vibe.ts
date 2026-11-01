import * as S from "effect/Schema";
export type JobId = S.Schema.Type<typeof JobId>;
export declare const JobId: S.String;
declare const Job_base: S.Class<Job, S.Struct<{
    readonly id: S.String;
    readonly content: S.String;
}>, {}>;
export declare class Job extends Job_base {
}
export declare const decodeJob: (input: {
    readonly id: string;
    readonly content: string;
}, options?: import("effect/SchemaAST").ParseOptions) => import("effect/Effect").Effect<Job, S.SchemaError, never>;
export {};
