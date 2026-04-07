"use client";

export function ConfirmModal({ open, title, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl bg-gray-200"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-500 text-white"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
