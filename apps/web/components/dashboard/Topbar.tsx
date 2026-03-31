"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-6">
      {/* 🧠 saludo */}
      <h1 className="text-xl font-semibold">Hola 👋</h1>
    </div>
  );
}
