"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-6">
      {/* 🧠 saludo */}
      <h1 className="text-xl font-semibold">Hola 👋</h1>

      {/* 🔥 botón rápido */}
      <button
        onClick={() => router.push("/transactions/new")}
        className="bg-[#2D7F7A] text-white px-4 py-2 rounded-lg"
      >
        + Nueva
      </button>
    </div>
  );
}
