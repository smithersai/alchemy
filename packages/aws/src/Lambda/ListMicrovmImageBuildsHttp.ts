import * as microvms from "@distilled.cloud/aws/lambda-microvms";
import { ListMicrovmImageBuilds } from "./ListMicrovmImageBuilds.vibe";
import { makeImageBinding } from "./MicrovmBinding.vibe";

export const ListMicrovmImageBuildsHttp = makeImageBinding({
  binding: ListMicrovmImageBuilds,
  name: "ListMicrovmImageBuilds",
  actions: ["lambda:ListMicrovmImageBuilds"],
  operation: microvms.listMicrovmImageBuilds,
  scope: "image",
  injectImageIdentifier: true,
});
