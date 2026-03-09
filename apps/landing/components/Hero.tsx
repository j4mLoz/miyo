export const revalidate = 0;

import { getWaitlistCount } from "@/lib/waitlist";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const count = await getWaitlistCount();

  return <HeroClient count={count} />;
}
