"use client";

import { motion } from "framer-motion";

export default function HeroClient({ count }: { count: number }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative px-6">
      {/* Logo */}
      <motion.img
        src="/logo-miyo.svg"
        alt="Miyo logo"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-[320px] md:w-[420px] lg:w-[520px] mb-12"
      />
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[600px] h-[700px] bg-teal-200/30 blur-2xl rounded-full"></div>
      </div>

      <div className="flex flex-col items-center gap-4 max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-semibold text-gray-800"
        >
          Tus finanzas, sin ruido.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-lg"
        >
          Una nueva forma de entender, organizar y mejorar tu dinero.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-700 text-sm"
        >
          Únete a las <span className="font-semibold">{count}</span> personas
          que ya esperan MIYO
        </motion.p>
      </div>

      <a
        href="#waitlist"
        className="absolute bottom-12 animate-bounce text-gray-400 text-2xl"
      >
        ↓
      </a>
    </section>
  );
}
