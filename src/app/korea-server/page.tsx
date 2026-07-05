import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";
import { sources } from "@/data/sources";
import {
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Globe,
  Monitor,
  Smartphone,
  CreditCard,
  Shield,
  Clock,
  Languages,
  Wifi,
  ExternalLink,
} from "lucide-react";

function InfoBox({
  children,
  icon: Icon = Info,
}: {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-[var(--accent-aether)]/20 bg-[var(--accent-aether)]/5 p-4 flex items-start gap-3">
      <Icon className="w-5 h-5 text-[var(--accent-aether)] flex-shrink-0 mt-0.5" />
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function WarningBox({
  children,
  icon: Icon = AlertTriangle,
}: {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-[var(--accent-warning)]/30 bg-[var(--accent-warning)]/5 p-4 flex items-start gap-3">
      <Icon className="w-5 h-5 text-[var(--accent-warning)] flex-shrink-0 mt-0.5" />
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function DangerBox({
  children,
  icon: Icon = XCircle,
}: {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-[var(--accent-danger)]/30 bg-[var(--accent-danger)]/5 p-4 flex items-start gap-3">
      <Icon className="w-5 h-5 text-[var(--accent-danger)] flex-shrink-0 mt-0.5" />
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function KoreaServerPage() {
  return (
    <PageLayout
      title="AION 2 vor Global-Release spielen"
      subtitle="Informationen zum Zugang der koreanischen und taiwanesischen Server"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 space-y-10">
        {/* Intro Banner */}
        <div className="rounded-xl border border-[var(--accent-aether)]/20 bg-[var(--accent-aether)]/5 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-6 h-6 text-[var(--accent-aether)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Kurzfazit
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Der globale Release von AION 2 ist für <strong className="text-[var(--text-primary)]">September 2026</strong> angekündigt. Die koreanischen (KR) und taiwanesischen (TW) Server laufen bereits. Für deutsche Spieler kann der Zugang zu den asiatischen Servern aufgrund regionaler Beschränkungen und Verifikationsanforderungen schwierig oder unmöglich sein.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="status-announced">Global: September 2026</Badge>
            <Badge variant="region-kr">KR: Live</Badge>
            <Badge variant="region-tw">TW: Live</Badge>
          </div>
        </div>

        {/* Requirements */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[var(--accent-success)]" />
            Was du brauchst
          </h2>
          <InfoBox>
            Folgende Voraussetzungen sollten erfüllt sein, um AION 2 auf den
            koreanischen Servern zu spielen:
          </InfoBox>
          <ul className="mt-4 space-y-3">
            {[
              "Ein kompatibler PC, der die Systemanforderungen von AION 2 erfüllt",
              "Eine stabile Internetverbindung",
              "Einen NCSoft- bzw. PURPLE-Account (soweit offiziell verfügbar)",
              "Möglicherweise eine koreanische Telefonnummer oder Identitätsverifikation",
              "Geduld mit einer vollständig koreanischen Benutzeroberfläche",
              "Akzeptanz einer deutlich höheren Latenz als auf europäischen Servern",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[var(--text-secondary)]"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent-success)]/15 text-[var(--accent-success)] flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Account and Verification */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[var(--accent-elyos)]" />
            Account und Verifikation
          </h2>
          <InfoBox>
            Koreanische Onlinedienste verlangen häufig eine Verifikation über
            koreanische Telefonnummern oder nationale Identitätsnachweise (z. B.
            i-PIN). Dies ist ein regulärer Sicherheitsprozess und keine
            technische Hürde, die umgangen werden sollte.
          </InfoBox>
          <DangerBox>
            <strong className="text-[var(--text-primary)]">
              Keine Account-Kauf- oder Miet-Anleitungen:
            </strong>{" "}
            Diese Seite bietet keine Anleitung zum Kaufen oder Mieten fremder
            Accounts. Das Nutzen fremder Identitäten verstößt gegen die
            Nutzungsbedingungen von NCSoft und kann zur permanenten Sperrung
            führen.
          </DangerBox>
          <WarningBox>
            <strong className="text-[var(--text-primary)]">
              Keine Umgehung von KYC oder Region-Locks:
            </strong>{" "}
            Wenn eine offizielle Registrierung aus Deutschland nicht möglich
            ist, handelt es sich um eine beabsichtigte regionsbasierte
            Einschränkung – nicht um ein technisches Problem, das gelöst werden
            muss.
          </WarningBox>
        </section>

        {/* Client and Launcher */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-[var(--accent-aether)]" />
            Client und Launcher
          </h2>
          <InfoBox icon={Shield}>
            Der einzige offizielle Weg, AION 2 zu spielen, führt über den
            NCSoft PURPLE Launcher oder Steam (bei globalem Release). Lade
            Spiele-Clients ausschließlich von offiziellen Quellen herunter.
          </InfoBox>
          <DangerBox>
            <strong className="text-[var(--text-primary)]">
              Keine Drittanbieter-Downloads:
            </strong>{" "}
            Verwende keine inoffiziellen Download-Quellen, Cracks, Repacks oder
            modifizierte Launcher. Diese bergen erhebliche Sicherheitsrisiken
            (Malware, Keylogger) und verstoßen gegen die
            Nutzungsbedingungen.
          </DangerBox>
        </section>

        {/* Language */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Languages className="w-5 h-5 text-[var(--accent-asmodian)]" />
            Sprache
          </h2>
          <InfoBox>
            Der koreanische Client enthält ausschließlich koreanische Texte.
            Deutsche Übersetzungen oder Begriffe sind vor dem Global Release
            nicht garantiert. Einige Community-Tools bieten möglicherweise
            maschinelle Übersetzungen an – diese sind jedoch ungenau und
            ohne Gewähr.
          </InfoBox>
        </section>

        {/* Latency and Playability */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-[var(--accent-warning)]" />
            Latenz und Spielbarkeit
          </h2>
          <WarningBox>
            Die Verbindung von Deutschland nach Korea bedeutet eine deutlich
            höhere Latenz (Ping) als auf europäischen Servern. Während PvE-
            Inhalte diese Latenz teilweise tolerieren, können PvP-Kämpfe,
            präzises Ausweichen und Animation Cancelling darunter leiden.
          </WarningBox>
          <div className="mt-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              Geschätzte Latenzen
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-3">Grobe Netzwerkschätzung, keine garantierte Messung.</p>
            <div className="space-y-2">
              {[
                { label: "Deutschland → Korea", value: "180–250 ms", color: "var(--accent-warning)" },
                { label: "Deutschland → europäische Server", value: "20–50 ms", color: "var(--accent-success)" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-[var(--text-secondary)]">
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[var(--accent-elyos)]" />
            Bezahlung und Shop
          </h2>
          <InfoBox>
            Regionale Zahlungsmethoden können für den koreanischen Shop
            erforderlich sein. Internationale Kreditkarten werden möglicherweise
            nicht akzeptiert.
          </InfoBox>
          <DangerBox>
            <strong className="text-[var(--text-primary)]">
              Keine Umgehungsanleitungen:
            </strong>{" "}
            Diese Seite bietet keine Anleitungen zur Umgehung regionaler
            Zahlungsbeschränkungen.
          </DangerBox>
          <DangerBox>
            <strong className="text-[var(--text-primary)]">
              Keine Graumarkt-Empfehlungen:
            </strong>{" "}
            Wir empfehlen keine Drittanbieter-Websites für Guthaben,
            Geschenkkarten oder ähnliche Produkte. Graumarkt-Käufe bergen das
            Risiko von Betrug und können zu Accountsperren führen.
          </DangerBox>
        </section>

        {/* Risks */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[var(--accent-danger)]" />
            Risiken
          </h2>
          <WarningBox>
            Das Spielen auf koreanischen Servern als deutscher Spieler birgt
            mehrere Risiken, die du vorab verstehen solltest:
          </WarningBox>
          <ul className="mt-4 space-y-3">
            {[
              {
                title: "Nutzungsbedingungsverstoß",
                desc: "Das Umgehen von Regionslocks kann als Verstoß gegen die NCSoft-Nutzungsbedingungen gewertet werden.",
              },
              {
                title: "Accountverlust",
                desc: "Bei Entdeckung kann der Account permanent gesperrt werden – ohne Möglichkeit der Wiederherstellung.",
              },
              {
                title: "Kein Support",
                desc: "Deutscher Support ist für koreanische Accounts nicht verfügbar. Kommunikation erfolgt auf Koreanisch.",
              },
              {
                title: "Sprachbarriere",
                desc: "Alle Inhalte, Patch Notes und Kundendienst-Kommunikation sind auf Koreanisch.",
              },
              {
                title: "Kein Transfer",
                desc: "Ein Account- oder Charakter-Transfer zur EU/Global-Version ist nicht garantiert und höchst unwahrscheinlich.",
              },
              {
                title: "Sperren",
                desc: "IP- oder regionsbasierte Sperren können jederzeit ohne Vorwarnung eingeführt werden.",
              },
            ].map((risk, i) => (
              <li
                key={i}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-4"
              >
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {risk.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {risk.desc}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Recommendation */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--accent-success)]" />
            Empfehlung
          </h2>
          <InfoBox icon={CheckCircle}>
            <strong className="text-[var(--text-primary)]">
              Wer legal und stressfrei spielen möchte:
            </strong>{" "}
            Warte auf den globalen Release im September 2026. Laut Steam
            sind deutsche Oberfläche und deutsche Untertitel angekündigt. Für
            deutsche Spieler sind außerdem voraussichtlich bessere Latenz,
            regulärere Support-/Zahlungskanäle und weniger Account-Risiken zu
            erwarten als beim Spielen über koreanische Server.
          </InfoBox>
          <WarningBox>
            <strong className="text-[var(--text-primary)]">
              Wer trotzdem die KR-Version testen möchte:
            </strong>{" "}
            Nutze ausschließlich offizielle Wege über NCSoft/PURPLE. Versuche
            nicht, Verifikationssysteme oder Regionslocks zu umgehen. Diese
            Seite bietet keine Hilfe beim Umgehen von Zugangsbeschränkungen.
          </WarningBox>
        </section>

        {/* Sources */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--text-muted)]" />
            Quellen und Stand
          </h2>
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-4 space-y-3">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Relevante Quellen:</strong>
            </p>
            <ul className="space-y-2">
              {sources
                .filter((s) => ["steam-aion2", "aion2-official-kr", "ncsoft-2025-11-18-launch"].includes(s.id))
                .map((source) => (
                  <li key={source.id} className="flex items-start gap-2">
                    <ExternalLink size={14} className="text-[var(--accent-aether)] mt-0.5 flex-shrink-0" />
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--accent-aether)] hover:underline"
                    >
                      {source.title}
                    </a>
                    <span className="text-xs text-[var(--text-muted)]">({source.publisher})</span>
                  </li>
                ))}
            </ul>
            <p className="text-sm text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
              <strong className="text-[var(--text-primary)]">Letzte Prüfung:</strong>{" "}
              03.07.2026
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
