"use client";

import Link from "next/link";

const navLinks = [
  { href: "/klassen/", label: "Klassen" },
  { href: "/builds/", label: "Guides" },
  { href: "/ausruestung/", label: "Ausr\u00fcstung" },
  { href: "/methodik/", label: "Methodik" },
  { href: "/klassenfinder/", label: "Klassenfinder" },
  { href: "/patches/", label: "Patches" },
  { href: "/quellen/", label: "Quellen" },
  { href: "/korea-server/", label: "KR-Server" },
];

const legalLinks = [
  { href: "/impressum/", label: "Impressum" },
  { href: "/datenschutz/", label: "Datenschutz" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-abyss)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-aether)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-aether)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Hinweis
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              A2 Klassenfinder ist ein Fan-Projekt zur Unterst\u00fctzung der
              Aion 2 Community. Alle Inhalte dienen rein informativen Zwecken.
            </p>
            <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
              Nicht mit NCSOFT verbunden. Aion ist ein eingetragenes Warenzeichen
              von NCSOFT Corporation.
            </p>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {currentYear} A2 Klassenfinder. Fan-Projekt ohne
            kommerzielle Absichten.
          </p>
        </div>
      </div>
    </footer>
  );
}
