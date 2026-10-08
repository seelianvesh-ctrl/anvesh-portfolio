import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

/**
 * Chapter header used by the editorial sections.
 *
 * Print-style masthead: folio numeral, a rule that draws itself in, the section
 * label and a real <h2>. The label text is exactly what the site already used —
 * only its typographic treatment changed.
 */
type SectionHeaderProps = {
  folio: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** Places the intro beside the title instead of beneath it. */
  layout?: "stacked" | "split";
  tone?: "light" | "dark";
};

export default function SectionHeader({
  folio,
  eyebrow,
  title,
  intro,
  layout = "split",
  tone = "light",
}: SectionHeaderProps) {
  const reduce = useReducedMotion();
  const ruleRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ruleRef,
    offset: ["start 0.92", "start 0.6"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const dark = tone === "dark";

  return (
    <header className="flex flex-col gap-7">
      <div className="flex items-center gap-4">
        <span className={`folio ${dark ? "text-ember" : ""}`}>{folio}</span>
        <span
          ref={ruleRef}
          className={`relative h-px flex-1 overflow-hidden ${
            dark ? "bg-hairline-dark" : "bg-hairline"
          }`}
        >
          <motion.span
            className={`absolute inset-0 origin-left ${
              dark ? "bg-ember" : "bg-terracotta"
            }`}
            style={{ scaleX: reduce ? 1 : scaleX }}
          />
        </span>
        <span className={`eyebrow ${dark ? "text-[#E2D9CC]/70" : ""}`}>
          {eyebrow}
        </span>
      </div>

      <div
        className={
          layout === "split" && intro
            ? "grid gap-x-12 gap-y-5 md:grid-cols-12"
            : "flex flex-col gap-4"
        }
      >
        <h2
          className={`display-2 ${
            layout === "split" && intro ? "md:col-span-6" : ""
          } ${dark ? "text-cream" : "text-ink"}`}
        >
          {title}
        </h2>
        {intro ? (
          <p
            className={`lede md:col-span-5 md:col-start-8 ${
              dark ? "text-[#E2D9CC]/80" : ""
            }`}
          >
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
