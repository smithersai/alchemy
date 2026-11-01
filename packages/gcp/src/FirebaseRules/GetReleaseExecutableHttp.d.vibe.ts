import * as Layer from "effect/Layer";
import { GetReleaseExecutable } from "./GetReleaseExecutable.js";
/**
 * HTTP implementation of {@link GetReleaseExecutable}.
 *
 * Grants `roles/firebaserules.admin` on the project because it is the
 * narrowest predefined role containing `firebaserules.releases.getExecutable`, and Firebase
 * Rules has no resource-level IAM.
 *
 * @layer
 * @provides GCP.FirebaseRules.GetReleaseExecutable
 */
export declare const GetReleaseExecutableHttp: Layer.Layer<GetReleaseExecutable, never, never>;
