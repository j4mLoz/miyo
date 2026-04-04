import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = session.value;

    const savings = await prisma.saving.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ savings });
  } catch (error) {
    console.error("ERROR GET SAVINGS:", error);

    return NextResponse.json(
      { error: "Error obteniendo ahorros" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = session.value;

    const { name, goalAmount } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });
    }

    const saving = await prisma.saving.create({
      data: {
        name,
        goalAmount: goalAmount ? Number(goalAmount) : null,
        userId,
      },
    });

    return NextResponse.json({ saving });
  } catch (error) {
    console.error("ERROR CREATE SAVING:", error);

    return NextResponse.json(
      { error: "Error creando ahorro" },
      { status: 500 },
    );
  }
}
