"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { useSavings } from "../hooks/useSavings";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useToast } from "@/components/ui/useToast";
import { Toast } from "@/components/ui/Toast";
import { formatCurrencyInput, parseCurrency } from "@/lib/currency";

export function SavingDetailModal({ saving, onClose }) {
  const { updateSaving } = useSavings();
  const [confirmEdit, setConfirmEdit] = useState(false);
  const { message, showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(saving?.name || "");
  const [goal, setGoal] = useState(saving?.goalAmount || "");

  if (!saving) return null;

  const handleGoalChange = (e) => {
    const formatted = formatCurrencyInput(e.target.value);
    setGoal(formatted);
  };

  const handleSave = () => {
    updateSaving({
      id: saving.id,
      name,
      goalAmount: goal ? parseCurrency(goal) : null,
    });

    setEditing(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg space-y-4 relative">
        {/* ✏️ EDIT */}
        <button
          onClick={() => setEditing(!editing)}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#2D7F7A]"
        >
          <Pencil size={18} />
        </button>

        {editing ? (
          <>
            <input
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              value={goal}
              onChange={handleGoalChange}
              inputMode="numeric"
              className="w-full border p-2 rounded"
            />

            <button
              onClick={() => setConfirmEdit(true)}
              className="w-full bg-[#2D7F7A] text-white py-2 rounded"
            >
              Guardar cambios
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">{saving.name}</h2>

            <p className="text-2xl font-bold">
              € {saving.currentAmount.toLocaleString()}
            </p>

            {saving.goalAmount && (
              <p className="text-gray-500">
                Meta: {formatCurrency(saving.goalAmount, "EUR")}
              </p>
            )}
          </>
        )}

        {/* Confirmar edición */}
        <ConfirmModal
          open={confirmEdit}
          title="¿Guardar cambios?"
          onCancel={() => setConfirmEdit(false)}
          onConfirm={() => {
            updateSaving({
              id: saving.id,
              name,
              goalAmount: goal ? Number(goal) : null,
            });

            showToast("Editado con éxito");

            setConfirmEdit(false);
            setEditing(false);
          }}
        />

        {/* Toast */}
        <Toast message={message} />

        <button onClick={onClose} className="w-full bg-gray-200 py-2 rounded">
          Cerrar
        </button>
      </div>
    </div>
  );
}
