import * as Provider from "alchemy/Provider";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { Assets } from "../Assets.ts";
import { MicrovmImage } from "./MicrovmImage.vibe";
export declare const MicrovmImageProvider: () => import("effect/Layer").Layer<Provider.Provider<MicrovmImage>, never, Assets | FileSystem.FileSystem | Path.Path | import("alchemy").Stack | import("alchemy").Stage | import("../Assets.ts").AssetsRequirements>;
