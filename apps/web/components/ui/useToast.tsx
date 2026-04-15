"use client";

import { createContext, useContext, useState } from "react";

type ToastContextType = {
  message: string | null;
  showToast: (msg: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <ToastContext.Provider value={{ message, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe usarse dentro de ToastProvider");
  }

  return context;
}
