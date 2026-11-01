import type { Database } from "@alchemy.run/cloudflare/D1";
import * as Layer from "effect/Layer";
import { RegistryStore } from "./RegistryObject.js";
/**
 * The repo index on D1. The database must already exist; the table is
 * created idempotently on first use from the same DDL the Durable Object
 * applies, so the two backends stay schema-identical.
 */
export declare const RegistryD1: (database: Database) => Layer.Layer<RegistryStore>;
