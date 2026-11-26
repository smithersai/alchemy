import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const sourceRoot = process.env.ALCHEMY_GCP_SOURCE_ROOT ?? root;
const require = createRequire(join(root, "packages/gcp/package.json"));
const Effect = require("effect/Effect");
const fc = process.env.ALCHEMY_GCP_FAST_CHECK
  ? require(process.env.ALCHEMY_GCP_FAST_CHECK)
  : createRequire(
      createRequire(join(root, "packages/alchemy-test/package.json")).resolve("@effect/vitest"),
    )("fast-check");
const binary =
  process.env.ALCHEMY_GCP_NATIVE ??
  (await import(pathToFileURL(join(root, "node_modules/vibelang/binary.mjs")))).findBinary();
const parsed = new Map();
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-gcp-native-boundaries.json", import.meta.url), "utf8"),
);

function source(file) {
  let path = join(sourceRoot, "packages/gcp/src", file);
  if (!existsSync(path) && path.endsWith(".vibe")) path = path.slice(0, -5) + ".ts";
  if (!parsed.has(path)) {
    const text = readFileSync(path, "utf8");
    const result = spawnSync(binary, ["--estree", path], { input: text, encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    const nodes = [];
    function visit(value) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === "object") {
        if (value.type) nodes.push(value);
        Object.values(value).forEach(visit);
      }
    }
    visit(JSON.parse(result.stdout).ast);
    parsed.set(path, { text, nodes });
  }
  return parsed.get(path);
}

function extract(file, predicate) {
  const { text, nodes } = source(file);
  const node = nodes.find(predicate);
  assert.ok(node, `missing source fragment in ${file}`);
  return Array.from(text)
    .slice(...node.range)
    .join("");
}

function declaration(file, name) {
  return extract(
    file,
    (node) =>
      node.type === "VariableDeclaration" &&
      node.declarations.some((item) => item.id.name === name),
  );
}

async function fixture(main, helpers, check) {
  const dir = mkdtempSync(join(tmpdir(), "alchemy-gcp-boundary-"));
  try {
    symlinkSync(join(root, "packages/gcp/node_modules"), join(dir, "node_modules"), "dir");
    writeFileSync(join(dir, "package.json"), JSON.stringify({ type: "module" }));
    writeFileSync(join(dir, "main.vibe"), main);
    if (helpers) writeFileSync(join(dir, "helpers.ts"), helpers);
    writeFileSync(
      join(dir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          strict: false,
          skipLibCheck: true,
          target: "ESNext",
          module: "Preserve",
          moduleResolution: "Bundler",
          rewriteRelativeImportExtensions: true,
          types: [],
          declaration: true,
          outDir: "out",
        },
        files: ["main.vibe"],
      }),
    );
    const compiled = spawnSync(
      binary,
      ["-p", join(dir, "tsconfig.json"), "--pretty", "false", "--singleThreaded"],
      { encoding: "utf8", timeout: 120_000 },
    );
    assert.equal(compiled.status, 0, compiled.stdout + compiled.stderr);
    await check(await import(pathToFileURL(join(dir, "out/main.js"))), dir);
  } finally {
    rmSync(dir, { force: true, recursive: true });
  }
}

void test("plain GCP helper contracts admit native calls and preserve declaration bytes", async () => {
  const names = ["lastSegment", "normalizeLocation", "sameText", "fieldMask", "rfc1035"];
  const helpers =
    declaration("AppHub/internal.ts", "MAX_NAME_LENGTH") +
    "\n" +
    names.map((name) => "export " + declaration("AppHub/internal.ts", name)).join("\n");
  await fixture(
    `import { ${names.join(",")} } from "./helpers.ts"\nexport const probe = effect (value: string) => ({
    location: normalizeLocation(value, "us-central1"), name: rfc1035(value),
    same: sameText(undefined, ""), mask: fieldMask(["name", false, undefined, "labels"]),
    segment: lastSegment(value),
  })`,
    helpers,
    async (module, dir) => {
      await fc.assert(
        fc.asyncProperty(fc.string({ maxLength: 120 }), async (value) => {
          const result = await Effect.runPromise(module.probe(value));
          assert.equal(result.same, true);
          assert.equal(result.mask, "name,labels");
          assert.ok(result.name.length > 0 && result.name.length <= 63);
          assert.match(result.name, /^[a-z][a-z0-9-]*$/);
          assert.equal(result.location, result.segment.toLowerCase());
        }),
        { numRuns: 128, examples: corpus.identifiers.map((value) => [value]) },
      );
      const emitted = readFileSync(join(dir, "out/helpers.d.ts"), "utf8");
      assert.ok(
        !emitted.includes("@throws"),
        "inline contracts must not alter published declarations",
      );
    },
  );
});

