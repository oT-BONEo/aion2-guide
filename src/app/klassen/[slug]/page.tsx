import { classes, getClassBySlug } from "@/data/classes";
import { builds } from "@/data/builds";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { KlassenDetailClient } from "./KlassenDetailClient";
import { getRatingByClassId } from "@/data/class-ratings";

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cls = getClassBySlug(slug);
  if (!cls)
    return {
      title: "Klasse nicht gefunden – AION 2 Klassenfinder",
    };
  return {
    title: `${cls.names.deProvisional} – AION 2 Klassenfinder`,
    description: cls.summary,
  };
}

export default async function KlassenDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cls = getClassBySlug(slug);
  if (!cls) notFound();

  const classBuilds = builds.filter((b) => b.classId === cls.id);
  const otherClasses = classes.filter((c) => c.id !== cls.id);
  const classRating = getRatingByClassId(cls.id);

  return (
    <KlassenDetailClient
      cls={cls}
      classBuilds={classBuilds}
      otherClasses={otherClasses}
      classRating={classRating}
    />
  );
}
