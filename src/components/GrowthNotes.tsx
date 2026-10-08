import { motion } from "motion/react";
import SectionHeader from "./ui/SectionHeader";
import { GROWTH_NOTES } from "../data";
import { useStagger } from "../lib/motion";

/**
 * Field notes. Three paragraphs, numbered like a printed column, with a rule
 * that extends and the whole card lifting a few pixels on hover.
 */
export default function GrowthNotes() {
  const { container, item } = useStagger(0.09);

  return (
    <section id="growth-notes" className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <SectionHeader
          folio="09"
          eyebrow="Strategic Insights"
          title="Growth Notes"
          intro="Brief observations on modern marketing architecture, measurement, and channel velocity."
        />

        <motion.div
          id="growth-notes-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8% 0px -12% 0px" }}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {GROWTH_NOTES.map((note, index) => (
            <motion.article
              key={note.id}
              variants={item}
              className="group flex flex-col border border-hairline bg-paper/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-terracotta hover:shadow-[0_20px_44px_-34px_rgba(31,27,23,0.6)]"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
                <span className="font-mono text-[10px] tracking-[0.18em] text-terracotta tnum">
                  VOL. {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-ink/70">
                  Observation
                </span>
              </div>

              <h3 className="mt-6 font-serif text-[1.2rem] font-medium leading-snug text-ink">
                &ldquo;{note.title}&rdquo;
              </h3>

              <p className="mt-4 font-body text-[0.96rem] leading-relaxed text-muted-ink">
                {note.content}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
