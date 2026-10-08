import { motion } from "motion/react";
import SectionHeader from "./ui/SectionHeader";
import { SERVICES } from "../data";
import { useStagger, track } from "../lib/motion";

/**
 * Engagements, set as a divided menu.
 *
 * Hairline gutters instead of card shadows; on hover each panel inverts to ink
 * so the deliverable list is the thing you actually read.
 */
export default function Services() {
  const { container, item } = useStagger(0.09);

  return (
    <section id="services" className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <SectionHeader
          folio="06"
          eyebrow="Services"
          title="Strategic Engagements"
          intro="Structured engagement frameworks designed for immediate clarity and compound growth."
        />

        <motion.div
          id="services-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8% 0px -12% 0px" }}
          className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2"
        >
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              variants={item}
              className="group flex flex-col justify-between bg-cream p-7 transition-colors duration-500 hover:bg-ink md:p-10"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-[1.4rem] font-medium leading-snug text-ink transition-colors duration-500 group-hover:text-cream md:text-[1.6rem]">
                    {service.title}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-ink/60 transition-colors duration-500 group-hover:text-ember tnum">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-6 border-l-2 border-terracotta pl-4">
                  <p className="eyebrow transition-colors duration-500 group-hover:text-[#E2D9CC]/70">
                    Best For
                  </p>
                  <p className="mt-2 font-body text-[0.97rem] italic leading-relaxed text-muted-ink transition-colors duration-500 group-hover:text-[#E2D9CC]">
                    {service.bestFor}
                  </p>
                </div>

                <div className="mt-7 border-t border-hairline pt-5 transition-colors duration-500 group-hover:border-[#E2D9CC]/25">
                  <p className="eyebrow transition-colors duration-500 group-hover:text-[#E2D9CC]/70">
                    Key Deliverables
                  </p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.whatYouGet.map((entry) => (
                      <li key={entry} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.5em] h-[5px] w-[5px] shrink-0 rotate-45 bg-terracotta transition-colors duration-500 group-hover:bg-ember"
                        />
                        <span className="font-body text-[0.95rem] leading-relaxed text-ink transition-colors duration-500 group-hover:text-cream/90">
                          {entry}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-9">
                <a
                  href="#contact"
                  onClick={() =>
                    track("service_cta_click", { service: service.title })
                  }
                  className="group/link inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta transition-colors duration-500 group-hover:text-ember"
                >
                  Request Proposal
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover/link:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
