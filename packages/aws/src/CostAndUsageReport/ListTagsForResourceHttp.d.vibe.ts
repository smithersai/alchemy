import * as Layer from "effect/Layer";
import { ListTagsForResource } from "./ListTagsForResource.vibe";
/**
 * HTTP implementation of {@link ListTagsForResource}: grants
 * `cur:ListTagsForResource` on the bound report definition's ARN and calls
 * the us-east-1 CUR endpoint with the function's IAM credentials, injecting
 * the report's name as the `ReportName`.
 */
export declare const ListTagsForResourceHttp: Layer.Layer<ListTagsForResource, never, never>;
