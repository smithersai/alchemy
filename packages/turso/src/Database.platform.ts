/** Working directory of the host process; deploy-time SQL paths resolve from it. */
export function currentWorkingDirectory(): string {
  return process.cwd();
}
