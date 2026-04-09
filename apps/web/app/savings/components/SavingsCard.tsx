"use client";

import { Trash2 } from "lucide-react";
import { formatCurrencyDisplay } from "@/lib/currency";

export function SavingsCard({ saving, onClick, onDelete }) {
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
        € {saving.currentAmount.toLocaleString()}
      </p>

      {saving.goalAmount && (
        <p className="text-sm text-gray-500 mt-1">
          Meta: {formatCurrencyDisplay(saving.goalAmount, "EUR")}
        </p>
      )}
    </div>
  );
}
