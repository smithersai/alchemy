# Cloudflare Git Artifacts

The API binds `Repos` through `Cloudflare.Artifacts.ReadWriteNamespace` and
provides `ReadWriteNamespaceBinding` on the Worker. `Namespace` is a binding
marker; the access service supplies the runtime create, list, get and delete
operations.

The HTTP routes use `alchemy/Http.Platform` and run `HttpRouter.toHttpEffect`
during initialization. Error schemas use `Schema.TaggedError`, preserving
their failure tags and fields over JSON.
