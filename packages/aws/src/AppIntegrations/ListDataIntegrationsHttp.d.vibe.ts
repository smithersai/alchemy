import * as Layer from "effect/Layer";
import { ListDataIntegrations } from "./ListDataIntegrations.vibe";
/**
 * HTTP implementation of {@link ListDataIntegrations}. At deploy time it
 * grants `app-integrations:ListDataIntegrations`; at runtime it calls the
 * AppIntegrations API with the host Function's credentials. Provide this
 * layer on the Function using the binding.
 */
export declare const ListDataIntegrationsHttp: Layer.Layer<ListDataIntegrations, never, never>;
