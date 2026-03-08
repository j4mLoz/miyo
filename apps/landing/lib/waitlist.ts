import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getWaitlistCount() {
  const result = await pool.query("SELECT COUNT(*) FROM waitlist");

  return Number(result.rows[0].count);
}
