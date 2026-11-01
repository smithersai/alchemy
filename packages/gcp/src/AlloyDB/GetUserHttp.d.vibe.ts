import * as Layer from "effect/Layer";
import { GetUser } from "./GetUser.js";
/**
 * HTTP implementation of {@link GetUser}.
 *
 * @layer
 * @provides GCP.AlloyDB.GetUser
 */
export declare const GetUserHttp: Layer.Layer<GetUser, never, never>;
