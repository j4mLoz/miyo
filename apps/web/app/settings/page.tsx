"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  // 🧠 estado actual
  const [currency, setCurrency] = useState("USD");

  // 🧠 estado inicial (para detectar cambios)
  const [initialCurrency, setInitialCurrency] = useState("USD");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🧠 detectar cambios
  const hasChanges = currency !== initialCurrency;

  // 🔥 cargar usuario real
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.user) {
          setCurrency(data.user.currency || "USD");
          setInitialCurrency(data.user.currency || "USD");
        }
      } catch (err) {
        console.error("Error cargando usuario", err);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  // 🧠 SOLO cambia estado (NO guarda)
  function handleChange(value: string) {
    setCurrency(value);
  }

  // 💾 guardar cambios manualmente
  async function handleSave() {
    setSaving(true);

    try {
      const res = await fetch("/api/user/currency", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currency }),
      });

      if (!res.ok) throw new Error("Error guardando");

      // 🔥 actualizar estado base
      setInitialCurrency(currency);
    } catch (err) {
      console.error("Error guardando settings", err);
    }

    setSaving(false);
  }

  // 🧠 loading UX
  if (loading) {
    return <div className="p-6 text-gray-500">Cargando ajustes...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* 🧠 HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Ajustes</h1>
        <p className="text-gray-500 text-sm">
          Personaliza tu experiencia en Miyo
        </p>
      </div>

      {/* 💰 CARD */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <div>
          <h2 className="font-semibold text-gray-700">Moneda</h2>
          <p className="text-sm text-gray-400">
            Esta moneda se usará en toda la aplicación
          </p>
        </div>

        {/* SELECT */}
        <select
          value={currency}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#2D7F7A] outline-none"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="COP">COP ($)</option>
        </select>
      </div>

      {/* 🔥 BOTÓN FLOTANTE (SaaS STYLE) */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`px-6 py-3 rounded-xl shadow-lg transition 
      ${
        hasChanges
          ? "bg-[#2D7F7A] text-white hover:bg-[#256f6a]"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
    `}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
