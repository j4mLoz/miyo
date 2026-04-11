"use client";

import { Trash2 } from "lucide-react";
import { formatCurrencyDisplay } from "@/lib/currency";
import { SavingsProgress } from "./SavingsProgress";

// 🔥 reutilizamos modelo
interface Saving {
  id: string;
  name: string;
  currentAmount: number;
  goalAmount?: number | null;
}

// 🔥 props tipadas
interface SavingsCardProps {
  saving: Saving;
  onClick: (saving: Saving) => void;
  onDelete: (id: string) => void;
}

export function SavingsCard({ saving, onClick, onDelete }: SavingsCardProps) {
  return (
    <div
      className="relative bg-white p-5 rounded-2xl shadow hover:shadow-md transition cursor-pointer"
      onClick={() => onClick(saving)}
    >
      {/* 🗑️ DELETE */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(saving.id);
        }}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
      >
        <Trash2 size={18} />
      </button>

      <h3 className="font-semibold text-gray-800">{saving.name}</h3>

      <p className="text-xl font-bold mt-2 text-gray-900">
        {formatCurrencyDisplay(saving.currentAmount, "EUR")}
      </p>

      {saving.goalAmount && (
        <>
          <p className="text-sm text-gray-500 mt-1">
            Meta: {formatCurrencyDisplay(saving.goalAmount, "EUR")}
          </p>

          {/* 🔥 BARRA DE PROGRESO */}
          <SavingsProgress
            current={saving.currentAmount}
            goal={saving.goalAmount}
          />
        </>
      )}
    </div>
  );
}
