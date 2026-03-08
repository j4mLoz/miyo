import Image from "next/image";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Primera fila */}
        <div className="flex items-center justify-between">
          {/* Logo izquierda */}
          <div>
            <Image
              src="/WhiteLogoMiyo.svg"
              alt="MIYO"
              width={120}
              height={120}
              className="opacity-90"
            />
          </div>

          {/* Redes derecha */}
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/somosmiyo/"
              target="_blank"
              className="hover:text-pink-500 transition"
            >
              <Instagram size={26} />
            </a>

            <a
              href="https://x.com/somosmiyo"
              target="_blank"
              className="hover:text-gray-300 transition"
            >
              <Twitter size={26} />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61585426206428"
              target="_blank"
              className="hover:text-blue-500 transition"
            >
              <Facebook size={26} />
            </a>

            <a href="#" className="hover:text-red-500 transition">
              <Youtube size={26} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-700 my-6" />

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} MIYO. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
