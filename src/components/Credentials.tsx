import { motion } from "motion/react";
import SectionHeader from "./ui/SectionHeader";
import { useStagger } from "../lib/motion";

const EDUCATION = [
  {
    period: "2019 – 2021",
    qualification: "MBA — Marketing & Organizational Behavior",
    institution: "Indian Institute of Management (IIM) Calcutta",
  },
  {
    period: "2013 – 2017",
    qualification: "B.Tech — Mechanical Engineering",
    institution: "National Institute of Technology (NIT) Calicut",
  },
];

const CERTIFICATIONS = [
  "Google Ads — Measurement Certification",
  "Google Ads — Display Certification",
  "Google Ads — Apps Certification",
  "Google Ads — AI-Powered Performance Ads",
  "Fundamentals of Digital Marketing (Google)",
  "Lean Six Sigma Green Belt — KPMG",
];

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
  "Marketing-Mix Modeling (MMM)",
];

/**
 * Education, certifications and tooling set as three reference columns —
 * quoted like a bibliography rather than badged like a product page.
 */
export default function Credentials() {
  const { container, item } = useStagger(0.05);

  return (
    <section id="credentials" className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <SectionHeader
          folio="08"
          eyebrow="Credentials"
          title="Education, Certifications & Stack"
        />

        <motion.div
          id="credentials-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8% 0px -12% 0px" }}
          className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-x-14"
        >
          <motion.div variants={item} className="lg:col-span-4">
            <p className="eyebrow border-b border-hairline pb-3">
              Academic Background
            </p>
            <div className="mt-7 flex flex-col gap-8">
              {EDUCATION.map((entry) => (
                <div key={entry.qualification} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] tracking-[0.12em] text-terracotta tnum">
                    {entry.period}
                  </span>
                  <h3 className="font-serif text-[1.15rem] font-medium leading-snug text-ink">
                    {entry.qualification}
                  </h3>
                  <p className="font-body text-[0.95rem] italic text-muted-ink">
                    {entry.institution}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="lg:col-span-4 lg:border-l lg:border-hairline lg:pl-14"
          >
            <p className="eyebrow border-b border-hairline pb-3">
              Certifications
            </p>
            <ul className="mt-3">
              {CERTIFICATIONS.map((certification) => (
                <li
                  key={certification}
                  className="border-b border-hairline py-3.5 font-body text-[0.95rem] leading-snug text-ink last:border-b-0"
                >
                  {certification}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={item}
            className="lg:col-span-4 lg:border-l lg:border-hairline lg:pl-14"
          >
            <p className="eyebrow border-b border-hairline pb-3">
              Technical Stack &amp; Tooling
            </p>
            <div id="tech-stack-tags" className="mt-6 flex flex-wrap gap-2">
              {TECHNICAL_STACK.map((tool) => (
                <span
                  key={tool}
                  className="border border-hairline px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-ink transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
