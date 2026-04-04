"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

import SummaryCards from "@/components/dashboard/SummaryCards";
import Topbar from "@/components/dashboard/Topbar";
import DashboardActions from "@/components/shared/DashboardActions";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace("/login");
    }
  }, [user, userLoading]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/transactions");
      const data = await res.json();

      if (!data.summary) {
        setSummary({ income: 0, expense: 0, balance: 0 });
      } else {
        setSummary(data.summary);
      }

      setLoading(false);
    }

    if (user) {
      loadData();
    }
  }, [user]);

  if (loading || userLoading) {
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
