"use client";

import { useEffect } from "react";

export function useKeyboard({ onEscape, onEnter }) {
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
