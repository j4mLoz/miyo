"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";

export default function HeroClient({ count }: { count: number }) {
  // Estado para guardar posición del mouse
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Detecta movimiento del mouse
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = e;

    // Convertimos la posición a valores pequeños
    const x = (clientX - window.innerWidth / 2) / 40;
    const y = (clientY - window.innerHeight / 2) / 40;

    setPosition({ x, y });
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col items-center justify-center text-center relative px-6"
    >
      {/* Fondo radial decorativo */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none">
        <div className="w-[900px] h-[500px] bg-gradient-to-r from-teal-200/20 via-cyan-200/10 to-transparent blur-3xl rounded-full opacity-60"></div>
      </div>

      {/* Logo interactivo */}
      <motion.img
        src="/logo-miyo.svg"
        alt="Miyo logo"
        // desplazamiento según mouse
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 20,
        }}
        className="w-[320px] md:w-[420px] lg:w-[520px] mb-12"
      />

      {/* Bloque de texto */}
      <div className="flex flex-col items-center gap-4 max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-5xl font-bold tracking-tight text-gray-900"
        >
          Tus finanzas, sin ruido.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-lg leading-relaxed"
        >
          Una nueva forma de entender, organizar y mejorar tu dinero.
        </motion.p>

        {/* Contador animado */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-700 text-sm"
        >
          Únete a las{" "}
          <span className="font-semibold text-gray-900">
            <CountUp end={count} duration={2} />
          </span>{" "}
          personas que ya esperan MIYO
        </motion.p>
      </div>

      {/* Flecha scroll */}
      <motion.a
        href="#waitlist"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 animate-bounce text-gray-400 text-2xl"
      >
        ↓
      </motion.a>
    </section>
  );
}
