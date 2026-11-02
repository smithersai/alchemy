import * as Layer from "effect/Layer";
import { GraphQL } from "./GraphQL.vibe";
/**
 * HTTP implementation of the {@link GraphQL} binding. The AppSync data
 * plane has no SDK operation — each request is a SigV4-signed POST
 * (service `"appsync"`) to the API's `graphqlUrl`, made with the host
 * Function's own credentials. Grants `appsync:GraphQL` on every field of
 * the bound API (`{apiArn}/types/*&#47;fields/*`).
 */
export declare const GraphQLHttp: Layer.Layer<GraphQL, never, never>;
