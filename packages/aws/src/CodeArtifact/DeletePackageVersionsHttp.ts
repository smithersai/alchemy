import * as codeartifact from "@distilled.cloud/aws/codeartifact";
import * as Layer from "effect/Layer";
import { makeRepositoryHttpBinding, packageArns } from "./BindingHttp.vibe";
import { DeletePackageVersions } from "./DeletePackageVersions.vibe";

/** HTTP implementation of {@link DeletePackageVersions} over the CodeArtifact API. */
export const DeletePackageVersionsHttp = Layer.effect(
  DeletePackageVersions,
  makeRepositoryHttpBinding({
    tag: "AWS.CodeArtifact.DeletePackageVersions",
    operation: codeartifact.deletePackageVersions,
    actions: ["codeartifact:DeletePackageVersions"],
    resources: packageArns,
  }),
);
