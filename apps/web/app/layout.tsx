import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { ToastProviderWrapper } from "@/components/ui/ToastProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miyo",
  description: "Gestiona tus finanzas de forma simple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F9F9] text-gray-800`}
      >
        <UserProvider>
          <ToastProviderWrapper>{children}</ToastProviderWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
