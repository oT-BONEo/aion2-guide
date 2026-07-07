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
  title: "Daevas Guidance",
  description:
    "Inoffizieller AION-2-Guide mit Klassenübersichten, Build-Planner, Patch-Kontext und transparenter Quellenbasis. From Daevas, for Daevas.",
  openGraph: {
    title: "Daevas Guidance",
    description:
      "Inoffizieller AION-2-Guide mit Klassenübersichten, Build-Planner, Patch-Kontext und transparenter Quellenbasis.",
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
