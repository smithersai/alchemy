type Dispatch = (options: Record<string, unknown>, handler: unknown) => boolean;
interface Dispatcher {
  compose(interceptor: (dispatch: Dispatch) => Dispatch): Dispatcher;
}

/**
 * Node 26 bundles undici 8, whose `fetch` negotiates HTTP/2 by default and
 * funnels every concurrent request onto one session — which undici's
 * HTTP/2 path has been resetting under load. Wrap Node's own global
 * dispatcher (the npm `undici` package would mismatch the bundled major)
 * so each request carries `allowH2: false`. `undefined` on Bun, on older
 * Node, or if the slot can't be found — plain `fetch` as before.
 */
/** @throws {never} */
export const resolveHttp1Dispatcher = async () => {
  if ("Bun" in globalThis || Number.parseInt(process.versions.undici ?? "0", 10) < 8) return;
  const slot = Symbol.for("undici.globalDispatcher.2");
  const lookup = () => (globalThis as Record<symbol, Dispatcher | undefined>)[slot];
  let base = lookup();
  if (base === undefined) {
    // undici creates the dispatcher lazily on first fetch; `data:` never hits the network.
    await fetch("data:,").catch(() => {});
    base = lookup();
  }
  return base?.compose(
    (dispatch) => (options, handler) => dispatch({ ...options, allowH2: false }, handler),
  );
};
