"use client";

import { formatCurrency } from "@/lib/currency";
import { useUser } from "@/context/UserContext";

export default function SummaryCards({ summary }: any) {
  const { user } = useUser();

  const currency = user?.currency || "USD";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Ingresos</p>
        <p className="text-xl font-semibold text-green-600">
          {formatCurrency(summary.income, currency)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Gastos</p>
        <p className="text-xl font-semibold text-red-500">
          {formatCurrency(summary.expense, currency)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Balance</p>
        <p className="text-xl font-semibold text-gray-800">
          {formatCurrency(summary.balance, currency)}
        </p>
      </div>
    </div>
  );
}
