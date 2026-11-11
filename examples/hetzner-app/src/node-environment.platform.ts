/** Read a Node environment value at the call site. @throws {never} */
export function readNodeEnvironment<K extends keyof NodeJS.ProcessEnv & string>(
  name: K,
): NodeJS.ProcessEnv[K] {
  return process.env[name];
}
