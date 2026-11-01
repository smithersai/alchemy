import * as Command from "effect/cli/Command";
import * as Option from "effect/Option";
import * as Interaction from "../../Interaction.js";
import { Cli } from "../../Report.js";
export declare const driftCommand: Command.Command<"drift", {
    readonly repair: boolean;
    readonly main: string;
    readonly envFile: Option.Option<string>;
    readonly stage: string | undefined;
    readonly profile: string | undefined;
}, {}, any, import("../../AlchemyContext.js").AlchemyContext | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | Cli | import("../../Auth/Credentials.js").CredentialsStore | import("effect/crypto/Digest").Digest | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | Interaction.Interaction | import("effect/Path").Path | import("../../Auth/Profile.js").ProfileStore | import("effect/Scope").Scope | import("effect/crypto/SecureRandom").SecureRandom>;
