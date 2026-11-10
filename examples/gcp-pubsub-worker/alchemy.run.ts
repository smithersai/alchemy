import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
import Api from "./src/Api.vibe";
import { Jobs, Results } from "./src/resources.ts";
import Worker from "./src/Worker.vibe";

export default Alchemy.Stack(
  "GcpPubSubWorkerExample",
  { providers: GCP.providers(), state: Alchemy.localState() },
  Effect.gen(function* () {
    const jobs = yield* Jobs;
    const results = yield* Results;
    const api = yield* Api;
    const worker = yield* Worker;

    return {
      url: api.uri,
      topicName: jobs.name,
      databaseName: results.name,
      workerPoolName: worker.name,
    };
  }),
);
