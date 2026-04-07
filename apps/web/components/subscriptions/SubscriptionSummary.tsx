"use client";

import { useUser } from "@/context/UserContext";
import { formatCurrency, formatCurrencyDisplay } from "@/lib/currency";

export default function SubscriptionSummary({
  subscriptions,
  show,
  toggle,
}: any) {
  const { user } = useUser();
  const currency = user?.currency || "USD";

  const total = subscriptions.reduce(
    (acc: number, s: any) => acc + Number(s.amount || 0),
    0,
  );

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={toggle}
        className="text-sm text-gray-500 hover:text-gray-700 transition"
      >
        {show ? "Ocultar total" : "Mostrar total"}
      </button>

      {show && (
        <div className="bg-white px-4 py-2 rounded-lg shadow font-semibold">
          {formatCurrencyDisplay(total, currency)}
        </div>
      )}
    </div>
  );
}
