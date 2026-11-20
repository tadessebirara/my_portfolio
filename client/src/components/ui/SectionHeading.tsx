interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";

  return (
    <div className={`mb-12 md:mb-16 flex max-w-3xl flex-col ${alignment}`}>
      <span className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
        {label}
      </span>

      <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>

      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
