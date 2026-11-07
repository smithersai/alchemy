import * as Layer from "effect/Layer";
import { ListEventIntegrations } from "./ListEventIntegrations.vibe";
/**
 * HTTP implementation of {@link ListEventIntegrations}. At deploy time it
 * grants `app-integrations:ListEventIntegrations`; at runtime it calls the
 * AppIntegrations API with the host Function's credentials. Provide this
 * layer on the Function using the binding.
 */
export declare const ListEventIntegrationsHttp: Layer.Layer<ListEventIntegrations, never, never>;
