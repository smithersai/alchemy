import * as microvms from "@distilled.cloud/aws/lambda-microvms";
import { CreateAuthToken } from "./CreateAuthToken.vibe";
import { makeImageBinding } from "./MicrovmBinding.vibe";

export const CreateAuthTokenHttp = makeImageBinding({
  binding: CreateAuthToken,
  name: "CreateAuthToken",
  actions: ["lambda:CreateMicrovmAuthToken"],
  operation: microvms.createMicrovmAuthToken,
  scope: "microvm",
});
