import { motion, useReducedMotion } from "motion/react";
import { scrollToSection } from "../../lib/motion";
import { useActiveSection, useScrollY } from "../../lib/scroll";

/**
 * Chapter rail.
 *
 * A column of ticks in the right gutter — the same words the navigation uses,
 * kept as a quiet index rather than a second menu. Labels only appear on
 * hover/focus, so the rail never sits on top of the reading column.
 */
type Chapter = { id: string; label: string };

const CHAPTERS: Chapter[] = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "services", label: "Services" },
  { id: "timeline", label: "Timeline" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export default function ChapterRail() {
  const reduce = useReducedMotion();
  const active = useActiveSection();
  const y = useScrollY();
  const visible = y > 320;

  return (
    <nav
      aria-label="Page sections"
      className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-700 xl:flex no-print ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {CHAPTERS.map((chapter) => {
        const isActive = active === chapter.id;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollToSection(chapter.id)}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex h-3.5 w-9 cursor-pointer items-center justify-end"
          >
            <span className="sr-only">{chapter.label} section</span>

            <motion.span
              className={`block h-px ${
                isActive
                  ? "bg-terracotta"
                  : "bg-muted-ink/35 group-hover:bg-muted-ink/70"
              }`}
              animate={{ width: isActive ? 26 : 12 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
              }
            />

            <span
              aria-hidden="true"
              className={`pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap border border-hairline bg-paper px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 translate-x-1`}
            >
              {chapter.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
