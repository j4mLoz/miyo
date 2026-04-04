"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function SettingsPage() {
  const { user, loading, refreshUser } = useUser();

  const [currency, setCurrency] = useState("USD");
  const [initialCurrency, setInitialCurrency] = useState("USD");
  const [saving, setSaving] = useState(false);

  const hasChanges = currency !== initialCurrency;

  // 🔥 sincronizar con usuario global
  useEffect(() => {
    if (user) {
      setCurrency(user.currency || "USD");
      setInitialCurrency(user.currency || "USD");
    }
  }, [user]);

  function handleChange(value: string) {
    setCurrency(value);
  }

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

      setInitialCurrency(currency);

      // 🔥 clave → refrescar usuario global
      await refreshUser();
    } catch (err) {
      console.error("Error guardando settings", err);
    }

    setSaving(false);
  }

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

      {/* 🔥 BOTÓN */}
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
