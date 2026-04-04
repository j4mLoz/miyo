"use client";

import { useSavings } from "../hooks/useSavings";

export function SavingsSummary() {
  const { savings } = useSavings();

  const total = savings.reduce((acc, s) => acc + s.currentAmount, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <p className="text-gray-500 text-sm">Total ahorrado</p>

      <h2 className="text-3xl font-bold text-gray-800">
        € {total.toLocaleString()}
      </h2>
    </div>
  );
}
