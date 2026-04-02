"use client";

import { useState } from "react";
import { useEffect } from "react";

import SubscriptionTable from "@/components/subscriptions/SubscriptionTable";
import SubscriptionSummary from "@/components/subscriptions/SubscriptionSummary";
import AddSubscriptionButton from "@/components/subscriptions/AddSubscriptionButton";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showTotal, setShowTotal] = useState(true);

  useEffect(() => {
    loadSubs();
  }, []);

  async function loadSubs() {
    const res = await fetch("/api/subscriptions");
    const data = await res.json();

    setSubscriptions(data.subscriptions);
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
