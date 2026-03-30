"use client";

import { useEffect, useState } from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import Topbar from "@/components/dashboard/Topbar";
import DashboardActions from "@/components/shared/DashboardActions";

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/transactions");
      const data = await res.json();

      // ⚠️ asegúrate que esto exista
      setSummary(data.summary);
    }

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <Topbar />

      <DashboardActions />

      {/* 🔥 AQUÍ ESTABA EL ERROR */}
      <SummaryCards summary={summary} />
    </div>
  );
}
