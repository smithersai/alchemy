/** Cloudflare exposes a default cache in addition to the standard Cache API. */
interface CacheStorage {
  readonly default: Cache;
}
