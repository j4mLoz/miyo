"use client";

import { useEffect, useState } from "react";

export function useSavings() {
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSavings() {
    const res = await fetch("/api/savings");
    const data = await res.json();

    setSavings(data.savings); // 🔥 clave
    setLoading(false);
  }

  useEffect(() => {
    fetchSavings();
  }, []);

  async function addSaving(saving) {
    const res = await fetch("/api/savings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saving),
    });

    const data = await res.json();

    setSavings((prev) => [data.saving, ...prev]); // 🔥 clave
  }

  return {
    savings,
    loading,
    addSaving,
  };
}
