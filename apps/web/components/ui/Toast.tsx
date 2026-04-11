"use client";

// 🔥 TIPADO PRO
interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="bg-[#2D7F7A] text-white px-4 py-2 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-2">
        {message}
      </div>
    </div>
  );
}
