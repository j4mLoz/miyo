"use client";

import { useState } from "react";
import { useSavings } from "../hooks/useSavings";
import { SavingsCard } from "./SavingsCard";
import { CreateSavingModal } from "./CreateSavingModal";

export function SavingsList() {
  const { savings } = useSavings();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen(true)}
        className="bg-[#2D7F7A] text-white px-4 py-2 rounded-xl shadow hover:bg-[#256f6a]"
      >
        + Nuevo ahorro
      </button>

      {savings.length === 0 && (
        <p className="text-gray-500 text-sm">Aún no tienes ahorros creados.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {savings.map((saving) => (
          <SavingsCard key={saving.id} saving={saving} />
        ))}
      </div>

      <CreateSavingModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
