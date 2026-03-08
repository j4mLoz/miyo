import { getWaitlistCount } from "@/lib/waitlist";

export default async function Hero() {
  const count = await getWaitlistCount();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative px-6">
      {/* Logo */}
      <img
        src="/testerImg.svg"
        alt="Miyo logo"
        className="
        w-[320px]
        md:w-[420px]
        lg:w-[520px]
        mb-12
        animate-fade-in
        "
      />

      {/* Text block */}
      <div className="flex flex-col items-center gap-4 max-w-xl">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight">
          Tus finanzas, sin ruido.
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg">
          Una nueva forma de entender, organizar y mejorar tu dinero.
        </p>

        {/* Social proof */}
        <p className="text-gray-700 text-sm mt-2">
          Únete a las <span className="font-semibold">{count}</span> personas
          que ya esperan MIYO
        </p>
      </div>

      {/* Scroll arrow */}
      <a
        href="#waitlist"
        className="absolute bottom-12 animate-bounce text-gray-400 text-2xl"
      >
        ↓
      </a>
    </section>
  );
}
