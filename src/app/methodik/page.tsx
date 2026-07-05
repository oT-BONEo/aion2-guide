"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Swords,
  Globe,
  Users,
  CheckCircle,
  BarChart3,
  Zap,
  HeartHandshake,
  FlaskConical,
  ShieldAlert,
  MessageSquare,
  CalendarClock,
  ListOrdered,
  ArrowRight,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SectionCard({
  icon: Icon,
  iconColor,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  iconColor: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6"
    >
      <h2 className="text-lg font-semibold text-[var(--text-primary)] font-serif mb-4 flex items-center gap-2">
        <span className={`w-8 h-8 rounded-lg ${iconColor}/10 flex items-center justify-center`}>
          <Icon size={18} className={iconColor.replace("bg-", "text-")} />
        </span>
        {title}
      </h2>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
        {children}
      </div>
    </motion.section>
  );
}

function InfoBox({ children, variant = "info" }: { children: React.ReactNode; variant?: "info" | "warning" | "success" }) {
  const styles = {
    info: "border-[var(--accent-aether)]/20 bg-[var(--accent-aether)]/5",
    warning: "border-[var(--accent-warning)]/20 bg-[var(--accent-warning)]/5",
    success: "border-[var(--accent-success)]/20 bg-[var(--accent-success)]/5",
  };
  return (
    <div className={`rounded-lg border ${styles[variant]} p-4 text-xs text-[var(--text-secondary)] leading-relaxed`}>
      {children}
    </div>
  );
}

