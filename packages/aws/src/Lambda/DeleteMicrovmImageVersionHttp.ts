import * as microvms from "@distilled.cloud/aws/lambda-microvms";
import { DeleteMicrovmImageVersion } from "./DeleteMicrovmImageVersion.vibe";
import { makeImageBinding } from "./MicrovmBinding.ts";

export const DeleteMicrovmImageVersionHttp = makeImageBinding({
  binding: DeleteMicrovmImageVersion,
  name: "DeleteMicrovmImageVersion",
  actions: ["lambda:DeleteMicrovmImageVersion"],
  operation: microvms.deleteMicrovmImageVersion,
  scope: "image",
  injectImageIdentifier: true,
});
