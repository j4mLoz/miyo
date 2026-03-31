"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SummaryCards from "@/components/dashboard/SummaryCards";
import Topbar from "@/components/dashboard/Topbar";
import DashboardActions from "@/components/shared/DashboardActions";

export default function DashboardPage() {
  const router = useRouter();

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // 🔐 1. validar sesión
      const authRes = await fetch("/api/auth/me");

      if (!authRes.ok) {
        router.replace("/login"); // 🔥 clave → replace, no push
        return;
      }

      // 📊 2. cargar datos
      const res = await fetch("/api/transactions");
      const data = await res.json();

      if (!data.summary) {
        setSummary({ income: 0, expense: 0, balance: 0 });
      } else {
        setSummary(data.summary);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Cargando...</p>;
  }

  return (
    <div className="space-y-6">
      <Topbar />
      <DashboardActions />
      <SummaryCards summary={summary} />
    </div>
  );
}
