/** A fresh owner id for the DSQL migration lock row. */
export const newLockOwner = (): string => crypto.randomUUID();
