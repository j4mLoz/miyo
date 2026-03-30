"use client";

import { useRouter } from "next/navigation";
import TransactionForm from "@/components/transactions/TransactionForm";

export default function NewTransactionPage() {
  const router = useRouter();

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* 🔙 BOTÓN ATRÁS */}
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-gray-500 hover:text-gray-800"
      >
        ← Volver
      </button>

      <TransactionForm />
    </div>
  );
}
