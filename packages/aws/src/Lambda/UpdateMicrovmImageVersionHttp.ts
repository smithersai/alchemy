import * as microvms from "@distilled.cloud/aws/lambda-microvms";
import { makeImageBinding } from "./MicrovmBinding.vibe";
import { UpdateMicrovmImageVersion } from "./UpdateMicrovmImageVersion.vibe";

export const UpdateMicrovmImageVersionHttp = makeImageBinding({
  binding: UpdateMicrovmImageVersion,
  name: "UpdateMicrovmImageVersion",
  actions: ["lambda:UpdateMicrovmImageVersion"],
  operation: microvms.updateMicrovmImageVersion,
  scope: "image",
  injectImageIdentifier: true,
});
