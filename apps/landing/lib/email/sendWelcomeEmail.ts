import { Resend } from "resend";
import { welcomeTemplate } from "./templates/welcomeTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string) {
  const { subject, html } = welcomeTemplate(email);

  try {
    await resend.emails.send({
      from: "MIYO <hello@financemiyo.com>", // temporal
      to: email,
      subject,
      html,
    });

    console.log("✅ Email enviado a:", email);
  } catch (error) {
    console.error("❌ Error enviando email:", error);
  }
}
