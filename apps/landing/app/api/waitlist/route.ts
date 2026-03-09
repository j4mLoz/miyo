import { NextResponse } from "next/server";
import { Pool } from "pg";
import { Resend } from "resend";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// cliente de Resend para enviar correos
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // obtenemos el email enviado desde el formulario
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // guardamos el email en la base de datos // PRISMA
    await pool.query("INSERT INTO waitlist (email) VALUES ($1)", [email]);

    await resend.emails.send({
      from: "MIYO <onboarding@resend.dev>",
      to: email,

      subject: "Bienvenido a la lista de espera de MIYO 💸",

      html: `
        <h2>Hola 👋</h2>

        <p>Gracias por unirte a la lista de espera de <strong>MIYO</strong>.</p>

        <p>Estamos construyendo una nueva forma de entender y mejorar tus finanzas.</p>

        <p>Te avisaremos cuando la app esté disponible.</p>

        <br/>

        <p>— Equipo MIYO</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 },
    );
  }
}
