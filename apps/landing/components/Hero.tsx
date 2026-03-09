export const revalidate = 0; // No cache, siempre fresco // SE PUEDE MEJORAR CON ISR SI ES NECESARIO // PERO POR AHORA ASÍ ESTÁ BIEN PARA VER LOS CAMBIOS EN TIEMPO REAL EN LA LISTA DE ESPERA

import { getWaitlistCount } from "@/lib/waitlist";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const count = await getWaitlistCount();

  return <HeroClient count={count} />;
}
