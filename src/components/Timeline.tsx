import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import SectionHeader from "./ui/SectionHeader";
import { TIMELINE } from "../data";
import { useActiveIndex } from "../lib/motion";

/**
 * Career history as a dated ledger. The rule fills with the scroll and the
 * entry you are reading is the one that carries the terracotta mark.
 */
export default function Timeline() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { active, setRef } = useActiveIndex(TIMELINE.length, 0.44);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.9"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <SectionHeader
          folio="07"
          eyebrow="Professional History"
          title="Career Timeline"
          intro="A history of driving compound performance and growth across diverse sectors."
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-full w-px bg-hairline md:block"
          >
            <motion.span
              className="absolute inset-0 origin-top bg-terracotta"
              style={{ scaleY: reduce ? 1 : fill }}
            />
          </div>

          <ol ref={listRef} className="md:pl-14">
            {TIMELINE.map((entry, index) => {
              const isActive = active === index;
              return (
                <motion.li
                  key={entry.id}
                  ref={setRef(index)}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px -12% 0px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid gap-x-10 gap-y-3 border-b border-hairline py-9 last:border-b-0 md:grid-cols-[9.5rem_1fr] md:py-10"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-14 top-[3.15rem] hidden h-2 w-2 -translate-x-1/2 rotate-45 transition-all duration-500 md:block ${
                      isActive
                        ? "scale-125 bg-terracotta"
                        : "bg-hairline"
                    }`}
                  />

                  <div className="flex flex-row items-baseline gap-3 md:flex-col md:items-start md:gap-1.5">
                    <p
                      className={`font-mono text-[11px] tracking-[0.1em] transition-colors duration-500 tnum ${
                        isActive ? "text-terracotta" : "text-muted-ink"
                      }`}
                    >
                      {entry.period}
                    </p>
                    <p className="font-mono text-[11px] tracking-[0.06em] text-muted-ink/70">
                      {entry.location}
                    </p>
                  </div>

                  <div className="max-w-[60rem]">
                    <h3 className="font-serif text-[1.3rem] font-medium leading-snug text-ink md:text-[1.55rem]">
                      {entry.role}
                    </h3>
                    <p className="mt-1 font-body text-[0.98rem] italic text-muted-ink">
                      {entry.company}
                    </p>

                    <ul className="mt-5 flex flex-col gap-3">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-baseline gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.5em] h-[5px] w-[5px] shrink-0 rotate-45 bg-terracotta/60"
                          />
                          <p className="font-body text-[0.97rem] leading-relaxed text-ink/90">
                            {highlight}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
