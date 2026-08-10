import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.3)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)]",
        className,
      )}
      style={{ backgroundColor: "var(--surface)" }}
    >
      {children}
    </div>
  );
}
