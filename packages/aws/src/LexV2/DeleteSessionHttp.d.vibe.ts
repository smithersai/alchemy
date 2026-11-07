import * as Layer from "effect/Layer";
import { DeleteSession } from "./DeleteSession.vibe";
/**
 * HTTP implementation of {@link DeleteSession} — calls the `lex-runtime-v2`
 * `DeleteSession` operation with the Lambda role's credentials and grants
 * the host `lex:DeleteSession` on the alias.
 */
export declare const DeleteSessionHttp: Layer.Layer<DeleteSession, never, never>;
