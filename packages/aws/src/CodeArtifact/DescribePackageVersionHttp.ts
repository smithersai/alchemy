import * as codeartifact from "@distilled.cloud/aws/codeartifact";
import * as Layer from "effect/Layer";
import { makeRepositoryHttpBinding, packageArns } from "./BindingHttp.vibe";
import { DescribePackageVersion } from "./DescribePackageVersion.vibe";

/** HTTP implementation of {@link DescribePackageVersion} over the CodeArtifact API. */
export const DescribePackageVersionHttp = Layer.effect(
  DescribePackageVersion,
  makeRepositoryHttpBinding({
    tag: "AWS.CodeArtifact.DescribePackageVersion",
    operation: codeartifact.describePackageVersion,
    actions: ["codeartifact:DescribePackageVersion"],
    resources: packageArns,
  }),
);
