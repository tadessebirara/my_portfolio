import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.03] text-[#a1a1aa]",
        accent: "border-white/10 bg-blue-500/10 text-[#60a5fa]",
        academic: "border-blue-500/25 bg-blue-500/10 text-[#60a5fa]",
        prototype: "border-yellow-500/25 bg-yellow-500/10 text-[#fbbf24]",
        "in-development": "border-orange-500/25 bg-orange-500/10 text-[#fb923c]",
        production: "border-emerald-500/25 bg-emerald-500/10 text-[#34d399]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { cn, badgeVariants };
