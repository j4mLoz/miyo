import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // 🧹 eliminamos sesión
  cookieStore.delete("session");

  return NextResponse.json({ success: true });
}
