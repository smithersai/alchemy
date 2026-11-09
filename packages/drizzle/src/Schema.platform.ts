import * as crypto from "node:crypto";

// Host access for Schema.vibe: hashing, the working directory and the
// `process.exit` trap that drizzle-kit calls go through.
export const sha = (s: string) => crypto.createHash("sha256").update(s).digest("hex");

export const cwd = () => process.cwd();

export const installExitTrap = () => {
  // oxlint-disable-next-line typescript/unbound-method -- saved only to restore `process.exit` verbatim, never called unbound
  const trap = { exit: process.exit, exited: false };
  process.exit = () => {
    trap.exited = true;
    throw new Error("drizzle-kit exited");
  };
  return trap;
};

export const restoreExit = (trap: { readonly exit: typeof process.exit }) => {
  process.exit = trap.exit;
};
