import * as Layer from "effect/Layer";
import { CreateDataIntegrationAssociation } from "./CreateDataIntegrationAssociation.js";
/**
 * HTTP implementation of {@link CreateDataIntegrationAssociation}. At deploy
 * time it grants `app-integrations:CreateDataIntegrationAssociation` on the
 * data integration (and its `data-integration-association/*` children); at
 * runtime it calls the AppIntegrations API with the host Function's
 * credentials, injecting the data integration's id. Provide this layer on
 * the Function using the binding.
 */
export declare const CreateDataIntegrationAssociationHttp: Layer.Layer<CreateDataIntegrationAssociation, never, never>;
