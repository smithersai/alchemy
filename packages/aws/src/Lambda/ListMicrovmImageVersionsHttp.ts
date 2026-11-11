import * as microvms from "@distilled.cloud/aws/lambda-microvms";
import { ListMicrovmImageVersions } from "./ListMicrovmImageVersions.vibe";
import { makeImageBinding } from "./MicrovmBinding.vibe";

export const ListMicrovmImageVersionsHttp = makeImageBinding({
  binding: ListMicrovmImageVersions,
  name: "ListMicrovmImageVersions",
  actions: ["lambda:ListMicrovmImageVersions"],
  operation: microvms.listMicrovmImageVersions,
  scope: "image",
  injectImageIdentifier: true,
});
