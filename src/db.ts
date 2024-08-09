import { Database } from "bun:sqlite";

const dbPath = Bun.env.DB_PATH ?? "./db/main.sqlite";

const db = new Database(dbPath, {
  create: true,
  strict: true,
});

db.exec("PRAGMA journal_mode = WAL;");

// Migration
db.query(
  `CREATE TABLE IF NOT EXISTS counters
   (
     id      integer PRIMARY KEY,
     referer text    NOT NULL UNIQUE,
     count   integer NOT NULL DEFAULT 0
   )`,
).run();

const incrementCount = db.query<unknown, string>(
  `INSERT INTO counters (referer, count)
   VALUES (?, 1)
   ON CONFLICT (referer) DO UPDATE SET count = count + 1;`,
);

export const incrementCountTransaction = db.transaction((referer) => {
  incrementCount.run(referer);
});

export const getCount = db.query<{ count: number }, string>(
  `SELECT count FROM counters WHERE referer = ?1`,
);
