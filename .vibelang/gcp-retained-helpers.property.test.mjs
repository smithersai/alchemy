import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";
const fc = createRequire(new URL("../scripts/package.json", import.meta.url))("fast-check");
const keys = await import("../packages/gcp/lib/OSLogin/internal.js");
const { resourceNameFromOperation } = await import("../packages/gcp/lib/Retail/operations.js");
void test("SSH key parsing preserves key material through formatting and comment changes", () => {
  fc.assert(
    fc.property(
      fc.constantFrom("ssh-ed25519", "ssh-rsa", "ecdsa-sha2-nistp256"),
      fc.stringMatching(/^[A-Za-z0-9+/]{1,80}={0,2}$/),
      fc.stringMatching(/^[a-z0-9 -]{0,30}$/),
      fc.stringMatching(/^[a-z0-9 -]{0,30}$/),
      (type, blob, comment, otherComment) => {
        const source = type + " " + blob + " " + comment;
        const parsed = keys.parseSshKey(source);
        assert.equal(parsed.type, type);
        assert.equal(parsed.blob, blob);
        assert.deepEqual(keys.parseSshKey(keys.formatSshKey(parsed)), parsed);
        assert.ok(keys.sameKeyMaterial(source, type + " " + blob + " " + otherComment));
        assert.equal(keys.keyIdentity(source), type + " " + blob);
      },
    ),
    { seed: 33125, numRuns: 128 },
  );
});
void test("OS Login user and resource names preserve their normalized identity", () => {
  fc.assert(
    fc.property(
      fc.stringMatching(/^[a-z0-9]{1,20}$/),
      fc.stringMatching(/^[a-z0-9]{1,20}$/),
      (user, fingerprint) => {
        assert.equal(keys.normalizeUser("users/" + user), user);
        assert.equal(keys.toUserParent(user), "users/" + user);
        assert.equal(keys.toUserParent("users/" + user), "users/" + user);
        const name = keys.resourceName(user, fingerprint);
        assert.equal(keys.userOf(name), user);
        assert.equal(keys.fingerprintOf(name), fingerprint);
      },
    ),
    { seed: 33126, numRuns: 128 },
  );
});
void test("Retail operation names prefer a response over metadata fallbacks", () => {
  const name = fc.option(fc.stringMatching(/^[a-z0-9/]{1,20}$/), { nil: undefined });
  fc.assert(
    fc.property(name, name, name, (response, target, metadata) => {
      const operation = { response: { name: response }, metadata: { target, name: metadata } };
      assert.equal(resourceNameFromOperation(operation), response ?? target ?? metadata);
      assert.equal(resourceNameFromOperation({ response: 7, metadata: null }), undefined);
    }),
    { seed: 33127, numRuns: 128 },
  );
});
