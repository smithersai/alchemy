import * as microvms from "@distilled.cloud/aws/lambda-microvms";
import { ListMicrovms } from "./ListMicrovms.vibe";
import { makeImageBinding } from "./MicrovmBinding.ts";

export const ListMicrovmsHttp = makeImageBinding({
  binding: ListMicrovms,
  name: "ListMicrovms",
  actions: ["lambda:ListMicrovms"],
  operation: microvms.listMicrovms,
  scope: "account",
  injectImageIdentifier: true,
});
