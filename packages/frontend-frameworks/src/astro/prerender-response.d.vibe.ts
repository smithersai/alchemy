/**
 * Node-side reader for the framed prerender responses the prerender worker
 * writes with `createFramedPrerenderResponse`. Kept out of the worker runtime
 * so the metadata Schema never ships in the worker bundle.
 */
import type { PrerenderRenderMetadata } from "astro";
export declare function readFramedPrerenderResponse(transportResponse: Response): Promise<{
    response: Response;
    metadata: PrerenderRenderMetadata | undefined;
}>;
