import { motion, useReducedMotion } from "motion/react";

const STEPS = [
  {
    number: "01",
    title: "Diagnose the business objective",
    description: "Before reviewing ad consoles, we align media targets directly with bottom-line profitability. We define core constraints: is the primary bottleneck raw lead-flow, conversion friction, checkout dropout, or returning cohort volume?"
  },
  {
    number: "02",
    title: "Map funnel leakage",
    description: "Using GA4, GTM tracking audits, and custom database events, we trace the precise user journey. We pinpoint exact dropout percentages across search, landing pages, interactive funnels, cart checkouts, and CRM campaigns."
  },
  {
    number: "03",
    title: "Clean the measurement layer",
    description: "Platform numbers are often highly overstated due to self-serving attribution models. We establish strict first-party measurement clarity and perform attribution clean-up and incrementality testing to map actual customer lifecycles."
  },
  {
    number: "04",
    title: "Rebuild channel structure",
    description: "We reconstruct digital campaign setups across Google, Meta, CRM, and payments. We isolate retention from net-new prospecting, prevent duplicate bidder overlap, and restructure bidding around proved incremental lift."
  },
  {
    number: "05",
    title: "Create weekly operating decisions",
    description: "Growth is not a one-time set-and-forget task. We establish clear weekly operational routines, analyzing ad-hoc cohort metrics, creative hook fatigue, and budget flows to ensure continuous, high-efficiency media scale."
  }
];

export default function OperatingSystem() {
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
    <section id="operating-system" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-28 bg-cream border-t border-hairline">
      <div className="flex flex-col space-y-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-xs uppercase tracking-widest text-muted-ink">
              Operating System
            </h2>
            <p className="font-serif text-3xl font-normal text-ink mt-2 md:text-4xl">
              The Growth Blueprint
            </p>
          </div>
          <div className="lg:col-span-8 flex items-center">
            <p className="font-body text-base text-muted-ink md:text-lg leading-relaxed max-w-2xl">
              I implement a five-phase logical protocol to identify bottlenecked conversion paths, eliminate redundant ad expenditures, and conduct attribution clean-up and incrementality testing.
            </p>
          </div>
        </div>

        {/* 5-Step Numbered Row Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col space-y-0 border-t border-hairline"
          id="operating-steps"
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="group grid grid-cols-1 gap-4 py-8 border-b border-hairline sm:grid-cols-12 hover:bg-hairline/20 transition-colors duration-300 px-2"
            >
              {/* Step Number */}
              <div className="sm:col-span-2">
                <span className="font-serif text-4xl font-normal text-terracotta/45 group-hover:text-terracotta transition-colors duration-300 md:text-5xl">
                  {step.number}
                </span>
              </div>

              {/* Step Title */}
              <div className="sm:col-span-4 flex items-center">
                <h3 className="font-serif text-xl font-medium text-ink md:text-2xl leading-tight">
                  {step.title}
                </h3>
              </div>

              {/* Step Description */}
              <div className="sm:col-span-6 flex items-center">
                <p className="font-body text-base text-muted-ink leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
