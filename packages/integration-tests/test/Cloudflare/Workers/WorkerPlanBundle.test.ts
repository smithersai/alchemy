import type { CloudflareResolvedCredentials } from "@alchemy.run/cloudflare/Auth/AuthConfig";
import { CloudflareEnvironment } from "@alchemy.run/cloudflare/CloudflareEnvironment";
import { LocalRuntimeState } from "@alchemy.run/cloudflare/LocalRuntime";
import { WorkerBundle } from "@alchemy.run/cloudflare/Workers/Sources/Rolldown";
import type { Worker } from "@alchemy.run/cloudflare/Workers/Worker";
import { LiveWorkerProvider } from "@alchemy.run/cloudflare/Workers/WorkerProvider";
import { describe, expect, it } from "@alchemy.run/test";
import { apiTokenCredentials, Credentials } from "@distilled.cloud/cloudflare/Credentials";
import { NodeServices } from "@effect/platform-node";
import { AlchemyContext } from "alchemy/AlchemyContext";
import {
  Artifacts,
  ArtifactStore,
  createArtifactStore,
  makeScopedArtifacts,
} from "alchemy/Artifacts";
import type { BundleOutput } from "alchemy/Bundle/Bundle";
import { Provider } from "alchemy/Provider";
import { ResourceContext } from "alchemy/ResourceContext";
import { Stack, type StackSpec } from "alchemy/Stack";
import { Stage } from "alchemy/Stage";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import * as MutableHashMap from "effect/MutableHashMap";
import * as Path from "effect/Path";
import * as Redacted from "effect/Redacted";
import type * as rolldown from "rolldown";
import { resourceContext } from "../../Util/ResourceContext.ts";

// A plan bundles each changed Worker to compare its hash with the deployed
// one, and the apply reuses that bundle (`Artifacts.cached("build")`). The
// diff strips Effect-valued props first, and `stripEffects` also drops
// functions and class instances, which are exactly what build plugins are.
// These tests hand the real provider `diff` a Worker whose code only exists
// through a build plugin, the way `alchemy plan` and `alchemy deploy` do.

const ACCOUNT = "test-account-id";
const ID = "PluginWorker";
const INSTANCE = "0123456789abcdef0123456789abcdef";
const GREETING = "hello from a build plugin";
const compatibility = { date: "2026-03-17", flags: [] as string[] };

const stack: Omit<StackSpec, "output"> = {
  name: "plan-bundle",
  stage: "test",
  resources: {},
  bindings: {},
  actions: {},
};

const credentials: CloudflareResolvedCredentials = {
  type: "apiToken",
  apiToken: Redacted.make("test-token"),
  accountId: ACCOUNT,
  source: { type: "stored" },
};

/** Resolves `virtual:greeting`, which no file on disk provides. */
const greetingPlugin = (): rolldown.Plugin => ({
  name: "greeting",
  resolveId: (source) => (source === "virtual:greeting" ? "\0virtual:greeting" : null),
  load: (id) =>
    id === "\0virtual:greeting" ? `export default ${JSON.stringify(GREETING)};` : null,
});

const writeWorker = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const root = yield* fs.makeTempDirectoryScoped({ prefix: "alchemy-plan-bundle-" });
  // Anchors findCwdForBundle so the bundle output stays in the temp dir.
  yield* fs.writeFileString(path.join(root, "package.json"), "{}");
  const main = path.join(root, "worker.ts");
  yield* fs.writeFileString(
    main,
    [
      `import greeting from "virtual:greeting";`,
      `export default { fetch: () => new Response(greeting) };`,
    ].join("\n"),
  );
  return { root, main };
});

const decode = (content: string | Uint8Array) =>
  typeof content === "string" ? content : new TextDecoder().decode(content);