void test("JSON comparison bridges preserve defects and skip unrequested comparisons", async () => {
  const helpers =
    declaration("AnalyticsHub/internal.ts", "canonical") +
    "\nexport " +
    declaration("AnalyticsHub/internal.ts", "sameJson");
  const changed = declaration("AnalyticsHub/DataExchangesListing.vibe", "dataProviderChanged");
  await fixture(
    `import {sameJson} from "./helpers.ts"\nexport const probe = effect (observed: unknown, desired: unknown) => {
    const current = {dataProvider: observed}\nconst news = {dataProvider: desired}\n${changed}\nreturn dataProviderChanged
  }`,
    helpers,
    async (module) => {
      await fc.assert(
        fc.asyncProperty(fc.jsonValue(), async (value) => {
          assert.equal(await Effect.runPromise(module.probe(value, value)), false);
        }),
        { numRuns: 128 },
      );
      const cyclic = {};
      cyclic.self = cyclic;
      assert.equal(await Effect.runPromise(module.probe(cyclic, undefined)), false);
      const exit = await Effect.runPromise(Effect.exit(module.probe(cyclic, {})));
      assert.equal(exit._tag, "Failure");
      assert.equal(
        exit.cause.reasons[0]._tag,
        "Die",
        "recursive comparison failures remain defects",
      );
    },
  );
});

void test("organization discovery runs each parent lookup, including missing and bounded ancestry", async () => {
  for (const [file, name, parent, args, expected] of [
    [
      "AccessContextManager/internal.vibe",
      "tryResolveOrganization",
      "parentOf",
      "",
      "organizations/o",
    ],
    ["NetworkSecurity/operations.vibe", "tryResolveOrganizationId", "parentOf", '"p"', "o"],
    [
      "OrgPolicy/CustomConstraint.vibe",
      "tryResolveOrganization",
      "parentOfResource",
      "",
      "organizations/o",
    ],
  ]) {
    const body = declaration(file, name);
    await fixture(
      `const GcpEnvironment = {current: Effect.succeed({project: "p"})}
      let parents: Record<string,string> = {}; export const setParents = (value: Record<string,string>) => {parents=value}
      const ${parent} = (value: string) => Effect.sync(() => parents[value])
      const lastSegment = (value: string) => value.split("/").at(-1)
      const organizationParent = (value: string) => value
      export ${body}\nexport const probe = effect () => try ${name}(${args})`,
      null,
      async (module) => {
        module.setParents(corpus.ancestry[0]);
        assert.equal(await Effect.runPromise(module.probe()), expected);
        module.setParents(corpus.ancestry[1]);
        assert.equal(await Effect.runPromise(module.probe()), undefined);
        module.setParents(corpus.ancestry[2]);
        assert.equal(await Effect.runPromise(module.probe()), undefined);
      },
    );
  }
});

void test("ScanConfig read runs the request and returns attributes or unowned state", async () => {
  const read = extract(
    "WebSecurityScanner/ScanConfig.vibe",
    (node) => node.type === "Property" && node.key.name === "read",
  );
  await fixture(
    `let stored: {name:string}|undefined
    export const setStored = (value: {name:string}|undefined) => {stored=value}
    const GcpEnvironment = {current: Effect.succeed({project:"p"})}
    const getScanConfig = (_name: string) => Effect.sync(() => stored)
    const lookupNameOf = (_project: string,_olds: unknown,_output: unknown) => "scan"
    const toAttrs = (value: {name:string},project: string) => ({...value,project})
    const Unowned = (value: unknown) => ({unowned:value})
    export const provider = {${read}}`,
    null,
    async (module) => {
      module.setStored(undefined);
      assert.equal(await Effect.runPromise(module.provider.read({})), undefined);
      module.setStored({ name: "scan" });
      assert.deepEqual(
        await Effect.runPromise(module.provider.read({ output: { name: "scan" } })),
        { name: "scan", project: "p" },
      );
      assert.deepEqual(await Effect.runPromise(module.provider.read({})), {
        unowned: { name: "scan", project: "p" },
      });
    },
  );
});

