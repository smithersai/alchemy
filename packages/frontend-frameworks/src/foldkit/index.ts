/** Foldkit builds and native development, with platform-specific deployment targets. */
export * from "./Foldkit.vibe";
import { layer, type FoldkitOptions } from "./Foldkit.vibe";
export default (options?: { readonly foldkit?: FoldkitOptions }) => layer(options?.foldkit);
