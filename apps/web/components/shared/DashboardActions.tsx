"use client";

import { useRouter } from "next/navigation";

export default function DashboardActions() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-6">
      {/* 🧠 IZQUIERDA */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Controla tus finanzas</p>
      </div>

      {/* 🧠 DERECHA */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/transactions/new")}
          className="bg-[#2D7F7A] text-white px-4 py-2 rounded-lg text-sm"
        >
          + Nuevo
        </button>
      </div>
    </div>
  );
}