export default function MethodikPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="confidence-community" className="mb-4">Transparenz</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] font-serif">
              Wie wir bewerten
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Methodik, Datenstand und Transparenz beim AION 2 Klassenvergleich
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 space-y-6">

        {/* 1. Warum keine Tier-List */}
        <SectionCard icon={ListOrdered} iconColor="bg-[var(--accent-aether)]" title="Warum diese Seite keine reine Tier-List ist">
          <p>Tier-Listen suggerieren eine falsche Sicherheit. Sie ordnen Klassen in starre Rangfolgen ein ohne den Kontext von Spielstil, Gear-Stand und Content-Vorlieben zu berücksichtigen. Eine Klasse, die in Mass-PvP stark ist, kann im Solo-PvE durchschnittlich wirken – und umgekehrt.</p>
          <p>Stattdessen zeigen wir relative Einschätzungen mit Kontext. Jede Bewertung enthält eine Begründung, eine Confidence-Angabe und einen Quellenbezug. So kannst du selbst entscheiden, welche Klasse zu deinem Spielstil passt.</p>
        </SectionCard>

        {/* 2. Relative Skala */}
        <SectionCard icon={BarChart3} iconColor="bg-[var(--accent-elyos)]" title="Relative 1–5-Skala">
          <p>Unsere Bewertungen nutzen eine relative Skala von 1 bis 5:</p>
          <ul className="space-y-2 mt-2">
            <li className="flex items-start gap-2">
              <span className="font-bold text-[var(--accent-success)] shrink-0">5/5</span>
              <span>Innerhalb des aktuellen Klassenvergleichs besonders stark oder hoch.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[var(--text-muted)] shrink-0">3/5</span>
              <span>Mittlere Position im Vergleich. Solide, aber nicht herausragend.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[var(--accent-danger)] shrink-0">1/5</span>
              <span>Innerhalb des aktuellen Vergleichs eher schwach oder niedrig.</span>
            </li>
          </ul>
          <InfoBox>
            Bei „Mechanischer Anspruch“ bedeutet 5/5 „sehr anspruchsvoll“ – nicht „besser“. Ein hoher Wert ist kein Qualitätsmerkmal, sondern ein Hinweis auf die Komplexität der Klasse.
          </InfoBox>
        </SectionCard>

        {/* 3. Mindestens eine 5/5 */}
        <SectionCard icon={CheckCircle} iconColor="bg-[var(--accent-success)]" title="Warum mindestens eine Klasse pro Kriterium 5/5 haben sollte">
          <p>Wenn Klassen relativ verglichen werden, sollte mindestens eine Klasse pro Kriterium die höchste Bewertung erreichen. Sonst wäre die Skala nicht ausgeschöpft und der Vergleich würde an Aussagekraft verlieren.</p>
          <p>Beispiel: Wenn keine Klasse Solo-PvE 5/5 hat, fehlt der Vergleichsmaßstab. Spieler können nicht erkennen, welche Klasse aktuell den besten Ausgangspunkt für Solo-Content bietet. Die 5/5 dient als Orientierung, nicht als absolutes Qualitätsurteil.</p>
        </SectionCard>

        {/* 4. Anspruch vs Einsteiger */}
        <SectionCard icon={Zap} iconColor="bg-[var(--accent-warning)]" title="Mechanischer Anspruch vs. Einsteigerfreundlichkeit">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-[var(--border-subtle)] p-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                <Swords size={14} className="text-[var(--accent-warning)]" />
                Mechanischer Anspruch
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Wie komplex sind die Inputs? Rotations, Timings, Positionierung, Resource-Management und Combo-Ketten bestimmen diesen Wert.</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] p-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                <HeartHandshake size={14} className="text-[var(--accent-success)]" />
                Einsteigerfreundlichkeit
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Wie leicht ist der Einstieg? Eine klare Rolle, verzeihende Mechaniken und intuitive Fähigkeiten erleichtern den Start.</p>
            </div>
          </div>
          <InfoBox>Eine Klasse kann mechanisch anspruchsvoll sein (hoher Skill-Ceiling), aber für Einsteiger trotzdem zugänglich – wenn die Grundmechanik intuitiv ist und die Rolle klar definiert.</InfoBox>
        </SectionCard>

        {/* 5. PvP getrennt */}
        <SectionCard icon={Swords} iconColor="bg-[var(--accent-danger)]" title="Warum PvP getrennt betrachtet wird">
          <p>PvP-Leistung variiert stark je nach Spieleranzahl und Organisation. Wir unterscheiden drei PvP-Modi:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="rounded-lg border border-[var(--border-subtle)] p-3">
              <h3 className="text-xs font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-1"><Users size={12} className="text-[var(--accent-aether)]" />Solo-PvP</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">1v1 und kleine Scharmützel. Initiativ, Burst und Überlebensfähigkeit sind entscheidend.</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] p-3">
              <h3 className="text-xs font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-1"><ShieldAlert size={12} className="text-[var(--accent-elyos)]" />Team-PvP</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">Organisierte Gruppenkämpfe (3v3, 6v6). Synergie, CC-Ketten und koordinierte Focus-Fire dominieren.</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] p-3">
              <h3 className="text-xs font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-1"><Globe size={12} className="text-[var(--accent-asmodian)]" />Mass-PvP / Abyss</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">Große Schlachten mit Dutzenden Spielern. AoE, Frontline-Stabilität und Gruppen-Utility sind essenziell.</p>
            </div>
          </div>
          <InfoBox>Eine Klasse kann in Solo-PvP sehr stark sein, aber in Mass-PvP schwach wirken. Die Assassine ist ein gutes Beispiel: Burst und Stealth dominieren im Duell, aber fehlende AoE und niedrige Defensive sind in großen Kämpfen ein Nachteil.</InfoBox>
        </SectionCard>

        {/* 6. Community-Konsens */}
        <SectionCard icon={Users} iconColor="bg-[var(--accent-aether)]" title='Was „Community-Konsens“ bedeutet'>
          <p>Bewertungen mit dem Tag „Community-Konsens“ basieren auf Community-Beobachtungen und Datamining aus koreanischen und taiwanesischen Quellen. Sie sind nicht offiziell von NCSoft bestätigt.</p>
          <p>Mehrere unabhängige Quellen zeigen ähnliche Tendenzen, was eine gewisse Zuverlässigkeit suggeriert. Dennoch können sich diese Bewertungen bei neuen Patches oder nach dem Global Release ändern.</p>
        </SectionCard>

        {/* 7. Experimentell */}
        <SectionCard icon={FlaskConical} iconColor="bg-[var(--accent-warning)]" title='Was „Experimentell“ bedeutet'>
          <p>Bewertungen mit dem Tag „Experimentell“ sind vorläufig und basieren auf sehr wenigen Datenpunkten. Diese Bewertungen sollten mit besonderer Vorsicht betrachtet werden.</p>
          <InfoBox variant="warning">Brawler ist aktuell die einzige Klasse mit experimentellen Bewertungen. Die Klasse ist seit KR/TW Chapter 1 verfügbar, aber es gibt noch keine stabilen Meta-Daten oder etablierte Community-Konsense.</InfoBox>
        </SectionCard>

        {/* 8. Brawler */}
        <SectionCard icon={ShieldAlert} iconColor="bg-[var(--accent-danger)]" title="Warum Brawler vorsichtig bewertet wird">
          <p>Brawler ist eine neue Klasse, die mit KR/TW Chapter 1 eingeführt wurde. Es gibt mehrere Gründe für eine vorsichtige Bewertung:</p>
          <ul className="space-y-2 mt-2 list-disc list-inside">
            <li>Wenige etablierte Guides oder getestete Builds</li>
            <li>Die Meta ist noch nicht stabil – Community-Tendenzen ändern sich wöchentlich</li>
            <li>Das Fury/Rage-System und der Berserk-Modus sind komplex und noch nicht vollständig verstanden</li>
            <li>Vergleichsdaten mit anderen Klassen fehlen oder sind lückenhaft</li>
          </ul>
          <p className="mt-2">Alle Brawler-Bewertungen sind daher als experimentell gekennzeichnet und werden nach weiteren Tests und dem Global Release überprüft.</p>
        </SectionCard>

        {/* 9. Testerfeedback */}
        <SectionCard icon={MessageSquare} iconColor="bg-[var(--accent-elyos)]" title="Wie Testerfeedback einfließt">
          <p>Feedback von Spielern wird kontinuierlich gesammelt und fließt in die Bewertungen ein. Nach dem Global Release werden die Ratings mit lokalen Tests überprüft und anhand der Erfahrungen der Community angepasst.</p>
          <p>Wenn du Feedback zu einer Bewertung hast – sei es aus dem KR/TW-Client oder basierend auf Theorie-Crafting – wird dies bei der nächsten Überprüfung berücksichtigt.</p>
        </SectionCard>

        {/* 10. Datenstand */}
        <SectionCard icon={CalendarClock} iconColor="bg-[var(--accent-asmodian)]" title="Aktueller Datenstand">
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
              <span className="text-xs text-[var(--text-muted)]">Region</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">KR/TW</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
              <span className="text-xs text-[var(--text-muted)]">Patch</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">Chapter 1 (01.07.2026)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
              <span className="text-xs text-[var(--text-muted)]">Global Release</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">September 2026 (angekündigt)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
              <span className="text-xs text-[var(--text-muted)]">Deutsche Namen</span>
              <Badge variant="confidence-experimental" className="text-[10px]">Vorläufig</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-[var(--text-muted)]">Builds</span>
              <Badge variant="confidence-community" className="text-[10px]">Recherche-Entwürfe</Badge>
            </div>
          </div>
          <InfoBox variant="warning">Alle Bewertungen basieren auf dem KR/TW-Datenstand und wurden nicht lokal im Global-Client getestet. Nach dem Global Release werden sie mit lokalen Tests überprüft und angepasst.</InfoBox>
        </SectionCard>

        {/* CTA */}
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center pt-8">
          <Link href="/klassen/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-aether)] text-[var(--bg-abyss)] font-semibold text-sm hover:bg-[var(--accent-aether)]/90 transition-colors">
            <ArrowRight size={16} />
            Zum Klassenvergleich
          </Link>
        </motion.div>
      </div>
    </PageLayout>
  );
}
