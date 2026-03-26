"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TransactionForm() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          type,
          category,
          note,
        }),
      });

      if (!res.ok) {
        console.log("Error creando transacción");
        setLoading(false);
        return;
      }

      // limpiar
      setAmount("");
      setCategory("");
      setNote("");

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 💰 MONTO PRO */}
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">$</span>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full pl-8 pr-3 py-3 border rounded-lg"
        />
      </div>

      {/* 🔄 TIPO */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 border rounded-lg"
      >
        <option value="expense">💸 Gasto</option>
        <option value="income">💰 Ingreso</option>
      </select>

      {/* 🏷️ CATEGORÍAS */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border rounded-lg"
      >
        <option value="">Selecciona categoría</option>
        <option value="comida">🍔 Comida</option>
        <option value="transporte">🚗 Transporte</option>
        <option value="ocio">🎮 Ocio</option>
        <option value="hogar">🏠 Hogar</option>
      </select>

      {/* 📝 NOTA */}
      <textarea
        placeholder="Añade una nota (opcional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      {/* 🚀 BOTÓN */}
      <button
        type="submit"
        className="w-full bg-[#2D7F7A] text-white py-3 rounded-lg hover:bg-[#256f6a] transition"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
