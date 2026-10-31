import * as Layer from "effect/Layer";
import { ListApplicationAssociations } from "./ListApplicationAssociations.js";
/**
 * HTTP implementation of {@link ListApplicationAssociations}. At deploy time
 * it grants `app-integrations:ListApplicationAssociations` on the application
 * (and its `application-association/*` children); at runtime it calls the
 * AppIntegrations API with the host Function's credentials, injecting the
 * application's id. Provide this layer on the Function using the binding.
 */
export declare const ListApplicationAssociationsHttp: Layer.Layer<ListApplicationAssociations, never, never>;
