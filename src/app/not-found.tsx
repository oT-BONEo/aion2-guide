import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-abyss px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-aether">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-textPrimary">
          Seite nicht gefunden
        </h2>
        <p className="mb-8 max-w-md text-textSecondary">
          Die angeforderte Seite existiert nicht.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-aether px-6 py-3 font-medium text-abyss transition-opacity hover:opacity-90"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
