"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // 🧠 modo: login o register
  const [mode, setMode] = useState<"login" | "register">("login");

  // 🧠 estados del form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔴 errores reales
  const [error, setError] = useState("");

  // 🟢 mensajes positivos (nuevo)
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔐 si ya está logueado → dashboard
  useEffect(() => {
    async function checkUser() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (data.user) {
        router.push("/dashboard");
      }
    }

    checkUser();
  }, []);

  // 🚀 submit dinámico (login o register)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    // 🧹 limpiamos mensajes anteriores
    setError("");
    setMessage("");

    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // 🔴 error real
      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // 🟢 registro exitoso
      if (mode === "register") {
        setMode("login");

        // 👉 ahora usamos message (no error)
        setMessage("Cuenta creada, ahora inicia sesión 👌");

        setLoading(false);
        return;
      }

      // 🚀 login correcto
      router.push("/dashboard");
    } catch (err) {
      setError("Error inesperado");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9F9] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all">
        {/* 🧠 LOGO */}
        <h1 className="text-3xl font-bold text-center text-[#2D7F7A] mb-6 tracking-tight">
          Miyo
        </h1>

        {/* 🔄 TOGGLE */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              mode === "login" ? "bg-white shadow font-medium" : "text-gray-500"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              mode === "register"
                ? "bg-white shadow font-medium"
                : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* 🧠 TITULO */}
        <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">
          {mode === "login" ? "Bienvenido de nuevo 👋" : "Crea tu cuenta 🚀"}
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          {mode === "login"
            ? "Vamos a organizar tus finanzas"
            : "Empieza a tomar control de tu dinero"}
        </p>

        {/* 🧾 FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7F7A]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7F7A]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {mode === "login" && (
              <p className="text-sm text-right text-gray-400 mt-1 cursor-pointer hover:text-gray-600 transition">
                ¿Olvidaste tu contraseña?
              </p>
            )}
          </div>

          {/* 🔴 ERROR */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* 🟢 MENSAJE POSITIVO */}
          {message && (
            <p className="text-[#2D7F7A] text-sm text-center font-medium">
              {message}
            </p>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D7F7A] text-white py-3 rounded-lg font-medium hover:bg-[#256f6a] transition disabled:opacity-50"
          >
            {loading
              ? "Cargando..."
              : mode === "login"
                ? "Entrar"
                : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}
