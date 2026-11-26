import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
import Monitor from "./src/Monitor.vibe";
import { Heartbeats } from "./src/resources.vibe";

export default Alchemy.Stack(
  "GcpCronExample",
  { providers: GCP.providers(), state: Alchemy.localState() },
  Effect.gen(function* () {
    const table = yield* Heartbeats;
    const monitor = yield* Monitor;

    return {
      url: monitor.uri,
      project: monitor.project,
      location: monitor.location,
      tableName: table.name,
      datasetId: table.datasetId,
      tableId: table.tableId,
    };
  }),
);
