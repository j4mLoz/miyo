"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  currency: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include", // 🔥 CLAVE
      });

      const data = await res.json();

      setUser(data.user || null);
    } catch (err) {
      console.error("Error loading user", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        refreshUser: loadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }

  return context;
}
