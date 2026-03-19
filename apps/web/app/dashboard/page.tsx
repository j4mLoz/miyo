"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  }

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user);
    }

    getUser();
  }, []);

  if (!user) {
    return <p className="p-6">Cargando...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienvenido a MIYO 🚀</h1>

      <p className="mt-2 text-gray-600">{user.email}</p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
