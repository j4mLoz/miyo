"use client";

import { useState } from "react";
import { useSavings } from "../hooks/useSavings";
import { formatCurrencyInput, parseCurrency } from "@/lib/currency";
import { useKeyboard } from "@/components/ui/useKeyboard";
import { useUser } from "@/context/UserContext";

export function CreateSavingModal({ open, onClose }) {
  const { addSaving } = useSavings();
  const { user } = useUser();
  const currency = user?.currency || "EUR";

  const [name, setName] = useState("");
  const [hasGoal, setHasGoal] = useState(false);
  const [goal, setGoal] = useState("");

  // 🔥 HANDLERS PRIMERO
  const currencySymbolMap = {
    EUR: "€",
    USD: "$",
    COP: "$",
  };

  const symbol = currencySymbolMap[currency] || "€";

  const handleSubmit = () => {
    if (!name.trim()) return;

    addSaving({
      name,
      goalAmount: goal ? parseCurrency(goal) : null,
    });

    setName("");
    setGoal("");
    setHasGoal(false);
    onClose();
  };

  const handleGoalChange = (e) => {
    const formatted = formatCurrencyInput(e.target.value);
    setGoal(formatted);
  };

  // 🔥 HOOK DESPUÉS DE HANDLERS
  useKeyboard({
    onEscape: onClose,
    onEnter: handleSubmit,
  });

  // 🔥 RETURN CONDICIONAL DESPUÉS
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Nuevo ahorro</h2>

        <input
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del ahorro"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hasGoal}
            onChange={() => setHasGoal(!hasGoal)}
          />
          Añadir meta
        </label>

        {hasGoal && (
          <input
            value={goal}
            onChange={handleGoalChange}
            inputMode="numeric"
            placeholder={goal ? "" : `Meta (${symbol})`}
            className="w-full border p-3 rounded-xl"
          />
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-[#2D7F7A] text-white py-3 rounded-xl hover:bg-[#256f6a]"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
