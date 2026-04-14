"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatCurrencyDisplay } from "@/lib/currency";
import { useUser } from "@/context/UserContext";

export default function TransactionsPage() {
  const { type } = useParams();
  const router = useRouter();
  const { user } = useUser();

  const isIncome = type === "income";

  const [transactions, setTransactions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // 📅 mes actual
  const now = new Date();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const currentYear = String(now.getFullYear());

  useEffect(() => {
    async function loadTransactions() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/transactions?type=${type}&month=${currentMonth}&year=${currentYear}`,
          {
            cache: "no-store",
          },
        );

        const data = await res.json();

        setTransactions(data.transactions || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Error cargando transacciones:", err);
      } finally {
        setLoading(false);
      }
    }

    if (type) {
      loadTransactions();
    }
  }, [type]);

  if (loading) {
    return (
      <div className="p-6 text-gray-400 animate-pulse">
        Cargando movimientos...
      </div>
    );
  }

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

      {/* 💰 TOTAL DEL MES */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500">
          {isIncome ? "Tus ingresos este mes:" : "Tus gastos este mes:"}
        </p>

        <p
          className={`text-2xl font-bold mt-2 ${
            isIncome ? "text-green-600" : "text-red-500"
          }`}
        >
          {formatCurrencyDisplay(total, user?.currency || "EUR")}
        </p>
      </div>

      {/* 📋 LISTADO */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Últimos movimientos
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No tienes movimientos este mes.
          </p>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {t.category || "Sin categoría"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>

                <p
                  className={`font-semibold ${
                    isIncome ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {formatCurrencyDisplay(t.amount, user?.currency || "EUR")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
