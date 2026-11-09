import { matchesAlchemyPhysicalName as matches } from "./Metadata.ts";

/** @throws {never} */
export function matchesAlchemyPhysicalName(name: string | undefined): boolean { return matches(name); }
