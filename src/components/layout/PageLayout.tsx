"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {title && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] font-serif">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-[var(--text-secondary)]">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
