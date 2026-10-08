import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SectionHeader from "./ui/SectionHeader";
import Mark from "./ui/Mark";
import { CASE_STUDIES } from "../data";
import type { CaseStudy } from "../types";
import { DUR, EASE_OUT, EASE_IO, track } from "../lib/motion";

/**
 * Selected work, set as a case ledger.
 *
 * Every case file stays in the document at all times — collapsing only changes
 * height — so the full detail is readable by crawlers and assistive tech, and
 * the plus/minus is drawn by hand rather than borrowed from an icon set.
 */
export default function SelectedWork() {
  // Every case file starts closed: the mark then reads "+" on every row, which
  // is the actual invitation to open one. Starting with a row expanded showed a
  // "−" before the visitor had done anything.
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (study: CaseStudy) => {
    setOpenId((current) => {
      const next = current === study.id ? null : study.id;
      if (next) track("case_study_open", { project: study.title });
      return next;
    });
  };

  return (
    <section id="work" className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <SectionHeader
          folio="04"
          eyebrow="Selected Work"
          title="Case Studies & Strategic Outcomes"
          intro="Click any project row to expand details including tools, interventions, and exact mathematical outcomes."
        />

        <div id="case-studies-accordion" className="mt-14 border-t border-hairline">
          {CASE_STUDIES.map((study, index) => (
            <CaseRow
              key={study.id}
              study={study}
              index={index}
              isOpen={openId === study.id}
              onToggle={() => toggle(study)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseRow({
  study,
  index,
  isOpen,
  onToggle,
}: {
  study: CaseStudy;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-5% 0px -10% 0px" }}
      transition={{ duration: DUR.base, delay: Math.min(index * 0.05, 0.2) }}
      className="border-b border-hairline"
    >
      <button
        type="button"
        id={`case-study-trigger-${study.id}`}
        aria-expanded={isOpen}
        aria-controls={`case-study-details-${study.id}`}
        onClick={onToggle}
        className="group relative flex w-full cursor-pointer items-start justify-between gap-6 py-7 text-left md:items-center md:py-8"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />

        <span className="flex min-w-0 flex-1 items-start gap-5 md:gap-8">
          <span
            className={`mt-[0.35rem] font-mono text-[10px] tracking-[0.2em] tnum transition-colors duration-300 md:mt-[0.55rem] ${
              isOpen ? "text-terracotta" : "text-muted-ink/60"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="flex min-w-0 flex-col gap-1">
            <span
              className={`font-serif text-[1.45rem] font-medium leading-tight transition-colors duration-300 md:text-[1.85rem] ${
                isOpen
                  ? "text-terracotta"
                  : "text-ink group-hover:text-terracotta"
              }`}
            >
              {study.title}
            </span>
            <span className="font-body text-sm italic text-muted-ink md:text-[0.98rem]">
              {study.subtitle}
            </span>
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-4 pt-1 md:pt-0">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted-ink transition-colors duration-300 group-hover:text-ink lg:block">
            {isOpen ? "Collapse Details" : "Expand Details"}
          </span>
          <Mark open={isOpen} />
        </span>
      </button>

      <motion.div
        id={`case-study-details-${study.id}`}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                height: { duration: 0.52, ease: EASE_IO },
                opacity: { duration: isOpen ? 0.4 : 0.2, ease: EASE_OUT },
              }
        }
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <div className="grid gap-x-14 gap-y-10 pb-12 lg:grid-cols-12">
          {/* left column — brief */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <Field label="Context & Objective">
              <p className="font-body text-[0.98rem] leading-relaxed text-ink">
                {study.context}
              </p>
            </Field>

            <Field label="Scope of Engagement">
              <ul className="flex flex-col">
                {study.scope.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 border-b border-hairline py-2.5 last:border-b-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.45em] h-[5px] w-[5px] shrink-0 rotate-45 bg-terracotta/70"
                    />
                    <span className="font-body text-[0.9rem] leading-snug text-muted-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Field>

            <Field label="Technical Stack & Core Tools">
              <div className="flex flex-wrap gap-2">
                {study.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-ink transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Field>
          </div>

          {/* right column — work and result */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            <Field label="Strategic Interventions">
              <ol className="flex flex-col gap-5">
                {study.interventions.map((item, i) => (
                  <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span className="font-serif text-[1.6rem] leading-none text-terracotta/35 tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-body text-[0.99rem] leading-relaxed text-ink">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
            </Field>

            <div className="dark-band bg-deep-charcoal px-6 py-7 md:px-8 md:py-8">
              <p className="eyebrow text-[#E2D9CC]/75">Measurable Outcomes</p>
              <ul className="mt-5 flex flex-col gap-4">
                {study.outcomes.map((item, i) => (
                  <li key={item} className="flex gap-4">
                    <motion.span
                      aria-hidden="true"
                      className="mt-1 w-[2px] shrink-0 origin-top bg-terracotta"
                      initial={false}
                      animate={{ scaleY: isOpen ? 1 : 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : {
                              duration: 0.5,
                              delay: isOpen ? 0.18 + i * 0.07 : 0,
                              ease: EASE_OUT,
                            }
                      }
                      style={{ alignSelf: "stretch" }}
                    />
                    <p className="font-body text-[0.97rem] leading-relaxed text-cream">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="eyebrow">{label}</p>
      {children}
    </div>
  );
}
