import * as microvms from "@distilled.cloud/aws/lambda-microvms";
import { ListManagedMicrovmImageVersions } from "./ListManagedMicrovmImageVersions.vibe";
import { makeAccountBinding } from "./MicrovmBinding.vibe";

export const ListManagedMicrovmImageVersionsHttp = makeAccountBinding({
  binding: ListManagedMicrovmImageVersions,
  name: "ListManagedMicrovmImageVersions",
  actions: ["lambda:ListManagedMicrovmImageVersions"],
  operation: microvms.listManagedMicrovmImageVersions,
});
