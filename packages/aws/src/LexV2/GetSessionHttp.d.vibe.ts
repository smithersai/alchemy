import * as Layer from "effect/Layer";
import { GetSession } from "./GetSession.js";
/**
 * HTTP implementation of {@link GetSession} — calls the `lex-runtime-v2`
 * `GetSession` operation with the Lambda role's credentials and grants the
 * host `lex:GetSession` on the alias.
 */
export declare const GetSessionHttp: Layer.Layer<GetSession, never, never>;
