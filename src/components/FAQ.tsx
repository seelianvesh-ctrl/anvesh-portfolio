import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQS } from "../data";

export default function FAQ() {
  const shouldReduceMotion = useReducedMotion();
  const [openFAQId, setOpenFAQId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQId((prev) => (prev === id ? null : id));
  };

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: "easeOut" }
      };

  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-28 bg-cream border-t border-hairline">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Left column - Section title */}
        <div className="lg:col-span-4">
          <h2 className="font-serif text-xs uppercase tracking-widest text-muted-ink">
            Clarifications
          </h2>
          <p className="font-serif text-3xl font-normal text-ink mt-2 md:text-4xl">
            Frequently Asked Questions
          </p>
          <p className="font-body text-base text-muted-ink italic mt-2">
            Front-loaded explanations of operating structures, scopes, and commercial frameworks.
          </p>
        </div>

        {/* Right column - FAQ Accordions */}
        <div className="lg:col-span-8 flex flex-col border-t border-hairline" id="faq-accordions-list">
          {FAQS.map((faq) => {
            const isOpen = openFAQId === faq.id;

            return (
              <motion.div
                key={faq.id}
                {...animationProps}
                className="border-b border-hairline bg-cream"
              >
                {/* Header row / Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center justify-between py-5 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  id={`faq-trigger-${faq.id}`}
                >
                  <span className="font-serif text-lg font-medium text-ink md:text-xl pr-6">
                    {faq.question}
                  </span>
                  <div className="text-muted-ink flex-shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Content body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                      id={`faq-content-${faq.id}`}
                    >
                      <div className="pb-6 pt-1">
                        <p className="font-body text-base text-muted-ink leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
