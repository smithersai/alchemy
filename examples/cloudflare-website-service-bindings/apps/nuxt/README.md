# Nuxt service-binding app

`nuxt.config.ts` imports `defineNuxtConfig` from `nuxt/config` explicitly, so
the config can be type checked before Nuxt generates its auto-import globals.
