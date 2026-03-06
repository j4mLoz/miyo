export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center relative">
      {/* Logo */}
      <img
        src="/logo-miyo.svg"
        alt="Miyo logo"
        className="
    w-64
    md:w-80
    lg:w-[420px]
    mb-6
   animate-fade-in"
      />

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800">
        Tus finanzas, sin ruido.
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 mt-2 max-w-md">
        Una nueva forma de entender, organizar y mejorar tu dinero.
      </p>

      {/* Scroll arrow */}
      <a
        href="#waitlist"
        className="absolute bottom-10 animate-bounce text-gray-400 text-2xl"
      >
        ↓
      </a>
    </section>
  );
}
