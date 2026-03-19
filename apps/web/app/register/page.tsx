"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
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
      // ✅ éxito
      setSuccess(true);
      setLoading(false);
      // ✅ éxito
      setSuccess(true);
      setLoading(false);

      // 🚀 redirect al dashboard
      // ⏳ redirección suave
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("Error inesperado");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* LOGO */}
        <h1 className="text-3xl font-bold text-center text-[#2D7F7A] mb-8">
          MIYO
        </h1>
        {success ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#2D7F7A]">
              🎉 ¡Cuenta creada!
            </h2>
            <p className="text-gray-500 mt-2">
              Revisa tu correo (próximamente 😉)
            </p>
            <p className="text-sm mt-4">Redirigiendo...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7F7A]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7F7A]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className="text-sm text-right text-gray-400 mt-1 cursor-pointer">
                forgot?
              </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D7F7A] text-white py-3 rounded-lg font-medium hover:bg-[#256f6a] transition"
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
          </form>
        )}

        {/* DIVIDER */}
        <div className="my-6 border-t" />

        {/* SOCIAL (placeholder) */}
        <div className="flex justify-center gap-4">
          <div className="w-10 h-10 border rounded-lg flex items-center justify-center">
            G
          </div>
          <div className="w-10 h-10 border rounded-lg flex items-center justify-center">
            ?
          </div>
          <div className="w-10 h-10 border rounded-lg flex items-center justify-center">
            ?
          </div>
        </div>
      </div>
    </div>
  );
}
