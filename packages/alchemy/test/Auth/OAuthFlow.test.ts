import { createHash } from "node:crypto";
import { expect, it } from "@alchemy.run/test";
import * as Digest from "effect/crypto/Digest";
import * as SecureRandom from "effect/crypto/SecureRandom";
import * as Effect from "effect/Effect";
import { makeOAuthClient } from "@/Auth/OAuthFlow.ts";
import { PlatformServices } from "@/Util/PlatformServices.ts";

const client = makeOAuthClient({
  clientId: "client",
  auth: { kind: "pkce" },
  endpoints: {
    authorize: "https://auth.example/authorize",
    token: "https://auth.example/token",
  },
  redirectUri: "http://127.0.0.1:9/callback",
  localCallbackUri: "http://127.0.0.1:9/callback",
});

// effect 4.1 removed effect/Crypto and dropped crypto from NodeServices and
// BunServices; PlatformServices must provide SecureRandom and Digest itself.
it.effect(
  "PlatformServices provides the crypto services the PKCE flow needs",
  () =>
    Effect.gen(function* () {
      const authorization = yield* client.authorize(["read"]);
      const url = new URL(authorization.url);
      expect(url.searchParams.get("state")).toBe(authorization.state);
      expect(url.searchParams.get("code_challenge_method")).toBe("S256");
      expect(authorization.verifier).toMatch(/^[A-Za-z0-9_-]{128}$/);
      expect(url.searchParams.get("code_challenge")).toBe(
        createHash("sha256").update(authorization.verifier!).digest("base64url"),
      );
    }).pipe(Effect.provide(PlatformServices)),
  { tags: ["unit", "local"] },
);

it.effect(
  "authorize draws state and verifier from SecureRandom",
  () =>
    Effect.gen(function* () {
      const authorization = yield* client.authorize();
      expect(authorization.state).toBe("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      expect(authorization.verifier).toBe("A".repeat(128));
    }).pipe(
      Effect.provideService(
        SecureRandom.SecureRandom,
        SecureRandom.make((size) => new Uint8Array(size)),
      ),
      Effect.provide(Digest.layerWebCrypto),
    ),
  { tags: ["unit", "local"] },
);
