export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 🍪 obtenemos cookies (IMPORTANTE: async)
    const cookieStore = await cookies();

    const session = cookieStore.get("session");

    // 🚫 no hay sesión
    if (!session) {
      return NextResponse.json({ user: null });
    }

    // 🔍 buscamos usuario en DB
    const user = await prisma.user.findUnique({
      where: {
        id: session.value,
      },
    });

    // 🚫 sesión inválida (usuario no existe)
    if (!user) {
      return NextResponse.json({ user: null });
    }

    // 🔐 nunca devolver password
    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      user: safeUser,
    });
  } catch (error) {
    console.error("ME ERROR:", error);

    return NextResponse.json(
      { error: "Error obteniendo usuario" },
      { status: 500 },
    );
  }
}
