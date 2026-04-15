"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TransactionForm from "@/components/transactions/TransactionForm";

export default function NewTransactionPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
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
        <h1 className="text-2xl font-bold text-gray-800">Nuevo movimiento</h1>
        <p className="text-gray-500 text-sm">
          Registra un ingreso, gasto o ahorro
        </p>
      </div>

      {/* 🔥 FORM */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <TransactionForm />
      </div>
    </div>
  );
}
