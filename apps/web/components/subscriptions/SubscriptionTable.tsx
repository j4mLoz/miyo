"use client";

import { useUser } from "@/context/UserContext";
import { formatCurrencyDisplay } from "@/lib/currency";

export default function SubscriptionTable({ subscriptions }: any) {
  const { user } = useUser();
  const currency = user?.currency || "USD";

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#2D7F7A] text-white">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Inicio</th>
            <th className="p-3 text-left">Fin</th>
            <th className="p-3 text-left">Monto</th>
            <th className="p-3 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {subscriptions.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-400">
                No tienes suscripciones aún
              </td>
            </tr>
          ) : (
            subscriptions.map((sub: any, i: number) => (
              <tr key={i} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{sub.name}</td>
                <td className="p-3">{sub.startDate}</td>
                <td className="p-3">{sub.endDate}</td>
                <td className="p-3 font-medium">
                  {formatCurrencyDisplay(sub.amount, currency)}
                </td>

                <td className="p-3 text-right space-x-2">
                  <button
                    className="hover:scale-110 transition"
                    onClick={async () => {
                      const newName = prompt("Nuevo nombre", sub.name);
                      const newAmount = prompt("Nuevo monto", sub.amount);

                      if (!newName || !newAmount) return;

                      await fetch("/api/subscriptions", {
                        method: "PATCH",
                        body: JSON.stringify({
                          id: sub.id,
                          name: newName,
                          amount: newAmount,
                        }),
                      });

                      location.reload();
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    className="hover:scale-110 transition"
                    onClick={async () => {
                      await fetch("/api/subscriptions", {
                        method: "DELETE",
                        body: JSON.stringify({ id: sub.id }),
                      });

                      location.reload();
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
