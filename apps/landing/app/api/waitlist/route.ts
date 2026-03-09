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
    // expresión regular para validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // si el email no cumple el formato
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // comprobar si el email ya existe
    const existingUser = await pool.query(
      "SELECT id FROM waitlist WHERE email = $1",
      [email],
    );

    // si ya existe devolvemos conflicto
    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        {
          error: "Este correo ya está registrado en la lista de espera",
        },
        { status: 409 },
      );
    }
    // guardamos el email en la base de datos // PRISMA
    await pool.query("INSERT INTO waitlist (email) VALUES ($1)", [email]);

    await resend.emails.send({
      from: "MIYO <onboarding@resend.dev>",
      to: email,

      subject: "Bienvenido a la lista de espera de MIYO 💸",

      html: `
        <h2>Bienvenido a MIYO 💸</h2>

<p>Hola 👋</p>

<p>
Gracias por unirte a la lista de espera de <strong>MIYO</strong>.
</p>

<p>
Estamos construyendo una nueva forma de entender tus finanzas:
más clara, más tranquila y sin el ruido de las apps tradicionales.
</p>

<p>
Cuando MIYO esté listo, serás de los primeros en saberlo.
</p>

<p>
Mientras tanto, seguimos trabajando para que tu dinero
se sienta un poco más bajo control.
</p>

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
