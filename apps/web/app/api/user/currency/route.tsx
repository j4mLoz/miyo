import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function PATCH(req: Request) {
  try {
    // 🔥 IMPORTANTE: await
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = session.value;

    const { currency } = await req.json();

    if (!currency) {
      return NextResponse.json({ error: "Moneda requerida" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { currency },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR UPDATE CURRENCY:", error);

    return NextResponse.json(
      { error: "Error actualizando moneda" },
      { status: 500 },
    );
  }
}
