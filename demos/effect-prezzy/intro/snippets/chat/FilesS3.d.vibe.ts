import * as AWS from "@alchemy.run/aws";
import * as Layer from "effect/Layer";
import { Files } from "./Files.js";
export declare const FilesS3: Layer.Layer<Files, never, AWS.Providers>;
