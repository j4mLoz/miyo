"use client";

import { useEffect, useState } from "react";

// 🧠 TYPE (CLAVE)
type Saving = {
  id: string;
  name: string;
  goalAmount?: number | null;
  currentAmount: number;
  createdAt?: string;
};

export function useSavings() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSavings() {
    try {
      const res = await fetch("/api/savings", {
        cache: "no-store",
      });

      const data = await res.json();

      setSavings(data.savings || []);
    } catch (err) {
      console.error("Error fetching savings:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSavings();
  }, []);

  // 🔥 ADD
  async function addSaving(saving: {
    name: string;
    goalAmount?: number | null;
  }) {
    try {
      const res = await fetch("/api/savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saving),
      });

      const data = await res.json();

      setSavings((prev) => [data.saving, ...prev]);
    } catch (err) {
      console.error("Error adding saving:", err);
    }
  }

  // 🔥 DELETE
  async function deleteSaving(id: string) {
    setSavings((prev) => prev.filter((s) => s.id !== id));

    try {
      await fetch("/api/savings", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Error deleting saving:", err);
      fetchSavings(); // fallback
    }
  }

  // 🔥 UPDATE
  async function updateSaving(updatedSaving: {
    id: string;
    name?: string;
    goalAmount?: number | null;
  }) {
    // update inmediato
    setSavings((prev) =>
      prev.map((s) =>
        s.id === updatedSaving.id ? { ...s, ...updatedSaving } : s,
      ),
    );

    try {
      const res = await fetch("/api/savings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSaving),
      });

      const data = await res.json();

      setSavings((prev) =>
        prev.map((s) => (s.id === data.updated.id ? data.updated : s)),
      );
    } catch (err) {
      console.error("Error updating saving:", err);
      fetchSavings(); // fallback
    }
  }

  return {
    savings,
    loading,
    addSaving,
    deleteSaving,
    updateSaving,
    refetchSavings: fetchSavings,
  };
}
