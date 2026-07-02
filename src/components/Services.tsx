import { motion, useReducedMotion } from "motion/react";
import { SERVICES } from "../data";

export default function Services() {
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
    <section id="services" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-28 bg-cream border-t border-hairline">
      <div className="flex flex-col space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="font-serif text-xs uppercase tracking-widest text-muted-ink">
            Services
          </h2>
          <p className="font-serif text-3xl font-normal text-ink mt-2 md:text-4xl">
            Strategic Engagements
          </p>
          <p className="font-body text-base text-muted-ink italic mt-2">
            Structured engagement frameworks designed for immediate clarity and compound growth.
          </p>
        </div>

        {/* 2x2 Services Grid (No drop-shadows, sharp, modern editorial) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
          id="services-grid"
        >
          {SERVICES.map((srv) => (
            <motion.div
              key={srv.id}
              variants={itemVariants}
              className="flex flex-col justify-between p-6 md:p-8 bg-cream border border-hairline relative hover:border-terracotta transition-colors duration-300"
            >
              <div className="space-y-4">
                {/* Title */}
                <h3 className="font-serif text-2xl font-normal text-ink">{srv.title}</h3>

                {/* Best For block */}
                <div className="border-l-2 border-terracotta pl-3.5 py-0.5">
                  <span className="font-serif text-xs uppercase tracking-widest text-muted-ink block mb-1">
                    Best For
                  </span>
                  <p className="font-body text-base text-muted-ink leading-relaxed italic">
                    {srv.bestFor}
                  </p>
                </div>

                <hr className="border-hairline my-4" />

                {/* What You Get */}
                <span className="font-serif text-xs uppercase tracking-widest text-muted-ink block">
                  Key Deliverables
                </span>
                <ul className="space-y-3 pt-2">
                  {srv.whatYouGet.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <span className="text-terracotta mt-1 text-xs font-serif">✓</span>
                      <p className="font-body text-base text-ink leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action/Contact trigger link */}
              <div className="pt-8">
                <a
                  href="#contact"
                  onClick={() => {
                    if (typeof window !== "undefined" && (window as any).gtag) {
                      (window as any).gtag("event", "service_cta_click", {
                        service: srv.title,
                      });
                    }
                  }}
                  className="inline-flex items-center font-serif text-sm font-medium text-terracotta hover:text-terracotta/80 group transition-colors"
                >
                  Request Proposal
                  <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
