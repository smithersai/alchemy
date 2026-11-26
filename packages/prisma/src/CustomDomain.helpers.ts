import { isConflict as clientIsConflict, isNotFound as clientIsNotFound } from "./Client.ts";

/** @throws {never} */
export function isNotFound(error: unknown): boolean {
  return clientIsNotFound(error);
}

/** @throws {never} */
export function isConflict(error: unknown): boolean {
  return clientIsConflict(error);
}
