"use client";

import { useEffect } from "react";

// 🔥 TIPADO DEL HOOK
interface UseKeyboardProps {
  onEscape?: () => void;
  onEnter?: () => void;
}

export function useKeyboard({ onEscape, onEnter }: UseKeyboardProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onEscape?.();
      }

      if (e.key === "Enter") {
        onEnter?.();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onEscape, onEnter]);
}
