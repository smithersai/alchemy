import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
/**
 * Hard-coded value the integ test asserts on to prove the secret was
 * bound at plantime and read at runtime through the `Redacted` accessor.
 */
export declare const WORKFLOW_SECRET_VALUE = "wf-secret-abc123";
declare const NotifyWorkflow_base: Effect.Effect<Cloudflare.WorkflowHandle<{
    roomId: string;
    message: string;
}, {
    text: string;
    secret: string;
    ts: number;
}>, never, Cloudflare.KV.ReadWriteNamespace | Cloudflare.Worker> & (new (_: never) => Cloudflare.WorkflowImpl<{
    roomId: string;
    message: string;
}, {
    text: string;
    secret: string;
    ts: number;
}, never>);
export default class NotifyWorkflow extends NotifyWorkflow_base {
}
export {};
