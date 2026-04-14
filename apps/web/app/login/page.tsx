"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useUser();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔥 NUEVO: control de verificación
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkUser() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();

        if (!isMounted) return;

        if (data.user) {
          await refreshUser(); // 🔥 sincroniza contexto
          router.replace("/dashboard"); // 🔥 importante
        } else {
          setCheckingAuth(false); // 🔥 solo mostramos login si NO hay user
        }
      } catch (err) {
        setCheckingAuth(false);
      }
    }

    checkUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // 🔥 evitar render mientras valida sesión
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Verificando sesión...
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
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

      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      if (mode === "register") {
        setMode("login");
        setMessage("Cuenta creada, ahora inicia sesión 👌");
        setLoading(false);
        return;
      }

      router.replace("/dashboard"); // 🔥 replace = clave
    } catch (err) {
      setError("Error inesperado");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9F9] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all">
        <h1 className="text-3xl font-bold text-center text-[#2D7F7A] mb-6 tracking-tight">
          Miyo
        </h1>

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

        <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">
          {mode === "login" ? "Bienvenido de nuevo 👋" : "Crea tu cuenta 🚀"}
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          {mode === "login"
            ? "Vamos a organizar tus finanzas"
            : "Empieza a tomar control de tu dinero"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {message && (
            <p className="text-[#2D7F7A] text-sm text-center font-medium">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D7F7A] text-white py-3 rounded-lg"
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
