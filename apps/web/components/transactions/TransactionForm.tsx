"use client";

import { useState, useEffect } from "react";
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
  const [savingId, setSavingId] = useState("");
  const [savings, setSavings] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const categories = type === "income" ? incomeCategories : expenseCategories;

  // 🔥 cargar ahorros solo si se selecciona tipo "saving"
  useEffect(() => {
    if (type === "saving") {
      fetch("/api/savings")
        .then((res) => res.json())
        .then((data) => {
          setSavings(data.savings || []);
        });
    }
  }, [type]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const body: any = {
        amount,
        type,
        note,
      };

      if (type === "saving") {
        body.savingId = savingId;
      } else {
        body.category = category;
      }

      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      setAmount("");
      setCategory("");
      setSavingId("");
      setNote("");

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 💰 AMOUNT */}
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

      {/* 🔄 TYPE */}
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          setCategory("");
          setSavingId("");
        }}
        className="w-full p-3 border rounded-lg"
      >
        <option value="expense">💸 Gasto</option>
        <option value="income">💰 Ingreso</option>
        <option value="saving">🏦 Ahorro</option>
      </select>

      {/* 📂 CATEGORY / SAVINGS */}
      {type === "saving" ? (
        savings.length > 0 ? (
          <select
            value={savingId}
            onChange={(e) => setSavingId(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Selecciona un ahorro</option>

            {savings.map((saving: any) => (
              <option key={saving.id} value={saving.id}>
                {saving.name}
              </option>
            ))}
          </select>
        ) : (
          <div className="p-3 text-sm text-gray-500 border rounded-lg">
            No tienes ahorros creados
          </div>
        )
      ) : (
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
      )}

      {/* 📝 NOTE */}
      <textarea
        placeholder="Añade una nota (opcional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      {/* 🚀 SUBMIT */}
      <button
        type="submit"
        disabled={!amount || (type === "saving" ? !savingId : !category)}
        className="w-full bg-[#2D7F7A] text-white py-3 rounded-lg hover:bg-[#256f6a] transition disabled:bg-gray-300"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
