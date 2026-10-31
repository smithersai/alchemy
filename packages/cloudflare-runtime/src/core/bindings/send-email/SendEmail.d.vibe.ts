import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Storage from "../../globals/Storage.vibe";
import * as Plugin from "../../Plugin.vibe";
import type { BindingHook } from "../../PluginContext.js";
import type { RemoteBindings } from "../../remote-bindings/RemoteBindings.js";
import type * as WorkerdConfig from "../../workerd/Config.js";
import type { SendEmailProps, SendEmailServiceProps } from "./SendEmailOptions.shared.js";
declare const SendEmail_base: import("effect/Context").ServiceClass<SendEmail, "cloudflare-runtime/plugin/SendEmail", Plugin.PluginBuilder<{
    /**
     * Record that a local `send_email` binding is in use (so the send-email
     * services are only emitted when at least one binding exists) and resolve
     * the service designator the binding should target: the shared
     * `send-email` service's `SendEmailBinding` entrypoint, with the
     * per-binding address restrictions carried via designator props.
     */
    readonly register: (props: SendEmailServiceProps) => Effect.Effect<WorkerdConfig.ServiceDesignator>;
}>>;
export declare class SendEmail extends SendEmail_base {
}
export declare const SendEmailLive: Layer.Layer<SendEmail, never, FileSystem.FileSystem | Path.Path | Storage.Storage>;
/**
 * Bind to a deployed `send_email` binding via the remote bindings proxy.
 *
 * Also registers the `cloudflare-internal:email` extension that exposes
 * the `EmailMessage` class to user code (workerd does not ship it
 * natively), matching the upstream Miniflare behavior.
 */
export declare const remote: (props: SendEmailProps) => BindingHook<RemoteBindings | SendEmail>;
/**
 * Bind a local `send_email` simulator for `alchemy dev`. `send()` validates
 * the message (sender/recipient allow-lists, MIME parseability, `Message-ID`,
 * `From:` header matching the envelope sender) exactly like Miniflare,
 * persists it under `{storage}/email` (`.eml` for raw messages; text/html/
 * attachments from the MessageBuilder API under `text/`, `html/` and
 * `attachment/`) and logs the written file path — instead of delivering real
 * mail. Opt into the real, remote binding with `dev: { remote: true }`.
 *
 * Reuses the `cloudflare-internal:email` `EmailMessage` shim registered by
 * {@link SendEmailLive} (same as {@link remote}), so user code can still
 * construct `EmailMessage` instances in dev.
 */
export declare const local: (props: SendEmailProps) => BindingHook<SendEmail>;
export {};
