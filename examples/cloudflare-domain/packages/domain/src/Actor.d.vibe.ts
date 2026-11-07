import * as Schema from "effect/Schema";
/**
 * Who is acting. `Session` provides it as the `CurrentActor` of each
 * request; events that need an audit trail record it as `by`.
 */
export declare const Actor: Schema.Union<readonly [Schema.TaggedStruct<"Customer", {
    readonly customerId: Schema.brand<Schema.String, "CustomerId">;
}>, Schema.TaggedStruct<"Agent", {
    readonly agentId: Schema.String;
}>, Schema.TaggedStruct<"System", {
    readonly name: Schema.String;
}>]>;
export type Actor = typeof Actor.Type;
export declare const customer: (customerId: string) => Actor;
export declare const agent: (agentId: string) => Actor;
export declare const system: (name: string) => Actor;
