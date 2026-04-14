export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = session.value;

    const { searchParams } = new URL(req.url);

    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const type = searchParams.get("type"); // 🔥 NUEVO

    let dateFilter = {};

    if (month && year) {
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      dateFilter = {
        gte: startDate,
        lt: endDate,
      };
    }

    // 🔥 WHERE DINÁMICO
    const where: any = {
      userId,
      ...(month && year && { date: dateFilter }),
      ...(type && { type }), // 🔥 clave
    };

    // 🔥 TRANSACTIONS FILTRADAS
    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: {
        date: "desc",
      },
    });

    // 🔥 TOTAL DEL TIPO (income o expense)
    const totalResult = await prisma.transaction.aggregate({
      where,
      _sum: {
        amount: true,
      },
    });

    const total = totalResult._sum.amount || 0;

    // 🔥 RESPUESTA LIMPIA PARA FRONT
    return NextResponse.json({
      transactions,
      total,
    });
  } catch (error) {
    console.error("ERROR GET TRANSACTIONS:", error);

    return NextResponse.json(
      { error: "Error obteniendo transacciones" },
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

    const { amount, type, category, note, savingId } = await req.json();

    if (!amount || !type) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // 🔥 CASO: AHORRO
    if (type === "saving") {
      if (!savingId) {
        return NextResponse.json(
          { error: "Ahorro no seleccionado" },
          { status: 400 },
        );
      }

      // 🧠 transacción + update en una sola operación segura
      const result = await prisma.$transaction(async (tx: any) => {
        // crear transacción
        const transaction = await tx.transaction.create({
          data: {
            amount: Number(amount),
            type,
            note,
            userId,
            savingId,
          },
        });

        // actualizar ahorro
        await tx.saving.update({
          where: { id: savingId },
          data: {
            currentAmount: {
              increment: Number(amount),
            },
          },
        });

        return transaction;
      });

      return NextResponse.json({ transaction: result });
    }

    // 🔥 CASO NORMAL (income / expense)
    if (!category) {
      return NextResponse.json(
        { error: "Categoría requerida" },
        { status: 400 },
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount: Number(amount),
        type,
        category,
        note,
        userId,
      },
    });

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error("ERROR POST TRANSACTION:", error);

    return NextResponse.json(
      { error: "Error creando transacción" },
      { status: 500 },
    );
  }
}