void test("logging collections catch missing resources around the collection Effect", async () => {
  for (const [file, variable, method] of [
    ["Logging/BillingBucketsView.vibe", "views", "listBillingAccountsLocationsBucketsViews"],
    ["Logging/FolderBucketsView.vibe", "listed", "listFoldersLocationsBucketsViews"],
    ["Logging/LocationsBucketsView.vibe", "listed", "listLocationsBucketsViews"],
  ]) {
    const collect = declaration(file, variable);
    await fixture(
      `type BillingBucketsView = {Attributes:{name:string}}
      let failure: string|undefined
      export const setFailure = (value: string|undefined) => {failure=value}
      const logging = {${method}:{pages: (_options: unknown) => failure ? Stream.fail({_tag:failure}) : Stream.make({views:[{name:"view"} as {name:string;description?:string}]})}}
      const bucket = {name:"bucket"}; const bucketName = bucket.name; const billingAccountId="billing"; const DEFAULT_LOCATION="global"
      const lastSegment = (value: string) => value
      const hasOwnershipMarker = (_value: unknown) => true
      const toAttrs = (value: {name:string},..._args: unknown[]) => value
      export const probe = effect () => {${collect}\nreturn ${variable}}`,
      null,
      async (module) => {
        assert.deepEqual(await Effect.runPromise(module.probe()), [{ name: "view" }]);
        module.setFailure("NotFound");
        assert.deepEqual(await Effect.runPromise(module.probe()), []);
        module.setFailure("Forbidden");
        const exit = await Effect.runPromise(Effect.exit(module.probe()));
        assert.equal(exit._tag, "Failure");
      },
    );
  }
});

void test("completed operation fallbacks return values and preserve unrelated failures", async () => {
  for (const file of [
    "AccessContextManager/AccessPolicy.vibe",
    "AccessContextManager/GcpUserAccessBinding.vibe",
    "WorkspaceEvents/Subscription.vibe",
    "ContactCenterInsights/operations.vibe",
  ]) {
    const { text } = source(file);
    const branch = /when \{ _tag: "GCP.OperationFailed" \}: ([\s\S]*?);\s*default:/.exec(text)?.[1];
    assert.ok(branch, file);
    await fixture(
      `export const probe = effect (code: number, notFoundOk = false) => {
      const error = {_tag:"GCP.OperationFailed",code}
      const created = {name:"operation"}; const latest = created; const options = {notFoundOk}
      return ${branch}
    }`,
      null,
      async (module) => {
        assert.deepEqual(await Effect.runPromise(module.probe(6)), { name: "operation" });
        assert.equal((await Effect.runPromise(Effect.exit(module.probe(7))))._tag, "Failure");
        if (file.startsWith("ContactCenterInsights/")) {
          assert.deepEqual(await Effect.runPromise(module.probe(5, true)), { name: "operation" });
          assert.equal(
            (await Effect.runPromise(Effect.exit(module.probe(5, false))))._tag,
            "Failure",
          );
        }
      },
    );
  }
});

void test("model cleanup waits for versions and deletes the default version last", async () => {
  const cleanup = declaration("ML/Model.vibe", "deleteVersions");
  await fixture(
    `let deleted: string[] = []
    export const names = () => deleted
    const listVersions = (_parent: string) => Effect.succeed([
      {name:"default",isDefault:true},{name:"version",isDefault:false},{name:"missing",isDefault:false}
    ])
    const ml = {deleteProjectsModelsVersions: (value: {name:string}) => Effect.succeed(value)}
    const waitForOperation = (value: {name:string}, _options: unknown) =>
      value.name === "missing" ? Effect.fail({_tag:"NotFound"}) : Effect.sync(() => {deleted.push(value.name)})
    ${cleanup}\nexport const probe = effect () => try deleteVersions("models/model")`,
    null,
    async (module) => {
      await Effect.runPromise(module.probe());
      assert.deepEqual(module.names(), ["version", "default"]);
    },
  );
});

void test("product identifiers and bootstrap callbacks have nonthrowing foreign contracts", async () => {
  const helpers =
    declaration("Retail/internal.ts", "MAX_PRODUCT_ID_LENGTH") +
    "\nexport " +
    declaration("Retail/internal.ts", "productIdOf") +
    "\nexport " +
    declaration("HostRuntime.ts", "makeGcpBootstrap");
  await fixture(
    `import {productIdOf,makeGcpBootstrap} from "./helpers.ts"
    const useCallback = (_callback: (name: string) => string) => Effect.void
    export const probe = effect (name: string) => {
      try useCallback(productIdOf)
      const bootstrap = makeGcpBootstrap("CloudRun","handler")
      try useCallback(bootstrap)
      return {id:productIdOf(name), bootstrap:bootstrap(name)}
    }`,
    helpers,
    async (module) => {
      await fc.assert(
        fc.asyncProperty(fc.string({ maxLength: 128 }), async (value) => {
          const result = await Effect.runPromise(module.probe(value));
          assert.match(result.id, /^[a-z][a-z0-9_-]*$/);
          assert.ok(result.bootstrap.includes(JSON.stringify(value)));
          assert.ok(result.bootstrap.includes("handler: entrypoint"));
        }),
        { numRuns: 128 },
      );
    },
  );
});
