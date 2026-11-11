import { matchesAlchemyPhysicalName as matches } from "./Metadata.vibe";

/** @throws {never} */
export function matchesAlchemyPhysicalName(name: string | undefined): boolean {
  return matches(name);
}
