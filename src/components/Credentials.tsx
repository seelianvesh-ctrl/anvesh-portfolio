import { motion, useReducedMotion } from "motion/react";

const TECHNICAL_STACK = [
  "Google Ads",
  "Meta Ads",
  "Performance Max",
  "YouTube Ads",
  "DV360",
  "Programmatic Display",
  "Instagram Shop",
  "Google Analytics 4 (GA4)",
  "SQL",
  "Power BI",
  "Amplitude",
  "Singular (MMP)",
  "Cube",
  "Marketing-Mix Modeling (MMM)"
];

const CERTIFICATIONS = [
  "Google Ads — Measurement Certification",
  "Google Ads — Display Certification",
  "Google Ads — Apps Certification",
  "Google Ads — AI-Powered Performance Ads",
  "Fundamentals of Digital Marketing (Google)",
  "Lean Six Sigma Green Belt — KPMG"
];

export default function Credentials() {
  const shouldReduceMotion = useReducedMotion();

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: "easeOut" }
      };

  return (
    <section id="credentials" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-28 bg-cream border-t border-hairline">
      <div className="flex flex-col space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="font-serif text-xs uppercase tracking-widest text-muted-ink">
            Credentials
          </h2>
          <p className="font-serif text-3xl font-normal text-ink mt-2 md:text-4xl">
            Education, Certifications & Stack
          </p>
        </div>

        {/* 3-Part Grid Layout */}
        <motion.div
          {...animationProps}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-12"
          id="credentials-grid"
        >
          {/* 1. Academic Credentials (Column 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="font-serif text-xs uppercase tracking-widest text-muted-ink block border-b border-hairline pb-2">
              Academic Background
            </span>
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="font-serif text-sm font-semibold text-terracotta">2019 – 2021</span>
                <h4 className="font-serif text-lg font-medium text-ink leading-snug">
                  MBA — Marketing & Organizational Behavior
                </h4>
                <p className="font-serif text-sm text-muted-ink italic">
                  Indian Institute of Management (IIM) Calcutta
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-sm font-semibold text-terracotta">2013 – 2017</span>
                <h4 className="font-serif text-lg font-medium text-ink leading-snug">
                  B.Tech — Mechanical Engineering
                </h4>
                <p className="font-serif text-sm text-muted-ink italic">
                  National Institute of Technology (NIT) Calicut
                </p>
              </div>
            </div>
          </div>

          {/* 2. Professional Certifications (Column 5-8) */}
          <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-hairline lg:pl-8">
            <span className="font-serif text-xs uppercase tracking-widest text-muted-ink block border-b border-hairline pb-2">
              Certifications
            </span>
            <ul className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert} className="flex items-start space-x-2.5">
                  <span className="text-terracotta mt-1.5 text-[8px]">•</span>
                  <span className="font-body text-base text-ink leading-relaxed">
                    {cert}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Technical Stack & Tooling (Column 9-12) */}
          <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-hairline lg:pl-8">
            <span className="font-serif text-xs uppercase tracking-widest text-muted-ink block border-b border-hairline pb-2">
              Technical Stack & Tooling
            </span>
            <div className="flex flex-wrap gap-2" id="tech-stack-tags">
              {TECHNICAL_STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-hairline bg-cream px-3 py-1.5 font-serif text-xs text-ink transition-colors duration-200 hover:border-terracotta"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
