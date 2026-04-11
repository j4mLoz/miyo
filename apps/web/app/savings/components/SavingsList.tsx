"use client";

import { useState } from "react";
import { useSavings } from "../hooks/useSavings";
import { SavingsCard } from "./SavingsCard";
import { CreateSavingModal } from "./CreateSavingModal";
import { SavingDetailModal } from "./SavingDetailModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useToast } from "@/components/ui/useToast";
import { Toast } from "@/components/ui/Toast";

// 🔥 MODELO TIPADO
interface Saving {
  id: string;
  name: string;
  currentAmount: number;
  goalAmount?: number | null;
}

export function SavingsList() {
  const { savings, deleteSaving, addSaving, updateSaving } = useSavings();

  // 🔥 TIPOS CORRECTOS
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [selectedSaving, setSelectedSaving] = useState<Saving | null>(null);

  const { message, showToast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen(true)}
        className="bg-[#2D7F7A] text-white px-4 py-2 rounded-xl"
      >
        + Nuevo ahorro
      </button>

      {savings.length === 0 && (
        <p className="text-gray-500 text-sm">Aún no tienes ahorros creados.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {savings.map((saving: Saving) => (
          <SavingsCard
            key={saving.id}
            saving={saving}
            onClick={(s) => setSelectedSaving(s)}
            onDelete={(id) => setConfirmDelete(id)}
          />
        ))}
      </div>

      {/* Confirmar eliminación */}
      <ConfirmModal
        open={!!confirmDelete}
        title="¿Eliminar este ahorro?"
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => {
          if (!confirmDelete) return;

          deleteSaving(confirmDelete);
          showToast("Ahorro eliminado con éxito");
          setConfirmDelete(null);
        }}
      />

      {/* Toast */}
      <Toast message={message} />

      {/* Crear */}
      <CreateSavingModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={addSaving}
      />

      {/* 🔥 Detalle */}
      <SavingDetailModal
        saving={selectedSaving}
        onClose={() => setSelectedSaving(null)}
        onUpdate={updateSaving}
      />
    </div>
  );
}
