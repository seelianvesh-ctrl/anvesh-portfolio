import { motion, useReducedMotion } from "motion/react";

export default function Capabilities() {
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
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      };

  const capabilities = [
    {
      title: "Performance Marketing",
      subtitle: "Scalable Execution & Governance",
      description: "Directing high-budget media operations with a focus on margin preservation and strict target acquisition costs across global social and programmatic networks.",
      items: [
        "Google Ads (Search, Shopping, Performance Max)",
        "YouTube Ads & Programmatic Media",
        "Meta Ads Manager (Facebook, Instagram)",
        "Universal App Campaigns (UAC)",
        "Affiliate & Performance Networks",
        "Influencer-driven Performance Campaigns",
        "Cross-channel Budget Governance"
      ]
    },
    {
      title: "Measurement & Analytics",
      subtitle: "Attribution & Mathematical Proof",
      description: "Establishing reliable single sources of truth by auditing the tracking layer and proving net-new acquisition via scientific incrementality models.",
      items: [
        "Google Analytics 4 (GA4) Custom Setups",
        "GA4 & GTM Tracking Audits",
        "SQL-based Cohort & Retention Analysis",
        "Power BI & Executive Dashboard Design",
        "Mobile Measurement Partners (Singular, MMP)",
        "Geo-Incrementality & Lift Testing",
        "Marketing-Mix Modeling (MMM)"
      ]
    },
    {
      title: "Growth & Social Commerce",
      subtitle: "Funnel Engineering & Lifecycle",
      description: "Converting passive awareness into transaction-ready first-party databases through interactive product-led funnels and lifestyle integrations.",
      items: [
        "Go-To-Market (GTM) Strategy & Execution",
        "Cost-per-Acquisition (CAC) Optimization",
        "CRM, MoEngage & Lifecycle Marketing",
        "Sampling-led Customer Acquisition",
        "Instagram Shop & Social Commerce Checkout",
        "Payment-partner Campaigns (GPay, Paytm)",
        "Cross-functional Squad Orchestration"
      ]
    }
  ];

  return (
    <section id="capabilities" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-28 bg-cream border-t border-hairline">
      <div className="flex flex-col space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="font-serif text-xs uppercase tracking-widest text-muted-ink">
            Capabilities
          </h2>
          <p className="font-serif text-3xl font-normal text-ink mt-2 md:text-4xl">
            A structured framework for growth.
          </p>
        </div>

        {/* 3-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-0"
          id="capabilities-grid"
        >
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.title}
              variants={itemVariants}
              className={`flex flex-col space-y-6 pb-8 lg:pb-0 ${
                idx > 0 ? "lg:border-l lg:border-hairline lg:pl-8" : ""
              }`}
            >
              <div className="space-y-2">
                <span className="font-serif text-xs italic text-terracotta">0{idx + 1} / CORE</span>
                <h3 className="font-serif text-2xl font-normal text-ink">{cap.title}</h3>
                <p className="font-serif text-sm text-muted-ink italic">{cap.subtitle}</p>
              </div>

              <p className="font-body text-base text-muted-ink leading-relaxed">
                {cap.description}
              </p>

              <hr className="border-hairline" />

              <ul className="flex flex-col space-y-2.5">
                {cap.items.map((item) => (
                  <li key={item} className="flex items-start space-x-2">
                    <span className="text-terracotta mt-1 text-xs">•</span>
                    <span className="font-body text-base text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
