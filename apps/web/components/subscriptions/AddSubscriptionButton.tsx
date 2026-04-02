"use client";

import { useState } from "react";
import AddSubscriptionModal from "./AddSubscriptionModal";

export default function AddSubscriptionButton({ onCreated }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#2D7F7A] text-white px-4 py-2 rounded-lg"
      >
        + Nueva suscripción
      </button>

      {open && (
        <AddSubscriptionModal
          onClose={() => setOpen(false)}
          onCreated={onCreated}
        />
      )}
    </>
  );
}
