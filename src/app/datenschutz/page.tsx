import { PageLayout } from "@/components/layout/PageLayout";
import {
  Shield,
  Cookie,
  Server,
  Mail,
  CheckCircle,
  XCircle,
  HardDrive,
} from "lucide-react";

export default function DatenschutzPage() {
  return (
    <PageLayout title="Datenschutz">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-10">
        {/* No-Data Banner */}
        <section className="rounded-xl border border-[var(--accent-success)]/30 bg-[var(--accent-success)]/5 p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-[var(--accent-success)] flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-[var(--accent-success)] mb-2">
                Keine Datensammlung
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Diese Seite sammelt <strong className="text-[var(--text-primary)]">keine personenbezogenen Daten</strong>. Es gibt keine
                Benutzeraccounts, keine Anmeldung und keine Erfassung von
                persönlichen Informationen.
              </p>
            </div>
          </div>
        </section>

        {/* localStorage */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-[var(--accent-aether)]" />
            Lokale Speicherung (localStorage)
          </h2>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-6 space-y-4">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Der <strong className="text-[var(--text-primary)]">Klassenfinder</strong> kann optional deine Antworten im Browser
              speichern. Dies geschieht ausschließlich lokal auf deinem Gerät
              mittels <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent-aether)] text-xs">localStorage</code>.
            </p>
            <ul className="space-y-2">
              {[
                { label: "Gespeichert werden", value: "Deine Antworten im Klassenfinder-Quiz", icon: CheckCircle, color: "var(--accent-success)" },
                { label: "Nicht gespeichert werden", value: "Keine personenbezogenen Daten", icon: XCircle, color: "var(--accent-danger)" },
                { label: "Löschung", value: "Du kannst den Speicher jederzeit über die Browsereinstellungen löschen", icon: CheckCircle, color: "var(--accent-success)" },
                { label: "Übertragung", value: "Keine Daten werden an Server übertragen", icon: XCircle, color: "var(--accent-danger)" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Icon
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: item.color }}
                    />
                    <span>
                      <strong className="text-[var(--text-primary)]">
                        {item.label}:
                      </strong>{" "}
                      <span className="text-[var(--text-secondary)]">
                        {item.value}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* No Cookies */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-[var(--accent-elyos)]" />
            Keine Cookies, kein Tracking
          </h2>
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-5">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-[var(--accent-danger)] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Diese Website verwendet <strong className="text-[var(--text-primary)]">keine Cookies</strong> und setzt <strong className="text-[var(--text-primary)]">keine Tracking-Technologien</strong> ein. Es gibt keine Verbindung zu:
                </p>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>Google Analytics oder ähnlichen Analyse-Diensten</li>
                  <li>Werbenetzwerke oder Affiliate-Programme</li>
                  <li>Social-Media-Tracking-Pixel</li>
                  <li>Externe CDNs, die Tracking durchführen</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hosting */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-[var(--accent-asmodian)]" />
            Hosting
          </h2>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-6">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              Diese Website wird bei{" "}
              <strong className="text-[var(--text-primary)]">Vercel Inc.</strong>{" "}
              gehostet. Vercel ist ein Hosting-Anbieter für statische Websites
              und Serverless-Funktionen.
            </p>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 p-4">
              <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2">
                Vercel Inc.
              </h3>
              <address className="text-sm text-[var(--text-secondary)] not-italic space-y-1">
                <p>340 S Lemon Ave #4133</p>
                <p>Walnut, CA 91789</p>
                <p>USA</p>
              </address>
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-[var(--accent-aether)] hover:underline"
              >
                Vercel Datenschutzerklärung
              </a>
            </div>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              Beim Zugriff auf diese Website erhebt Vercel technische
              Verbindungsdaten (z. B. IP-Adresse, Zeitstempel, angefragte
              Ressourcen) zum Zweck der Bereitstellung und Sicherheit des
              Dienstes. Diese Datenverarbeitung erfolgt durch Vercel als
              Auftragsverarbeiter. Weitere Informationen findest du in der
              Vercel Datenschutzerklärung.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-[var(--text-muted)]" />
            Kontakt
          </h2>
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-4">
            <p className="text-sm text-[var(--text-secondary)]">
              Bei Fragen zum Datenschutz:{" "}
              <span className="text-[var(--text-muted)] italic">
                [Platzhalter – wird bei Bedarf eingetragen]
              </span>
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <section className="text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Letzte Aktualisierung: Juli 2026
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
