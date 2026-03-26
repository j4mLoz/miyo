"use client";

export default function SummaryCards({ summary }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Ingresos</p>
        <p className="text-xl font-semibold text-green-600">
          ${summary.income}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Gastos</p>
        <p className="text-xl font-semibold text-red-500">${summary.expense}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Balance</p>
        <p className="text-xl font-semibold text-gray-800">
          ${summary.balance}
        </p>
      </div>
    </div>
  );
}
