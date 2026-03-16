export const welcomeTemplate = (email: string) => {
  return {
    subject: "Estás dentro de MIYO",
    html: `
      <div style="margin:0;padding:0;background:#f7f9fc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          
          <!-- HEADER -->
          <tr>
            <td style="padding:32px 32px 0 32px;text-align:left;">
              <h2 style="margin:0;color:#2D7F7A;font-size:16px;font-weight:600;letter-spacing:0.5px;">
                MIYO
              </h2>
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td style="padding:24px 32px 0 32px;">
              
              <!-- Accent line -->
              <div style="
                width:32px;
                height:3px;
                background:#2D7F7A;
                border-radius:2px;
                margin-bottom:16px;
              "></div>

              <h1 style="
                margin:0;
                font-size:24px;
                line-height:1.3;
                font-weight:600;
                letter-spacing:-0.2px;
                color:#111827;
              ">
                Ya estás dentro
              </h1>

              <p style="
                margin:8px 0 0 0;
                font-size:14px;
                color:#6b7280;
                letter-spacing:0.2px;
              ">
                Bienvenido a MIYO
              </p>

            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:20px 32px;">
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">
                Gracias por unirte a MIYO.
              </p>

              <p style="margin:16px 0 0 0;color:#374151;font-size:15px;line-height:1.6;">
                Estamos construyendo una forma más clara y sencilla de entender tu dinero.
              </p>

              <p style="margin:16px 0 0 0;color:#374151;font-size:15px;line-height:1.6;">
                Aún no está abierto al público, pero ya formas parte de las primeras personas en acceder.
              </p>

              <p style="margin:16px 0 0 0;color:#374151;font-size:15px;line-height:1.6;">
                Te avisaremos en cuanto esté listo.
              </p>
            </td>
          </tr>

          <!-- CALLOUT -->
          <tr>
            <td style="padding:0 32px 24px 32px;">
              <div style="
                background:#f3f4f6;
                border-radius:8px;
                padding:14px;
                font-size:13px;
                color:#4b5563;
                line-height:1.5;
              ">
                Estás dentro antes que la mayoría.
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <p style="margin:0;font-size:13px;color:#9ca3af;">
                — Equipo MIYO
              </p>
            </td>
          </tr>

        </table>
      </div>
    `,
  };
};
