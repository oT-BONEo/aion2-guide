"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/klassen/", label: "Klassen" },
  { href: "/builds/", label: "Guides" },
  { href: "/ausruestung/", label: "Ausrüstung" },
  { href: "/methodik/", label: "Methodik" },
  { href: "/klassenfinder/", label: "Klassenfinder" },
  { href: "/patches/", label: "Patches" },
  { href: "/korea-server/", label: "KR-Server" },
  { href: "/quellen/", label: "Quellen" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--bg-abyss)]/85 backdrop-blur-md border-b border-[var(--border-subtle)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-tight">
            <span className="font-serif text-2xl font-bold text-[var(--accent-aether)] tracking-wide">
              A2
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Klassenfinder
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-aether)] transition-colors rounded-md hover:bg-[var(--accent-aether)]/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/klassenfinder/"
            className="hidden lg:inline-flex items-center px-4 py-2 text-sm font-medium bg-[var(--accent-aether)] text-[var(--bg-abyss)] rounded-md hover:bg-[var(--accent-aether)]/90 transition-colors"
          >
            Finder starten
          </Link>

          {/* Mobile Hamburger */}
          <button
            data-testid="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--accent-aether)] transition-colors"
            aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--bg-abyss)]/95 backdrop-blur-lg pt-16"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 pb-16">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-medium text-[var(--text-primary)] hover:text-[var(--accent-aether)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="/klassenfinder/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 inline-flex items-center px-6 py-3 text-lg font-medium bg-[var(--accent-aether)] text-[var(--bg-abyss)] rounded-md hover:bg-[var(--accent-aether)]/90 transition-colors"
                >
                  Finder starten
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
