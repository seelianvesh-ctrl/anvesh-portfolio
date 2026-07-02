import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown, ChevronUp, Briefcase, Award, TrendingUp, Settings, BarChart2 } from "lucide-react";
import { CASE_STUDIES } from "../data";

export default function SelectedWork() {
  const shouldReduceMotion = useReducedMotion();
  const [expandedCardId, setExpandedCardId] = useState<string | null>("dominos"); // Default first open for editorial discovery

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => {
      const next = prev === id ? null : id;
      if (next !== null) {
        const study = CASE_STUDIES.find(s => s.id === id);
        const title = study ? study.title : id;
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "case_study_open", {
            project: title,
          });
        }
      }
      return next;
    });
  };

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: "easeOut" }
      };

  const getIcon = (id: string) => {
    switch (id) {
      case "dominos":
        return <TrendingUp className="text-terracotta" size={20} />;
      case "mars":
        return <Award className="text-terracotta" size={20} />;
      case "brane":
        return <Settings className="text-terracotta" size={20} />;
      case "cloudtail":
        return <Briefcase className="text-terracotta" size={20} />;
      case "jumia":
        return <BarChart2 className="text-terracotta" size={20} />;
      default:
        return <Briefcase className="text-terracotta" size={20} />;
    }
  };

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-28 bg-cream border-t border-hairline">
      <div className="flex flex-col space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="font-serif text-xs uppercase tracking-widest text-muted-ink">
              Selected Work
            </h2>
            <p className="font-serif text-3xl font-normal text-ink mt-2 md:text-4xl">
              Case Studies & Strategic Outcomes
            </p>
          </div>
          <p className="font-body text-sm text-muted-ink italic max-w-xs">
            Click any project row to expand details including tools, interventions, and exact mathematical outcomes.
          </p>
        </div>

        {/* Case Study Accordion List */}
        <div className="flex flex-col border-t border-hairline" id="case-studies-accordion">
          {CASE_STUDIES.map((study) => {
            const isExpanded = expandedCardId === study.id;

            return (
              <motion.div
                key={study.id}
                {...animationProps}
                className="border-b border-hairline bg-cream"
              >
                {/* Header Row (Button) */}
                <button
                  onClick={() => toggleExpand(study.id)}
                  className="flex w-full items-center justify-between py-6 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                  id={`case-study-trigger-${study.id}`}
                >
                  <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream border border-hairline">
                      {getIcon(study.id)}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-normal text-ink md:text-2xl">
                        {study.title}
                      </h3>
                      <p className="font-serif text-sm text-muted-ink italic mt-0.5">
                        {study.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-ink hover:text-ink transition-colors">
                    <span className="hidden font-body text-xs uppercase tracking-widest md:inline-block">
                      {isExpanded ? "Collapse Details" : "Expand Details"}
                    </span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Expandable Details Container */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.2 : 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                      id={`case-study-details-${study.id}`}
                    >
                      <div className="pb-8 pt-2 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 border-t border-dashed border-hairline">
                        {/* Context, Scope & Tools Column */}
                        <div className="lg:col-span-5 space-y-6">
                          <div>
                            <span className="font-serif text-xs uppercase tracking-widest text-muted-ink block mb-2">
                              Context & Objective
                            </span>
                            <p className="font-body text-base text-ink leading-relaxed">
                              {study.context}
                            </p>
                          </div>

                          <div>
                            <span className="font-serif text-xs uppercase tracking-widest text-muted-ink block mb-2">
                              Scope of Engagement
                            </span>
                            <ul className="space-y-2">
                              {study.scope.map((item, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-terracotta mt-1.5 text-[8px]">•</span>
                                  <span className="font-body text-sm text-muted-ink">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="font-serif text-xs uppercase tracking-widest text-muted-ink block mb-2">
                              Technical Stack & Core Tools
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {study.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="rounded border border-hairline px-2.5 py-1 font-serif text-xs text-ink"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Interventions & Outcomes Column */}
                        <div className="lg:col-span-7 space-y-6">
                          <div>
                            <span className="font-serif text-xs uppercase tracking-widest text-muted-ink block mb-2">
                              Strategic Interventions
                            </span>
                            <ul className="space-y-4">
                              {study.interventions.map((item, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                  <span className="font-serif text-sm font-normal text-terracotta">
                                    0{index + 1}
                                  </span>
                                  <p className="font-body text-base text-ink leading-relaxed">
                                    {item}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="rounded bg-[#25201B] p-6 text-cream">
                            <span className="font-serif text-xs uppercase tracking-widest text-[#E2D9CC] block mb-3">
                              Measurable Outcomes
                            </span>
                            <ul className="space-y-3">
                              {study.outcomes.map((item, index) => (
                                <li key={index} className="flex items-start space-x-3 border-l border-terracotta pl-4 py-0.5">
                                  <span className="font-body text-sm text-cream leading-relaxed font-medium">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
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
