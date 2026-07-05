import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";
import { AlertTriangle, ExternalLink, Mail, User, FileText } from "lucide-react";

export default function ImpressumPage() {
  return (
    <PageLayout title="Impressum">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-10">
        {/* Fan Project Disclaimer */}
        <section className="rounded-xl border border-[var(--accent-warning)]/30 bg-[var(--accent-warning)]/5 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-[var(--accent-warning)] flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-[var(--accent-warning)] mb-2">
                Inoffizielles Fanprojekt
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Diese Website ist ein <strong className="text-[var(--text-primary)]">inoffizielles Fanprojekt</strong> und steht in keiner Verbindung zu{" "}
                <strong className="text-[var(--text-primary)]">NCSOFT Corporation</strong>. Alle Inhalte dienen ausschließlich informativen Zwecken für die AION-2-Community.
              </p>
              <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                AION ist ein eingetragenes Warenzeichen von NCSOFT Corporation. Alle Spielinhalte, Marken und Logos sind Eigentum ihrer jeweiligen Inhaber.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--accent-aether)]" />
            Kontakt
          </h2>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-sm text-[var(--text-secondary)]">
                E-Mail:{" "}
                <span className="text-[var(--text-muted)] italic">
                  [Platzhalter – wird bei Bedarf eingetragen]
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-sm text-[var(--text-secondary)]">
                Betreiber:{" "}
                <span className="text-[var(--text-muted)] italic">
                  [Platzhalter – wird bei Bedarf eingetragen]
                </span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
              Diese Kontaktdaten sind Platzhalter gemäß § 5 TMG. Sie werden
              vor Livegang durch die tatsächlichen Angaben ersetzt.
            </p>
          </div>
        </section>

        {/* Liability Disclaimer */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--accent-elyos)]" />
            Haftungsausschluss
          </h2>
          <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            <h3 className="text-base font-medium text-[var(--text-primary)]">
              Inhaltliche Haftung
            </h3>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
              Haftung für die Inhalte externer Links. Für den Inhalt der
              verlinkten Seiten sind ausschließlich deren Betreiber
              verantwortlich.
            </p>
            <p>
              Die bereitgestellten Informationen zu AION 2 basieren auf
              öffentlich verfügbaren Quellen, Community-Recherchen und
              offiziellen Ankündigungen. Wir übernehmen keine Gewähr für die
              Aktualität, Richtigkeit und Vollständigkeit der dargestellten
              Spielinhalte, insbesondere da sich diese in Vorabversionen
              (Korea/Taiwan) noch ändern können.
            </p>

            <h3 className="text-base font-medium text-[var(--text-primary)] pt-2">
              Haftung für Links
            </h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>

            <h3 className="text-base font-medium text-[var(--text-primary)] pt-2">
              Urheberrecht
            </h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Soweit die
              Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
              werden die Urheberrechte Dritter beachtet. Insbesondere werden
              Inhalte Dritter als solche gekennzeichnet.
            </p>
          </div>
        </section>

        {/* Link to Privacy */}
        <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            Datenschutz
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Informationen zum Umgang mit personenbezogenen Daten findest du auf
            unserer Datenschutzseite:
          </p>
          <Link
            href="/datenschutz/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--accent-aether)]/30 text-[var(--accent-aether)] hover:bg-[var(--accent-aether)]/5 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Zur Datenschutzseite
          </Link>
        </section>
      </div>
    </PageLayout>
  );
}
