export const welcomeTemplate = (email: string) => {
  return {
    subject: "Ya estás dentro de MIYO 🚀",
    html: `
      <div style="
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: #f9fafb;
        padding: 40px 20px;
      ">
        <div style="
          max-width: 520px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        ">
          
          <h1 style="
            color: #2D7F7A;
            font-size: 22px;
            margin-bottom: 16px;
          ">
            Bienvenido a MIYO
          </h1>

          <p style="color:#374151; font-size:14px; line-height:1.6;">
            Ya estás dentro de la waitlist.
          </p>

          <p style="color:#374151; font-size:14px; line-height:1.6;">
            Estamos construyendo algo pensado para ayudarte a entender mejor tu dinero,
            tomar decisiones más inteligentes y tener control real sobre tu vida financiera.
          </p>

          <p style="color:#374151; font-size:14px; line-height:1.6;">
            No será otra app más.
          </p>

          <p style="color:#374151; font-size:14px; line-height:1.6;">
            Queremos que sea <strong>la herramienta que realmente te haga avanzar</strong>.
          </p>

          <div style="
            margin-top: 24px;
            padding: 16px;
            background: #f3f4f6;
            border-radius: 8px;
            font-size: 13px;
            color: #4b5563;
          ">
            Estás aquí antes que la mayoría.
            Te avisaremos en cuanto abramos acceso.
          </div>

          <p style="
            margin-top: 32px;
            font-size: 13px;
            color: #6b7280;
          ">
            — Equipo MIYO
          </p>

        </div>
      </div>
    `,
  };
};
