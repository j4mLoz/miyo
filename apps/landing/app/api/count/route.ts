import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM waitlist");

    return NextResponse.json({
      count: Number(result.rows[0].count),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error obteniendo contador" },
      { status: 500 },
    );
  }
}
