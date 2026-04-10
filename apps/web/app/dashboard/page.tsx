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

  // 🔐 redirect seguro
  useEffect(() => {
    if (!userLoading && !user) {
      router.replace("/login");
    }
  }, [user, userLoading, router]);

  // 🔥 fetch robusto
  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);

        const res = await fetch("/api/transactions", {
          cache: "no-store", // 🔥 clave para evitar datos viejos
        });

        const data = await res.json();

        if (!isMounted) return;

        setSummary(data.summary || { income: 0, expense: 0, balance: 0 });
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // 🔥 UX mejorada
  if (userLoading || loading) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Cargando dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Topbar />
      <DashboardActions />
      <SummaryCards summary={summary} />
    </div>
  );
}
