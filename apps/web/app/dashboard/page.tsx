"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SummaryCards from "@/components/dashboard/SummaryCards";

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
      try {
        // 🔐 validar sesión
        const authRes = await fetch("/api/auth/me");

        if (!authRes.ok) {
          router.push("/login");
          return;
        }

        // 🔥 traer resumen filtrado
        const res = await fetch(
          `/api/transactions?month=${month}&year=${year}`,
        );

        const data = await res.json();

        setSummary(data.summary);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [month, year]);

  if (loading) {
    return <div className="p-6 text-gray-500">Cargando dashboard...</div>;
  }

  return (
    <div className="p-6">
      {/* 🔥 FILTRO */}
      <div className="flex gap-2 mt-2">
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
      <SummaryCards summary={summary} />
    </div>
  );
}
