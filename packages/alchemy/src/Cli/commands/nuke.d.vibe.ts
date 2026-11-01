import { Command } from "effect/cli";
import * as Alchemist from "../../Alchemist/index.js";
import * as Interaction from "../../Interaction.js";
import { UserInputError } from "./errors.js";
export declare const unsafeCommand: Command.Command<"unsafe", {} | {}, {}, import("effect/Config").ConfigError | import("effect/PlatformError").PlatformError | Alchemist.StackEntrypointError | UserInputError | Interaction.InteractionError, import("../../AlchemyContext.js").AlchemyContext | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("../../Auth/Credentials.js").CredentialsStore | import("effect/crypto/Digest").Digest | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | Interaction.Interaction | import("effect/Path").Path | import("../../Auth/Profile.js").ProfileStore | import("effect/Scope").Scope | import("effect/crypto/SecureRandom").SecureRandom>;
