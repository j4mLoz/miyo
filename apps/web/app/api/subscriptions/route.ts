export const dynamic = "force-dynamic";

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

    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error("ERROR GET SUBSCRIPTIONS:", error);

    return NextResponse.json(
      { error: "Error obteniendo suscripciones" },
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

    const { name, amount, startDate, endDate, autoDebit } = await req.json();

    if (!name || !amount || !startDate) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const subscription = await prisma.subscription.create({
      data: {
        name,
        amount: Number(amount),
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        autoDebit,
        userId,
      },
    });

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error("ERROR CREATE SUB:", error);

    return NextResponse.json(
      { error: "Error creando suscripción" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.subscription.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR DELETE:", error);

    return NextResponse.json({ error: "Error eliminando" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, name, amount } = await req.json();

    const updated = await prisma.subscription.update({
      where: { id },
      data: {
        name,
        amount: Number(amount),
      },
    });

    return NextResponse.json({ updated });
  } catch (error) {
    console.error("ERROR UPDATE:", error);

    return NextResponse.json({ error: "Error actualizando" }, { status: 500 });
  }
}
