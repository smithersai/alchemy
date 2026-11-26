# monorepo-single-stack

Build the backend before checking or bundling the frontend:

```sh
pnpm -C backend build
pnpm -C frontend build
```

The backend uses `vibelang -b` because the client depends on `.vibe` modules.
It emits both JavaScript and declarations into `backend/lib`; stock `tsc`
does not emit those native modules.
