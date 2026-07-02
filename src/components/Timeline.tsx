import { motion, useReducedMotion } from "motion/react";
import { TIMELINE } from "../data";

export default function Timeline() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      }
    : {
        hidden: { opacity: 0, x: -12 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
      };

  return (
    <section id="timeline" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-28 bg-cream border-t border-hairline">
      <div className="flex flex-col space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="font-serif text-xs uppercase tracking-widest text-muted-ink">
            Professional History
          </h2>
          <p className="font-serif text-3xl font-normal text-ink mt-2 md:text-4xl">
            Career Timeline
          </p>
          <p className="font-body text-base text-muted-ink italic mt-2">
            A history of driving compound performance and growth across diverse sectors.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-hairline pl-6 md:pl-10 ml-2 md:ml-6" id="timeline-vertical">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {TIMELINE.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative flex flex-col space-y-3"
              >
                {/* Timeline node/dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-terracotta bg-cream">
                  <div className="h-1.5 w-1.5 rounded-full bg-terracotta"></div>
                </div>

                {/* Date / Metadata header */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-serif text-sm font-semibold text-terracotta">
                    {item.period}
                  </span>
                  <span className="font-body text-xs text-muted-ink">•</span>
                  <span className="font-body text-sm text-muted-ink">
                    {item.location}
                  </span>
                </div>

                {/* Role & Company Header */}
                <div>
                  <h3 className="font-serif text-xl font-medium text-ink md:text-2xl">
                    {item.role}
                  </h3>
                  <p className="font-serif text-base text-muted-ink italic mt-0.5">
                    {item.company}
                  </p>
                </div>

                {/* Key Achievements Bullet List */}
                <ul className="space-y-2.5 pt-2 max-w-4xl">
                  {item.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2.5">
                      <span className="text-terracotta mt-1.5 text-[8px]">•</span>
                      <p className="font-body text-base text-ink leading-relaxed">
                        {highlight}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
