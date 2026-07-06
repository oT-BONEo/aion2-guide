import { classes, getClassBySlug } from "@/data/classes";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BuildPlannerClient } from "./BuildPlannerClient";

interface PageProps {
  params: Promise<{ classSlug: string }>;
}

export async function generateStaticParams() {
  return classes.map((cls) => ({ classSlug: cls.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { classSlug } = await params;
  const cls = getClassBySlug(classSlug);
  if (!cls) return {};
  return {
    title: `Build-Planner – ${cls.names.deProvisional}`,
    description: `Vorläufiger Gear-Simulator für ${cls.names.deProvisional}. Papierwerte, keine DPS-Berechnung.`,
  };
}

export default async function BuildPlannerPage({ params }: PageProps) {
  const { classSlug } = await params;
  const cls = getClassBySlug(classSlug);
  if (!cls) notFound();

  return <BuildPlannerClient cls={cls} />;
}
