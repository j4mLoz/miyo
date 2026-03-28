"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7f6] flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        {/* 🧠 IZQUIERDA (MASCOTA) */}
        <div className="flex justify-center md:justify-start">
          <Image
            src="/MiyoMascotPreLogin.svg" // 👈 mascota SVG
            alt="Miyo mascot"
            width={480}
            height={480}
            className="animate-enter hover:scale-105 transition-transform duration-300 ease-out cursor-pointer"
            priority
          />
        </div>

        {/* 🧠 DERECHA (CONTENIDO) */}
        <div className="flex flex-col items-start gap-6 max-w-md animate-enter-delayed">
          {/* 🔥 LOGO */}
          <Image
            src="/LogoMiyo1Prelogin.svg" // 👈 logo SVG
            alt="Miyo logo"
            width={200}
            height={60}
            className="hover:scale-110 transition-transform duration-300 ease-out cursor-pointer"
          />

          {/* 🔥 COPY */}
          <h2 className="text-3xl font-semibold text-gray-900 leading-snug">
            Tu dinero, claro y bajo control.
          </h2>

          <p className="text-gray-600 text-lg">
            Entiende en qué gastas, organiza tus ingresos y toma mejores
            decisiones sin complicarte.
          </p>

          {/* 🔥 CTA */}
          <button
            onClick={() => router.push("/login")}
            className="mt-2 bg-[#2D7F7A] hover:bg-[#256f6a] text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          >
            Empezar →
          </button>
        </div>
      </div>
    </div>
  );
}
