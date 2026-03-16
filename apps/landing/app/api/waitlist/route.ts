import { NextResponse } from "next/server";
import { Pool } from "pg";
import { sendWelcomeEmail } from "@/lib/email/sendWelcomeEmail";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    try {
      await pool.query("INSERT INTO waitlist (email) VALUES ($1)", [email]);
    } catch (error: any) {
      // 🚨 email duplicado (PostgreSQL)
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "Ya estás en la lista de espera 😉" },
          { status: 200 },
        );
      }

      throw error;
    }

    // 🚀 envío de email NO bloqueante
    sendWelcomeEmail(email).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 },
    );
  }
}
