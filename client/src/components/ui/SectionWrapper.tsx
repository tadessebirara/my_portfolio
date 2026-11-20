import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <div className={className}>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </div>
  );
}
