import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Miyo - Finanzas personales sin ruido",
  description:
    "Miyo es una app de finanzas personales que te ayuda a entender, organizar y mejorar tu dinero de forma simple y sin distracciones.",
  openGraph: {
    title: "Miyo - Finanzas personales sin ruido",
    description:
      "Miyo es una app de finanzas personales que te ayuda a entender, organizar y mejorar tu dinero de forma simple y sin distracciones.",
    url: "https://miyo-bay.vercel.app/",
    siteName: "Miyo",
    images: [
      {
        url: "https://miyo-bay.vercel.app/MiyoMetadata.jpg",
        width: 1200,
        height: 630,
        alt: "Miyo - Finanzas personales sin ruido",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
