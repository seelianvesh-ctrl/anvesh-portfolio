import { motion, useReducedMotion } from "motion/react";
import SectionHeader from "./ui/SectionHeader";
import { useActiveIndex, useReveal, EASE_OUT, scrollToElement } from "../lib/motion";

const CAPABILITIES = [
  {
    title: "Performance Marketing",
    subtitle: "Scalable Execution & Governance",
    description:
      "Directing high-budget media operations with a focus on margin preservation and strict target acquisition costs across global social and programmatic networks.",
    items: [
      "Google Ads (Search, Shopping, Performance Max)",
      "YouTube Ads & Programmatic Media",
      "Meta Ads Manager (Facebook, Instagram)",
      "Universal App Campaigns (UAC)",
      "Affiliate & Performance Networks",
      "Influencer-driven Performance Campaigns",
      "Cross-channel Budget Governance",
    ],
  },
  {
    title: "Measurement & Analytics",
    subtitle: "Attribution & Mathematical Proof",
    description:
      "Establishing reliable single sources of truth by auditing the tracking layer and proving net-new acquisition via scientific incrementality models.",
    items: [
      "Analytics & Tracking Architecture",
      "Marketing Measurement Systems",
      "SQL-based Cohort & Retention Analysis",
      "Power BI & Executive Dashboard Design",
      "Mobile Measurement Partners (Singular, MMP)",
      "Geo-Incrementality & Lift Testing",
      "Marketing-Mix Modeling (MMM)",
    ],
  },
  {
    title: "Growth & Social Commerce",
    subtitle: "Funnel Engineering & Lifecycle",
    description:
      "Converting passive awareness into transaction-ready first-party databases through interactive product-led funnels and lifestyle integrations.",
    items: [
      "Go-To-Market (GTM) Strategy & Execution",
      "Cost-per-Acquisition (CAC) Optimization",
      "CRM, MoEngage & Lifecycle Marketing",
      "Sampling-led Customer Acquisition",
      "Instagram Shop & Social Commerce Checkout",
      "Payment-partner Campaigns (GPay, Paytm)",
      "Cross-functional Squad Orchestration",
    ],
  },
];

/**
 * Three capability groups as a ledger: the index down the left tracks where you
 * are, and hairline rules turn the service list into a legible table rather than
 * a set of cards.
 */
export default function Capabilities() {
  const reduce = useReducedMotion();
  const { active, setRef } = useActiveIndex(CAPABILITIES.length, 0.4);
  const revealProps = useReveal({ distance: 16 });

  return (
    <section id="capabilities" className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <SectionHeader
          folio="03"
          eyebrow="Capabilities"
          title="A structured framework for growth."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-x-14">
          {/* index */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32 border-t border-hairline">
              {CAPABILITIES.map((capability, index) => {
                const isActive = active === index;
                return (
                  <button
                    key={capability.title}
                    type="button"
                    onClick={() =>
                      scrollToElement(
                        (document.getElementById(
                          `capability-${index}`,
                        ) as HTMLElement) ?? null,
                      )
                    }
                    className="group flex w-full cursor-pointer items-start gap-3 border-b border-hairline py-4 text-left"
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.2em] tnum transition-colors duration-300 ${
                        isActive ? "text-terracotta" : "text-muted-ink/60"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-[1.05rem] leading-snug transition-colors duration-300 ${
                        isActive
                          ? "text-ink"
                          : "text-muted-ink group-hover:text-ink"
                      }`}
                    >
                      {capability.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* groups */}
          <div className="flex flex-col gap-16 lg:col-span-9 lg:gap-20">
            {CAPABILITIES.map((capability, index) => {
              const isActive = active === index;
              return (
                <motion.article
                  key={capability.title}
                  id={`capability-${index}`}
                  ref={setRef(index)}
                  {...revealProps}
                  className="relative scroll-mt-28 border-t border-hairline pt-8"
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute -left-4 top-8 hidden h-[calc(100%-2rem)] w-[2px] origin-top bg-terracotta lg:block"
                    animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.6, ease: EASE_OUT }
                    }
                  />

                  <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                    <h3 className="display-3 text-ink">{capability.title}</h3>
                    <p className="font-body text-sm italic text-muted-ink">
                      {capability.subtitle}
                    </p>
                  </header>

                  <p className="mt-4 max-w-[52rem] font-body text-[1.02rem] leading-relaxed text-muted-ink">
                    {capability.description}
                  </p>

                  <ul className="mt-8 grid border-t border-hairline sm:grid-cols-2 sm:gap-x-12">
                    {capability.items.map((item) => (
                      <li
                        key={item}
                        className="group flex items-baseline gap-3 border-b border-hairline py-3.5"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.45em] h-[5px] w-[5px] shrink-0 rotate-45 bg-terracotta/70 transition-colors duration-300 group-hover:bg-terracotta"
                        />
                        <span className="font-body text-[0.98rem] leading-snug text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
