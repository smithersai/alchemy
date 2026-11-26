export function currentWorkingDirectory() {
  return process.cwd();
}

export function encodeText(text: string) {
  return new TextEncoder().encode(text);
}
