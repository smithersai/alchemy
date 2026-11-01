import * as emr from "@distilled.cloud/aws/emr";
import * as Layer from "effect/Layer";
import { AddInstanceFleet } from "./AddInstanceFleet.vibe";
import { makeEmrClusterHttpBinding } from "./BindingHttp.ts";

export const AddInstanceFleetHttp = Layer.effect(
  AddInstanceFleet,
  makeEmrClusterHttpBinding({
    tag: "AWS.EMR.AddInstanceFleet",
    operation: emr.addInstanceFleet,
    actions: ["elasticmapreduce:AddInstanceFleet"],
  }),
);
