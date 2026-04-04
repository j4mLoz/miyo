"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const expenseCategories = [
  "Comida",
  "Transporte",
  "Vivienda",
  "Entretenimiento",
  "Suscripciones",
  "Salud",
  "Compras",
  "Educación",
  "Viajes",
  "Otros",
];

const incomeCategories = [
  "Salario",
  "Freelance",
  "Inversiones",
  "Negocio",
  "Regalos",
  "Otros",
];

export default function TransactionForm() {
  const { user } = useUser();
  const currency = user?.currency || "USD";

  const symbol = currency === "EUR" ? "€" : "$";

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const categories = type === "income" ? incomeCategories : expenseCategories;

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
        setLoading(false);
        return;
      }

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
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">{symbol}</span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full pl-8 pr-3 py-3 border rounded-lg no-spinner"
        />
      </div>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 border rounded-lg"
      >
        <option value="expense">💸 Gasto</option>
        <option value="income">💰 Ingreso</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border rounded-lg"
      >
        <option value="">Selecciona categoría</option>

        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Añade una nota (opcional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-[#2D7F7A] text-white py-3 rounded-lg hover:bg-[#256f6a] transition"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
