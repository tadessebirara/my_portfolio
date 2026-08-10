import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.36em] text-sky-600">
          Page not found
        </p>
        <h1 className="mt-6 text-4xl font-semibold">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-100">
          The page you were looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
