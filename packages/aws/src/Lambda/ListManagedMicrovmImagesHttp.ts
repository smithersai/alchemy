import * as microvms from "@distilled.cloud/aws/lambda-microvms";
import { ListManagedMicrovmImages } from "./ListManagedMicrovmImages.vibe";
import { makeAccountBinding } from "./MicrovmBinding.ts";

export const ListManagedMicrovmImagesHttp = makeAccountBinding({
  binding: ListManagedMicrovmImages,
  name: "ListManagedMicrovmImages",
  actions: ["lambda:ListManagedMicrovmImages"],
  operation: microvms.listManagedMicrovmImages,
});
