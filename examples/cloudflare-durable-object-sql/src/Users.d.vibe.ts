import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
declare const Users_base: Effect.Effect<Cloudflare.DurableObject<Users>, never, Cloudflare.Worker> & (new (_: never) => {
    addUser: (name: string) => Omit<import("drizzle-orm/sqlite-core/effect/insert").SQLiteEffectInsertBase<import("drizzle-orm/sqlite-core").SQLiteTable<{
        name: "users";
        schema: undefined;
        columns: {
            id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
                name: string;
                tableName: "users";
                dataType: "number int53";
                data: number;
                driverParam: number;
                notNull: true;
                hasDefault: true;
                isPrimaryKey: true;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: undefined;
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}>;
            name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
                name: string;
                tableName: "users";
                dataType: "string";
                data: string;
                driverParam: string;
                notNull: true;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}>;
        };
        dialect: 'sqlite';
        isAlias: false;
    }> & {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: string;
            tableName: "users";
            dataType: "number int53";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}>;
        name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}>;
    } & import("drizzle-orm").InferTableColumnsModels<{
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: string;
            tableName: "users";
            dataType: "number int53";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}>;
        name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}>;
    }>, [], {
        id: number;
        name: string;
    }, false, false, "returning", import("drizzle-orm/effect-sqlite-do").EffectSQLiteDoQueryEffectHKT>, "returning">;
    listUsers: () => Omit<import("drizzle-orm/sqlite-core/effect/select").SQLiteEffectSelectBase<"users", [], {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: string;
            tableName: "users";
            dataType: "number int53";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}>;
        name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}>;
    }, "single", Record<"users", "not-null">, false, "orderBy", {
        id: number;
        name: string;
    }[], {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: string;
            tableName: "users";
            dataType: "number int53";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}>;
        name: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}>;
    }, import("drizzle-orm/effect-sqlite-do").EffectSQLiteDoQueryEffectHKT>, "orderBy">;
});
export default class Users extends Users_base {
}
export {};