/** What the engine provides a provider during a plan, rooted in a temp `.alchemy`. */
const environment = (root: string) =>
  Layer.mergeAll(
    Layer.succeed(CloudflareEnvironment, Effect.succeed(credentials)),
    Layer.succeed(Stack, stack),
    Layer.succeed(Stage, stack.stage),
    Layer.succeed(ResourceContext, resourceContext(INSTANCE, ID)),
    Layer.succeed(AlchemyContext, { dotAlchemy: `${root}/.alchemy`, dev: false, adopt: false }),
    // Only the provider layer's type-level requirements; diff makes no
    // Cloudflare request for a Worker without bindings.
    Layer.succeed(
      Credentials,
      Effect.succeed(apiTokenCredentials({ apiToken: Redacted.make("test-token") })),
    ),
    Layer.sync(ArtifactStore, createArtifactStore),
    Layer.succeed(
      LocalRuntimeState,
      LocalRuntimeState.of({
        queues: MutableHashMap.empty(),
        queueConsumers: MutableHashMap.empty(),
        workerRestarts: MutableHashMap.empty(),
      }),
    ),
    FetchHttpClient.layer,
  );

/** Runs the real Worker provider's `diff` with a run-scoped artifact store, as a plan does. */
const planDiff = (root: string, news: Record<string, unknown>, bundleHash: string) =>
  Effect.gen(function* () {
    const store = createArtifactStore();
    const provider = yield* Provider<Worker>("Cloudflare.Worker");
    const result = yield* provider.diff!({
      id: ID,
      fqn: ID,
      instanceId: INSTANCE,
      olds: news as never,
      news: news as never,
      oldBindings: undefined as never,
      newBindings: undefined as never,
      output: {
        accountId: ACCOUNT,
        workerId: "c81a2d22c29840ed9d61681a3270dbff",
        workerName: "plan-bundle-test-pluginworker",
        durableObjectNamespaces: {},
        urls: [],
        routes: [],
        crons: [],
        hash: {
          assets: undefined,
          bundle: bundleHash,
          input: undefined,
          additionalWorkspaces: undefined,
        },
      } as never,
    }).pipe(Effect.provide(Layer.succeed(Artifacts, makeScopedArtifacts(store, ID))));
    const cached = store.get(ID)?.get("build") as BundleOutput | undefined;
    return { result, cached };
  }).pipe(Effect.provide(LiveWorkerProvider()), Effect.provide(environment(root)));

/** The bundle `alchemy deploy` uploads for these props when nothing strips them. */
const bundleWithPlugins = (root: string, main: string, build: unknown) =>
  Effect.gen(function* () {
    const bundler = yield* WorkerBundle;
    return yield* bundler.build({
      id: ID,
      main,
      compatibility,
      entry: { kind: "external" },
      stack: { name: stack.name, stage: stack.stage },
      extraOptions: build as never,
    });
  }).pipe(Effect.provide(environment(root)));

describe(
  "Cloudflare.Worker plan bundles with the Worker's build plugins",
  { tags: ["unit", "provider:cloudflare", "provider:cloudflare:worker", "local"] },
  () => {
    it.effect(
      "an unchanged Worker whose code comes from a build plugin plans no update",
      () =>
        Effect.gen(function* () {
          const { root, main } = yield* writeWorker;
          const build = { input: { plugins: [greetingPlugin()] } };
          const deployed = yield* bundleWithPlugins(root, main, build);
          const { result } = yield* planDiff(
            root,
            { main, compatibility, isExternal: true, build },
            deployed.hash,
          );
          // No structural change: the engine falls back to its default diff.
          expect(result).toBeUndefined();
        }).pipe(Effect.scoped, Effect.provide(NodeServices.layer)),
      { timeout: 60_000 },
    );

    it.effect(
      "the bundle the plan hands to deploy ran the build plugins",
      () =>
        Effect.gen(function* () {
          const { root, main } = yield* writeWorker;
          // A plugin may be a Promise, which stripEffects treats as a class instance.
          const build = { input: { plugins: [Promise.resolve(greetingPlugin())] } };
          const { result, cached } = yield* planDiff(
            root,
            { main, compatibility, isExternal: true, build },
            "hash-of-an-older-deploy",
          );
          expect(result?.action).toBe("update");
          expect(cached).toBeDefined();
          expect(decode(cached!.files[0].content)).toContain(GREETING);
        }).pipe(Effect.scoped, Effect.provide(NodeServices.layer)),
      { timeout: 60_000 },
    );
  },
);
