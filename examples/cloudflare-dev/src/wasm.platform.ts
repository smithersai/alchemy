import * as Effect from "effect/Effect";

interface AddInstance {
  exports: {
    add(a: number, b: number): number;
  };
}

/** Instantiates the example WASM module, which exports `add`. */
export const instantiateWasmExample = () =>
  Effect.promise(async () => {
    // This is dynamically imported so that the WASM import doesn't occur at deploy-time, which works in Bun but fails in Node.
    const wasm = await import("./modules/wasm-example.wasm");
    return (await WebAssembly.instantiate(wasm.default)) as AddInstance;
  });
