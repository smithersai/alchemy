import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
declare const BotVersionUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "BotVersionUnexpectedResponse";
} & Readonly<A>;
export declare class BotVersionUnexpectedResponse extends BotVersionUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface BotVersionProps {
    /**
     * ID of the bot to version. Changing it replaces the version.
     */
    botId: string;
    /**
     * The locales included in the version, snapshot from `DRAFT`. Each locale
     * is built first if it is not already built (building a small bot takes
     * one to a few minutes). Pass the `localeId` attribute of the Intent (or
     * BotLocale) resources so the version depends on the conversation graph.
     * Changing the list replaces the version.
     */
    localeIds: string[];
    /**
     * Description of the version. Changing it replaces the version (versions
     * are immutable).
     */
    description?: string;
}
export interface BotVersion extends Resource<"AWS.LexV2.BotVersion", BotVersionProps, {
    /** ID of the bot the version belongs to. */
    botId: string;
    /** The numbered version Amazon Lex assigned, e.g. `1`. */
    botVersion: string;
    /** Status of the bot version (e.g. `Available`). */
    botStatus: string;
    /** The locales included in the version. */
    localeIds: string[];
}, never, Providers> {
}
/**
 * An immutable numbered version of an Amazon Lex V2 bot, snapshot from the
 * DRAFT version. The provider builds each included locale first (if needed),
 * so the version is immediately usable behind a `BotAlias`.
 *
 * Versions are immutable: any prop change replaces the resource with a newly
 * created version.
 *
 * ### Creating a Version
 * **Example:** Version a Built Locale
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const version = yield* AWS.LexV2.BotVersion("V1", {
 *   botId: intent.botId,
 *   // depend on the intent so the build includes it
 *   localeIds: [intent.localeId],
 * });
 * const alias = yield* AWS.LexV2.BotAlias("Live", {
 *   botId: version.botId,
 *   botVersion: version.botVersion,
 * });
 * ```
 *
 * @resource
 */
export declare const BotVersion: import("alchemy").ResourceClass<BotVersion>;
export declare const BotVersionProvider: () => import("effect/Layer").Layer<Provider.Provider<BotVersion>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
export {};
