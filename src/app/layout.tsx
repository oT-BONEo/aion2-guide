import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/lib/content-validation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AION 2 Guide-Hub",
  description:
    "Deutschsprachiger Vorab-Hub für AION 2: Klassenvergleich, PvE/PvP-Bewertungen, Gear-Fahrpläne und Guides mit transparentem KR/TW-Datenstand.",
  openGraph: {
    title: "AION 2 Guide-Hub",
    description:
      "Deutschsprachiger Vorab-Hub für AION 2: Klassenvergleich, PvE/PvP-Bewertungen, Gear-Fahrpläne und Guides mit transparentem KR/TW-Datenstand.",
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="bg-abyss text-textPrimary antialiased">{children}</body>
    </html>
  );
}
