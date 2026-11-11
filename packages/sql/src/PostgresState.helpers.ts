export function importPgClient() {
  return import("@effect/sql-pg/PgClient").catch((cause) => {
    throw new Error(
      "Failed to load '@effect/sql-pg'. Install the optional peer dependency '@effect/sql-pg' to use postgresState with a `url`.",
      { cause },
    );
  });
}
