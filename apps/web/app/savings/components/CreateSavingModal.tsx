"use client";

import { useState } from "react";
import { useSavings } from "../hooks/useSavings";
import { formatCurrencyInput, parseCurrency } from "@/lib/currency";
import { useKeyboard } from "@/components/ui/useKeyboard";
import { useUser } from "@/context/UserContext";

// 🔥 TIPADO PRO
interface CreateSavingModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (saving: any) => void;
}

export function CreateSavingModal({
  open,
  onClose,
  onCreate,
}: CreateSavingModalProps) {
  const { addSaving } = useSavings();
  const { user } = useUser();
  const currency = user?.currency || "EUR";

  const [name, setName] = useState("");
  const [hasGoal, setHasGoal] = useState(false);
  const [goal, setGoal] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newSaving = {
      name,
      goalAmount: goal ? parseCurrency(goal) : null,
    };

    addSaving(newSaving);
    onCreate?.(newSaving);

    setName("");
    setGoal("");
    setHasGoal(false);

    onClose();
  };

  useKeyboard({
    onEscape: onClose,
    onEnter: handleSubmit,
  });

  if (!open) return null;

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setGoal(formatted);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Nuevo ahorro</h2>

        <input
          placeholder="Nombre del ahorro"
          className="w-full p-3 border rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            placeholder={`Meta (${currency})`}
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
