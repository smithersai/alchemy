import * as Provider from "alchemy/Provider";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { Assets } from "../Assets.js";
import { MicrovmImage } from "./MicrovmImage.js";
export declare const MicrovmImageProvider: () => import("effect/Layer").Layer<Provider.Provider<MicrovmImage>, never, Assets | FileSystem.FileSystem | Path.Path | import("alchemy").Stack | import("alchemy").Stage | import("../Assets.js").AssetsRequirements>;
