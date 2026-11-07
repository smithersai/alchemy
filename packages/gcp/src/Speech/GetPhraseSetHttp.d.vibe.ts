import * as Layer from "effect/Layer";
import { GetPhraseSet } from "./GetPhraseSet.vibe";
/**
 * HTTP implementation of {@link GetPhraseSet}.
 *
 * @layer
 * @provides GCP.Speech.GetPhraseSet
 */
export declare const GetPhraseSetHttp: Layer.Layer<GetPhraseSet, never, never>;
