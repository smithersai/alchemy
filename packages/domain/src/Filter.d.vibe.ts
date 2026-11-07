import * as DateTime from "effect/DateTime";
import * as Schema from "effect/Schema";
/**
 * Comparison operators for ordered values (numbers, dates, strings).
 */
export interface OrderedOps<V> {
    readonly equals?: V;
    readonly not?: V | null;
    readonly in?: ReadonlyArray<V>;
    readonly notIn?: ReadonlyArray<V>;
    readonly lt?: V;
    readonly lte?: V;
    readonly gt?: V;
    readonly gte?: V;
}
/**
 * String operators.
 */
export interface StringOps<V> extends OrderedOps<V> {
    readonly contains?: string;
    readonly startsWith?: string;
    readonly endsWith?: string;
}
/**
 * Array operators.
 */
export interface ArrayOps<E> {
    readonly some?: FieldFilter<E>;
    readonly every?: FieldFilter<E>;
    readonly none?: FieldFilter<E>;
    readonly has?: E;
    readonly isEmpty?: boolean;
    readonly length?: FieldFilter<number>;
}
type NonNull<V> = V extends DateTime.Utc ? V | OrderedOps<V> : V extends string ? V | StringOps<V> : V extends number ? V | OrderedOps<V> : V extends boolean ? V | {
    readonly not?: boolean;
} : V extends ReadonlyArray<infer E> ? ArrayOps<E> : V extends object ? Filter<V> | {
    readonly equals: V;
} : never;
/**
 * A filter for one field: a bare value means equality, an object holds
 * operators chosen by the field's type.
 */
export type FieldFilter<V> = null extends V ? null | {
    readonly not: null;
} | NonNull<NonNullable<V>> : NonNull<V>;
/**
 * A Prisma-style filter over a value of type `T`. Sibling keys combine with
 * AND. Filters are plain data, so they can be sent over the wire and evaluated
 * where the data lives.
 *
 * **Example:** Filtering a view
 * ```typescript
 * const frozenAndEmpty: Filter<AccountSummary> = { frozen: true, balance: { lte: 0 } };
 * const either: Filter<TransferStatus> = {
 *   OR: [{ completedAt: { not: null } }, { failedReason: { not: null } }],
 * };
 * ```
 */
export type Filter<T> = {
    readonly [K in keyof T]?: FieldFilter<T[K]>;
} & {
    readonly AND?: ReadonlyArray<Filter<T>>;
    readonly OR?: ReadonlyArray<Filter<T>>;
    readonly NOT?: Filter<T>;
};
/**
 * Sort order for list queries.
 */
export type OrderBy<T> = {
    readonly [K in keyof T]?: "asc" | "desc";
};
/**
 * A {@link Filter} as it crosses the wire. A read decodes `where` with it, so
 * a malformed filter is refused before {@link matches} evaluates it.
 */
export declare const FilterJson: Schema.Codec<unknown>;
/**
 * Evaluate a {@link Filter} against a value.
 */
export declare const matches: <T>(filter: Filter<T> | undefined, value: T) => boolean;
/**
 * Sort values by an {@link OrderBy} specification.
 */
export declare const sort: <T>(values: ReadonlyArray<T>, orderBy: OrderBy<T> | undefined) => Array<T>;
export {};
