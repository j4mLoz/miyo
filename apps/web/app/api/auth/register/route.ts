export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email?.toLowerCase().trim();
    const password = body?.password;

    if (!email || !password) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password mínimo 8 caracteres" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // 🔐 eliminar password del response
    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      user: safeUser,
    });
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    if (error.code === "P2002") {
      return NextResponse.json({ error: "Usuario ya existe" }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Error creando usuario" },
      { status: 500 },
    );
  }
}
