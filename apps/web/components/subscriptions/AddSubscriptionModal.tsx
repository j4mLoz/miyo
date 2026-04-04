"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function AddSubscriptionModal({ onClose, onCreated }: any) {
  const { user } = useUser();
  const currency = user?.currency || "USD";
  const symbol = currency === "EUR" ? "€" : "$";

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [autoDebit, setAutoDebit] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/subscriptions", {
      method: "POST",
      body: JSON.stringify({
        name,
        amount,
        startDate,
        autoDebit,
      }),
    });

    if (res.ok) {
      onCreated();
      onClose();
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl w-full max-w-md space-y-5 shadow-xl animate-scale-in"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Nueva suscripción
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <input
          placeholder="Nombre (Netflix, Spotify...)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2D7F7A]"
        />

        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">{symbol}</span>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#2D7F7A]"
          />
        </div>

        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={autoDebit}
            onChange={() => setAutoDebit(!autoDebit)}
          />
          Se debita automáticamente
        </label>

        <button className="w-full bg-[#2D7F7A] text-white py-3 rounded-lg font-medium hover:bg-[#256f6a] transition">
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}
