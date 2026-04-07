"use client";

import { useEffect, useState } from "react";

export function useSavings() {
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSavings() {
    const res = await fetch("/api/savings");
    const data = await res.json();

    setSavings(data.savings);
    setLoading(false);
  }

  useEffect(() => {
    fetchSavings();
  }, []);

  async function addSaving(saving) {
    const res = await fetch("/api/savings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saving),
    });

    const data = await res.json();
    setSavings((prev) => [data.saving, ...prev]);
  }

  async function deleteSaving(id) {
    await fetch("/api/savings", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    setSavings((prev) => prev.filter((s) => s.id !== id));
  }

  async function updateSaving(updatedSaving) {
    const res = await fetch("/api/savings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSaving),
    });

    const data = await res.json();

    setSavings((prev) =>
      prev.map((s) => (s.id === data.updated.id ? data.updated : s)),
    );
  }

  return {
    savings,
    loading,
    addSaving,
    deleteSaving,
    updateSaving,
  };
}
