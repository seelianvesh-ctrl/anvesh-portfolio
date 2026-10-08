import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SectionHeader from "./ui/SectionHeader";
import Mark from "./ui/Mark";
import { FAQS } from "../data";
import { EASE_IO, EASE_OUT } from "../lib/motion";

/**
 * Frequently asked questions.
 *
 * Answers stay mounted at all times (the collapse is a height animation, not an
 * unmount), so the full text is available to search engines, AI assistants and
 * the browser's own find-in-page.
 */
export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader
                folio="10"
                eyebrow="Clarifications"
                title="Frequently Asked Questions"
                intro="Front-loaded explanations of operating structures, scopes, and commercial frameworks."
                layout="stacked"
              />
            </div>
          </div>

          <div
            id="faq-accordions-list"
            className="border-t border-hairline lg:col-span-8"
          >
            {FAQS.map((faq, index) => (
              <Row
                key={faq.id}
                id={faq.id}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openId === faq.id}
                onToggle={() =>
                  setOpenId((current) => (current === faq.id ? null : faq.id))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  id,
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: string;
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px -10% 0px" }}
      transition={{
        duration: 0.5,
        ease: EASE_OUT,
        delay: Math.min(index * 0.03, 0.12),
      }}
      className="group border-b border-hairline"
    >
      <button
        type="button"
        id={`faq-trigger-${id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${id}`}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
      >
        <span className="flex items-baseline gap-4 md:gap-6">
          <span
            className={`font-mono text-[10px] tracking-[0.2em] tnum transition-colors duration-300 ${
              isOpen ? "text-terracotta" : "text-muted-ink/60"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-serif text-[1.08rem] font-medium leading-snug transition-colors duration-300 md:text-[1.22rem] ${
              isOpen ? "text-terracotta" : "text-ink group-hover:text-terracotta"
            }`}
          >
            {question}
          </span>
        </span>
        <Mark open={isOpen} />
      </button>

      <motion.div
        id={`faq-content-${id}`}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                height: { duration: 0.44, ease: EASE_IO },
                opacity: { duration: isOpen ? 0.36 : 0.18 },
              }
        }
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <p className="max-w-[46rem] pb-7 pl-8 font-body text-[0.98rem] leading-relaxed text-muted-ink md:pl-12">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}
