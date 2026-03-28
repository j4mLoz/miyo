"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardActions from "@/components/dashboard/DashboardActions";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // 🧠 estado de filtro
  const [month, setMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0"),
  );
  const [year, setYear] = useState(String(new Date().getFullYear()));

  useEffect(() => {
    async function loadData() {
      // 🔐 check sesión
      const authRes = await fetch("/api/auth/me");

      if (!authRes.ok) {
        router.push("/login");
        return;
      }

      // 🔥 fetch con filtro
      const res = await fetch(`/api/transactions?month=${month}&year=${year}`);

      const data = await res.json();

      setSummary(data.summary);
      setLoading(false);
    }

    loadData();
  }, [month, year]);

  if (loading) {
    return <div className="p-6 text-gray-500">Cargando...</div>;
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <DashboardActions />

      {/* 🔥 FILTRO */}
      <div className="flex gap-2 mt-4">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded-lg"
        >
          {Array.from({ length: 12 }, (_, i) => {
            const m = String(i + 1).padStart(2, "0");
            return (
              <option key={m} value={m}>
                Mes {m}
              </option>
            );
          })}
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded-lg w-24"
        />
      </div>

      {/* 🔥 RESUMEN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Ingresos</p>
          <p className="text-xl font-semibold text-green-600">
            ${summary.income}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Gastos</p>
          <p className="text-xl font-semibold text-red-500">
            ${summary.expense}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-xl font-semibold text-gray-800">
            ${summary.balance}
          </p>
        </div>
      </div>
    </div>
  );
}
