import AnimatedSection from "../ui/AnimatedSection";
import SectionHeading from "../ui/SectionHeading";

const values = [
  {
    title: "Problem-Solving Mindset",
    description: "I start with the business problem, not the technology. Every solution is rooted in understanding the challenge first.",
  },
  {
    title: "Business-Focused Thinking",
    description: "I speak your language. Technical decisions are explained in plain terms that align with your goals and constraints.",
  },
  {
    title: "Clean, Maintainable Code",
    description: "Code that is readable, tested where it matters, and easy for others to maintain and extend.",
  },
  {
    title: "Modern Technologies",
    description: "React, TypeScript, Node.js, PostgreSQL, and Flutter — chosen for the right reasons, not just because they&apos;re popular.",
  },
  {
    title: "Clear Communication",
    description: "Regular updates, honest timelines, and no jargon without explanation. You always know where your project stands.",
  },
  {
    title: "Scalable Solutions",
    description: "Architecture designed to grow with your business, not break under pressure.",
  },
];

export default function WhyMe() {
  return (
    <section id="why-me" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <SectionHeading
            label="Why Work With Me"
            title="Engineering That Serves Your Business"
            description="Principles that guide every project I take on."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <AnimatedSection key={value.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] mb-5">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <h3 className="text-lg font-medium text-[#fafafa] mb-3 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
