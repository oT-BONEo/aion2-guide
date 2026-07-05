import Link from "next/link";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { gearCategories, getGearCategoryById } from "@/data/gear";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight, AlertTriangle } from "lucide-react";

export function generateStaticParams() {
  return gearCategories.map((cat) => ({ slug: cat.id }));
}

interface GearDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function GearDetailPage({ params }: GearDetailPageProps) {
  const { slug } = await params;
  const category = getGearCategoryById(slug);

  if (!category) {
    notFound();
  }

  return (
    <PageLayout title={`${category.titleDe} – Ausrüstungs-Guide`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <Link href="/ausruestung/" className="hover:text-[var(--accent-aether)] transition-colors">
            Ausrüstung
          </Link>
          <ChevronRight size={14} />
          <span className="text-[var(--text-secondary)]">{category.titleDe}</span>
        </nav>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] font-serif">
            {category.titleDe}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{category.titleEn}</p>
        </div>

        {/* Research Draft Banner */}
        <div className="rounded-lg border border-[var(--accent-warning)]/20 bg-[var(--accent-warning)]/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-[var(--accent-warning)] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Research-Entwurf – nicht final</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Diese Seite enthält keine vollständigen Item-Listen, Drop-Chancen oder Farm-Routen.
                Detaillierte Inhalte folgen nach dem Global Release, wenn sie aus dem Client oder belastbaren Quellen bestätigt werden.
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] font-serif mb-3">
            Beschreibung
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Items Placeholder */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] font-serif mb-3">
            Items
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            Bisher sind keine Items hinterlegt. Konkrete Item-Listen und Verfügbarkeiten
            folgen nach dem Global Release, wenn sie aus dem Client oder belastbaren Quellen bestätigt werden.
          </p>
          <Badge variant="confidence-experimental" className="text-[10px]">
            Platzhalter
          </Badge>
        </div>

        {/* Back */}
        <div className="pt-4">
          <Link
            href="/ausruestung/"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent-aether)] hover:underline"
          >
            <ChevronRight size={16} className="rotate-180" />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
