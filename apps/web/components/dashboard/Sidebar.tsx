"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login"); // 🔥 mejor práctica
  }

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`h-screen bg-[#2D7F7A] text-white p-4 transition-all flex flex-col justify-between ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* 🔝 TOP */}
      <div>
        {/* 🔥 Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="mb-6 text-sm opacity-80 hover:opacity-100"
        >
          {open ? "←" : "→"}
        </button>

        {/* 🧠 LOGO */}
        {open && (
          <h1 className="text-xl font-bold mb-6 tracking-tight">Miyo</h1>
        )}

        {/* 🔥 MAIN */}
        <div className="flex flex-col gap-2">
          {open && <p className="text-xs text-white/60 mt-2 mb-1">MAIN</p>}

          <button
            onClick={() => router.push("/dashboard")}
            className={`text-left px-3 py-2 rounded-lg transition ${
              isActive("/dashboard")
                ? "bg-white text-[#2D7F7A] font-medium"
                : "hover:bg-white/10"
            }`}
          >
            🏠 {open && "Dashboard"}
          </button>

          <button
            onClick={() => router.push("/dashboard/movements")}
            className={`text-left px-3 py-2 rounded-lg transition ${
              isActive("/dashboard/movements")
                ? "bg-white text-[#2D7F7A]"
                : "hover:bg-white/10"
            }`}
          >
            💸 {open && "Movimientos"}
          </button>

          <button
            onClick={() => router.push("/dashboard/subscriptions")}
            className={`text-left px-3 py-2 rounded-lg transition ${
              isActive("/dashboard/subscriptions")
                ? "bg-white text-[#2D7F7A]"
                : "hover:bg-white/10"
            }`}
          >
            🔁 {open && "Suscripciones"}
          </button>
        </div>
      </div>

      {/* 🔻 SYSTEM (ABAJO) */}
      <div className="flex flex-col gap-2">
        {open && <p className="text-xs text-white/60 mb-1">SYSTEM</p>}

        <button
          onClick={() => router.push("/settings")}
          className={`text-left px-3 py-2 rounded-lg transition ${
            isActive("/settings")
              ? "bg-white text-[#2D7F7A]"
              : "hover:bg-white/10"
          }`}
        >
          ⚙️ {open && "Ajustes"}
        </button>

        <button
          onClick={handleLogout}
          className="text-red-200 hover:text-red-400 text-sm text-left px-3 py-2"
        >
          🚪 {open && "Cerrar sesión"}
        </button>
      </div>
    </div>
  );
}
