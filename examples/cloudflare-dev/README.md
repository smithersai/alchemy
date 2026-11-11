# Cloudflare development example

The async and Effect Workers exercise local bindings, including Cloudflare’s
default Cache API. The local `CacheStorage.default` declaration supplements
the standard named-cache methods when browser and Worker types are both loaded.

Run the generated cache-type consumers from this directory:

```sh
node --test test/cache-types.test.mjs
```

The integration suite in `test/integ.test.ts` exercises deployed and local
bindings. It requires the configured Cloudflare test profile.
