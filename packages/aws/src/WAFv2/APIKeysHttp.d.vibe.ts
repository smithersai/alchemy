import * as Layer from "effect/Layer";
import { CreateAPIKey, DeleteAPIKey, GetDecryptedAPIKey, ListAPIKeys } from "./APIKeys.js";
export declare const CreateAPIKeyHttp: Layer.Layer<CreateAPIKey, never, never>;
export declare const GetDecryptedAPIKeyHttp: Layer.Layer<GetDecryptedAPIKey, never, never>;
export declare const ListAPIKeysHttp: Layer.Layer<ListAPIKeys, never, never>;
export declare const DeleteAPIKeyHttp: Layer.Layer<DeleteAPIKey, never, never>;
