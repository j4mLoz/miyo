"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

import SubscriptionTable from "@/components/subscriptions/SubscriptionTable";
import SubscriptionSummary from "@/components/subscriptions/SubscriptionSummary";
import AddSubscriptionButton from "@/components/subscriptions/AddSubscriptionButton";

export default function SubscriptionsPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [subscriptions, setSubscriptions] = useState([]);
  const [showTotal, setShowTotal] = useState(true);

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace("/login");
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (user) {
      loadSubs();
    }
  }, [user]);

  async function loadSubs() {
    const res = await fetch("/api/subscriptions");
    const data = await res.json();

    setSubscriptions(data.subscriptions || []);
  }

  if (userLoading) {
    return <p className="p-6 text-gray-500">Cargando...</p>;
  }

  return (
    <div className="space-y-6">
      {/* 🧠 HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Suscripciones</h1>

        <AddSubscriptionButton onCreated={loadSubs} />
      </div>

      {/* 📊 TOTAL */}
      <SubscriptionSummary
        subscriptions={subscriptions}
        show={showTotal}
        toggle={() => setShowTotal(!showTotal)}
      />

      {/* 📋 TABLA */}
      <SubscriptionTable
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
      />
    </div>
  );
}
