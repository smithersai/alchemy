import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { AWSEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.vibe";
declare const LexiconNotReady_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "LexiconNotReady";
} & Readonly<A>;
export declare class LexiconNotReady extends LexiconNotReady_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface LexiconProps {
    /**
     * Name of the lexicon — an alphanumeric string up to 20 characters
     * (`[0-9A-Za-z]{1,20}`). If omitted, a unique name is generated. Changing
     * this replaces the lexicon.
     */
    lexiconName?: string;
    /**
     * The lexicon content, a W3C Pronunciation Lexicon Specification (PLS)
     * XML document. Updatable in place — `PutLexicon` is a true upsert.
     */
    content: string;
}
export interface Lexicon extends Resource<"AWS.Polly.Lexicon", LexiconProps, {
    /**
     * Name of the lexicon (its identity within the region). Pass it as
     * `LexiconNames` to `SynthesizeSpeech` / `StartSpeechSynthesisTask`.
     */
    lexiconName: string;
    /**
     * ARN of the lexicon, e.g. `arn:aws:polly:us-east-1:123456789012:lexicon/casing`.
     */
    lexiconArn: string;
    /**
     * Phonetic alphabet declared by the PLS document (`ipa` or `x-sampa`).
     */
    alphabet: string | undefined;
    /**
     * Language code declared by the PLS document, e.g. `en-US`.
     */
    languageCode: string | undefined;
    /**
     * Number of lexemes in the lexicon.
     */
    lexemesCount: number | undefined;
}, never, Providers> {
}
/**
 * An Amazon Polly pronunciation lexicon — a W3C PLS document stored in a
 * region that customizes how `SynthesizeSpeech` pronounces specific words.
 * Identity is the region-scoped `lexiconName`; the PLS `content` is
 * updatable in place.
 *
 * ### Managing Lexicons
 * **Example:** Store a pronunciation lexicon
 * ```typescript
 * const lexicon = yield* AWS.Polly.Lexicon("Acronyms", {
 *   lexiconName: "acronyms",
 *   content: `<?xml version="1.0" encoding="UTF-8"?>
 * <lexicon version="1.0" xmlns="http://www.w3.org/2005/01/pronunciation-lexicon"
 *          alphabet="ipa" xml:lang="en-US">
 *   <lexeme><grapheme>W3C</grapheme><alias>World Wide Web Consortium</alias></lexeme>
 * </lexicon>`,
 * });
 * ```
 *
 * **Example:** Synthesize speech with the lexicon applied
 * ```typescript
 * const synthesizeSpeech = yield* AWS.Polly.SynthesizeSpeech();
 * const result = yield* synthesizeSpeech({
 *   OutputFormat: "mp3",
 *   VoiceId: "Joanna",
 *   Text: "The W3C maintains the PLS standard.",
 *   LexiconNames: [lexicon.lexiconName],
 * });
 * ```
 *
 * @resource
 */
export declare const Lexicon: import("alchemy").ResourceClass<Lexicon>;
export declare const LexiconProvider: () => import("effect/Layer").Layer<Provider.Provider<Lexicon>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
