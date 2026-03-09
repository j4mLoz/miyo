"use client";

import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // nuevo estado para mensajes del servidor
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // leemos la respuesta del backend
    const data = await res.json();

    if (!res.ok) {
      // mostramos mensaje de error del servidor
      setMessage(data.error);
      return;
    }

    // registro correcto
    setSubmitted(true);
  }

  return (
    <section
      id="waitlist"
      className="min-h-screen flex items-center justify-center px-6 bg-gray-50"
    >
      <div className="max-w-xl w-full text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          ¿Quieres enterarte cuando MIYO esté listo?
        </h2>

        <p className="text-gray-500 mb-8">
          Déjanos tu correo y te avisaremos cuando abramos las puertas.
        </p>

        {!submitted ? (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                w-full
                px-4 py-3
                rounded-lg
                border
                border-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-[--color-miyo-primary]
              "
                required
              />

              <button
                type="submit"
                className="
bg-[#2D7F7A]
text-white
px-6
py-3
rounded-lg
font-medium
shadow-md
hover:bg-[#256f6a]
transition
w-full sm:w-auto
"
              >
                Avísame
              </button>
            </form>

            {/* mensaje de error */}
            {message && <p className="text-red-500 mt-4 text-sm">{message}</p>}
          </>
        ) : (
          <div className="mt-6 text-green-600 font-medium">
            🎉 Gracias. Te avisaremos cuando MIYO esté listo.
          </div>
        )}
      </div>
    </section>
  );
}
