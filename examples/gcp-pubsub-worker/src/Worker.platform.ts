import { createHash } from "node:crypto";
import * as Effect from "effect/Effect";
import type { JobMessage, JobResult } from "./resources.ts";

export const decode = (data: string | undefined) =>
  Effect.try(() => JSON.parse(Buffer.from(data ?? "", "base64").toString("utf8")) as JobMessage);

/** The "work": hash and count the payload. */
export const runJob = (job: JobMessage) =>
  Effect.sync((): JobResult => ({
    status: "done",
    sha256: createHash("sha256").update(job.payload, "utf8").digest("hex"),
    words: job.payload.split(/\s+/).filter(Boolean).length,
    chars: job.payload.length,
    submittedAt: job.submittedAt,
    completedAt: new Date().toISOString(),
  }));
