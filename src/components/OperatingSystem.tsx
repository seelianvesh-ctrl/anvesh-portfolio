import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import SectionHeader from "./ui/SectionHeader";
import { useActiveIndex, DUR, EASE_OUT } from "../lib/motion";

const STEPS = [
  {
    number: "01",
    title: "Diagnose the business objective",
    description:
      "Before reviewing ad consoles, we align media targets directly with bottom-line profitability. We define core constraints: is the primary bottleneck raw lead-flow, conversion friction, checkout dropout, or returning cohort volume?",
  },
  {
    number: "02",
    title: "Map funnel leakage",
    description:
      "Using GA4, GTM tracking audits, and custom database events, we trace the precise user journey. We pinpoint exact dropout percentages across search, landing pages, interactive funnels, cart checkouts, and CRM campaigns.",
  },
  {
    number: "03",
    title: "Clean the measurement layer",
    description:
      "Platform numbers are often highly overstated due to self-serving attribution models. We establish strict first-party measurement clarity and perform attribution clean-up and incrementality testing to map actual customer lifecycles.",
  },
  {
    number: "04",
    title: "Rebuild channel structure",
    description:
      "We reconstruct digital campaign setups across Google, Meta, CRM, and payments. We isolate retention from net-new prospecting, prevent duplicate bidder overlap, and restructure bidding around proved incremental lift.",
  },
  {
    number: "05",
    title: "Create weekly operating decisions",
    description:
      "Growth is not a one-time set-and-forget task. We establish clear weekly operational routines, analyzing ad-hoc cohort metrics, creative hook fatigue, and budget flows to ensure continuous, high-efficiency media scale.",
  },
];

/**
 * The growth blueprint, inverted.
 *
 * A dark band in the middle of the page gives the scroll some architecture: the
 * spine fills as you read, and the phase you are on comes forward while the
 * others hold back.
 */
export default function OperatingSystem() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { active, setRef } = useActiveIndex(STEPS.length, 0.42);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.72", "end 0.85"],
  });
  const spine = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="operating-system"
      className="dark-band relative overflow-hidden bg-deep-charcoal"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader
                folio="05"
                eyebrow="Operating System"
                title="The Growth Blueprint"
                intro="I implement a five-phase logical protocol to identify bottlenecked conversion paths, eliminate redundant ad expenditures, and conduct attribution clean-up and incrementality testing."
                layout="stacked"
                tone="dark"
              />
            </div>
          </div>

          <div className="relative lg:col-span-8">
            {/* spine */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 hidden h-full w-px bg-hairline-dark lg:block"
            >
              <motion.span
                className="absolute inset-0 origin-top bg-gradient-to-b from-ember to-terracotta"
                style={{ scaleY: reduce ? 1 : spine }}
              />
            </div>

            <ol ref={listRef} className="lg:pl-14">
              {STEPS.map((step, index) => {
                const isActive = active === index;
                return (
                  <motion.li
                    key={step.number}
                    ref={setRef(index)}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{
                      duration: DUR.base,
                      ease: EASE_OUT,
                      delay: Math.min(index * 0.04, 0.16),
                    }}
                    className="relative grid grid-cols-[3.25rem_1fr] gap-5 border-b border-hairline-dark py-8 last:border-b-0 md:grid-cols-[4rem_1fr] md:gap-8 md:py-9"
                  >
                    {/* node on the spine */}
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[3.5rem] top-[2.6rem] hidden h-2 w-2 -translate-x-1/2 rotate-45 transition-all duration-500 lg:block ${
                        isActive
                          ? "scale-125 bg-ember"
                          : "scale-100 bg-hairline-dark"
                      }`}
                    />

                    <motion.span
                      className="font-serif text-[2.1rem] leading-none tnum md:text-[2.6rem]"
                      animate={{
                        color: isActive ? "#D98B62" : "rgba(247,243,236,0.22)",
                      }}
                      transition={
                        reduce ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT }
                      }
                    >
                      {step.number}
                    </motion.span>

                    <div>
                      <motion.h3
                        className="font-serif text-[1.2rem] font-medium leading-snug md:text-[1.5rem]"
                        animate={{
                          color: isActive
                            ? "#F7F3EC"
                            : "rgba(247,243,236,0.72)",
                        }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.5, ease: EASE_OUT }
                        }
                      >
                        {step.title}
                      </motion.h3>
                      {/* Body copy keeps a constant, readable tone. */}
                      <p className="mt-3 max-w-[46rem] font-body text-[0.97rem] leading-relaxed text-[#E2D9CC] md:text-[1.03rem]">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
