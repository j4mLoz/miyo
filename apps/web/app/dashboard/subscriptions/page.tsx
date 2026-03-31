"use client";

import { useState } from "react";
import SubscriptionTable from "@/components/subscriptions/SubscriptionTable";
import SubscriptionSummary from "@/components/subscriptions/SubscriptionSummary";
import AddSubscriptionButton from "@/components/subscriptions/AddSubscriptionButton";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [showTotal, setShowTotal] = useState(true);

  return (
    <div className="space-y-6">
      {/* 🧠 HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Suscripciones</h1>

        <AddSubscriptionButton />
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
