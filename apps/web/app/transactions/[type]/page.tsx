"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TransactionsPage() {
  const { type } = useParams();
  const router = useRouter();

  const isIncome = type === "income";

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* 🔙 BACK */}
      <button
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2D7F7A] transition"
      >
        <ArrowLeft size={18} />
        Volver al dashboard
      </button>

      {/* 🧠 HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {isIncome ? "Ingresos" : "Gastos"}
        </h1>
        <p className="text-gray-500 text-sm">
          Analiza tus {isIncome ? "ingresos" : "gastos"} en detalle
        </p>
      </div>

      {/* 🔥 FUTURO */}
      <div className="bg-white p-6 rounded-2xl shadow text-gray-400 text-sm">
        Aquí irá:
        <ul className="list-disc ml-4 mt-2">
          <li>Filtro por mes</li>
          <li>Listado de movimientos</li>
          <li>Balance total</li>
          <li>Gráficas</li>
        </ul>
      </div>
    </div>
  );
}
