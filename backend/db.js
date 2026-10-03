const knex = require("knex");

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function connectDb() {
  try {
    console.log("Connecting to the database...");
    await db.raw("select 1");
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = { db, connectDb };
