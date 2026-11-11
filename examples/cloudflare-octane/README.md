# Octane on Cloudflare

The visits request decodes its JSON response before updating the component.
A response needs a numeric or `null` `visits` field. Invalid data follows the
existing request-failure path and displays the unavailable-count message.

`src/vite-env.d.ts` supplies Vite’s CSS import declarations for type checking.
