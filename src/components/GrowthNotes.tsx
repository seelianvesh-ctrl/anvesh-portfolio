import { motion, useReducedMotion } from "motion/react";
import { GROWTH_NOTES } from "../data";

export default function GrowthNotes() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      };

  return (
    <section id="growth-notes" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-28 bg-cream border-t border-hairline">
      <div className="flex flex-col space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="font-serif text-xs uppercase tracking-widest text-muted-ink">
            Strategic Insights
          </h2>
          <p className="font-serif text-3xl font-normal text-ink mt-2 md:text-4xl">
            Growth Notes
          </p>
          <p className="font-body text-base text-muted-ink italic mt-2">
            Brief observations on modern marketing architecture, measurement, and channel velocity.
          </p>
        </div>

        {/* 3 Column Notes Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-x-8 md:gap-y-0"
          id="growth-notes-grid"
        >
          {GROWTH_NOTES.map((note, idx) => (
            <motion.div
              key={note.id}
              variants={itemVariants}
              className="flex flex-col p-6 bg-cream border border-hairline relative hover:border-terracotta transition-colors duration-300"
            >
              {/* Publication Style Accent */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-xs italic text-terracotta">
                  VOL. 0{idx + 1}
                </span>
                <span className="font-body text-[10px] tracking-widest uppercase text-muted-ink">
                  Observation
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg font-medium text-ink mb-4 leading-tight">
                “{note.title}”
              </h3>

              {/* Body */}
              <p className="font-body text-base text-muted-ink leading-relaxed">
                {note.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
