// Written by `npx vibelang agents init`; rerun it to update.
// After opencode edits a .vibe file, applies `vibelang --fix` to its project and
// appends the diagnostics left to the tool's result, which the agent reads.
import { execFile } from "node:child_process"

const command = ["npx","--no","--","vibelang","agents","check"]
const patchFiles = (patch) =>
  [...patch.matchAll(/^\*\*\* (?:Add File|Update File|Move to): (.+)$/gm)].map((match) => match[1].trim())

export const VibeLang = async ({ directory }) => ({
  "tool.execute.after": async (input, output) => {
    if (!["edit", "write", "multiedit", "apply_patch", "patch"].includes(input.tool)) return
    const args = input.args ?? {}
    const files = [args.filePath, ...(typeof args.patchText === "string" ? patchFiles(args.patchText) : [])]
      .filter((file) => typeof file === "string" && file.endsWith(".vibe"))
    if (files.length === 0) return
    const report = await new Promise((done) =>
      execFile(command[0], [...command.slice(1), ...files], { cwd: directory, maxBuffer: 1 << 24 }, (_, stdout, stderr) =>
        done(`${stdout ?? ""}${stderr ?? ""}`.trim())))
    if (report) output.output = `${output.output}\n\n${report}`
  },
})
