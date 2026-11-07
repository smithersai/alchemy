import * as Drizzle from "@alchemy.run/drizzle";
import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
export declare const database: Effect.Effect<{
    instance: GCP.SQL.Instance;
    db: GCP.SQL.Database;
    user: GCP.SQL.User;
    password: Alchemy.Random;
    passwordSecret: GCP.SecretManager.LocationsSecret;
    schema: Drizzle.Schema;
}, never, Alchemy.Provider<Alchemy.Random> | Drizzle.Providers | GCP.Providers>;
