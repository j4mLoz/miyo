import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 🧠 eliminamos cookie de sesión correctamente
    cookieStore.set("session", "", {
      httpOnly: true,
      expires: new Date(0), // 🔥 invalida la cookie
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      { error: "Error al cerrar sesión" },
      { status: 500 },
    );
  }
}
