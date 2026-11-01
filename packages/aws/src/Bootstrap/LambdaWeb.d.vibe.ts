/**
 * Resolve the bundled program (the `fetch` handler registered via `serve`)
 * and run it with a Node HTTP server bound to `AWS_LAMBDA_HTTP_ENDPOINT`.
 */
export declare const bootstrap: (entrypoint: unknown) => Promise<void>;
