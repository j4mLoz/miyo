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

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.saving.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR DELETE SAVING:", error);

    return NextResponse.json(
      { error: "Error eliminando ahorro" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, name, goalAmount } = await req.json();

    const updated = await prisma.saving.update({
      where: { id },
      data: {
        name,
        goalAmount: goalAmount ? Number(goalAmount) : null,
      },
    });

    return NextResponse.json({ updated });
  } catch (error) {
    console.error("ERROR UPDATE SAVING:", error);

    return NextResponse.json(
      { error: "Error actualizando ahorro" },
      { status: 500 },
    );
  }
}
