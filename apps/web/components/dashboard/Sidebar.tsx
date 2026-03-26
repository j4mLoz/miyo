"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div
      className={`h-screen bg-[#2D7F7A] text-white p-4 transition-all ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* 🔥 Toggle */}
      <button onClick={() => setOpen(!open)} className="mb-6 text-sm">
        {open ? "←" : "→"}
      </button>

      {/* 🔥 Menu */}
      <div className="flex flex-col gap-4">
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>

        <button onClick={() => router.push("/transactions/new")}>
          Nueva transacción
        </button>
      </div>

      {/* 🔥 Logout abajo */}
      <div className="absolute bottom-6">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
