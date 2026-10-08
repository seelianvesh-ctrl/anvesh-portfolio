import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { Rise, RiseBlock } from "./ui/Reveal";
import { DUR, EASE_OUT, scrollToSection, track } from "../lib/motion";

const STATS = [
  { value: "CAC ↓22%", label: "Sustained acquisition cost reduction" },
  { value: "ROAS 3.4x", label: "Average blended campaign return" },
  { value: "CVR ↑25%", label: "Average funnel conversion lift" },
  { value: "₹7Cr+", label: "Monthly active media spend managed" },
];

const BOOKING_URL = "https://calendly.com/seelianvesh/30min";

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Gentle depth: the portrait drifts a little slower than the page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);
  const openResume = () => (window as unknown as { openResumeGate?: () => void }).openResumeGate?.();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-hairline pt-[72px]"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
        <div className="grid gap-12 pt-9 pb-14 md:pt-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16 lg:pt-14 lg:pb-16">
          {/* ------------------------------------------------ statement */}
          <div className="max-w-[46rem]">
            <h1 id="hero-heading" className="display-1 text-ink">
              <RiseBlock delay={0.05}>Performance</RiseBlock>{" "}
              <RiseBlock delay={0.13}>
                <span className="whitespace-nowrap">Marketing &amp;</span>
              </RiseBlock>{" "}
              <RiseBlock delay={0.21}>
                <span className="italic text-terracotta">Growth</span>
              </RiseBlock>
            </h1>

            <motion.p
              id="hero-sub"
              className="lede mt-8 max-w-[34rem] md:mt-9"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, delay: 0.34, ease: EASE_OUT }}
            >
              I help consumer brands improve acquisition, media efficiency, and
              measurement across Google, Meta, CRM, and social commerce.
            </motion.p>

            <motion.div
              id="hero-proof-line"
              className="mt-8 flex max-w-[34rem] gap-4 border-l-2 border-terracotta pl-4 py-1"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, delay: 0.42, ease: EASE_OUT }}
            >
              <p className="font-body text-[1rem] leading-relaxed text-ink/85">
                Mars Pet Nutrition · Domino&apos;s Pizza India · IIM Calcutta MBA
                · ₹7Cr+ monthly media managed
              </p>
            </motion.div>

            <motion.div
              id="hero-ctas"
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, delay: 0.5, ease: EASE_OUT }}
            >
              <button
                type="button"
                onClick={() => scrollToSection("work")}
                className="group inline-flex items-center gap-3 border border-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream cursor-pointer"
              >
                View Case Studies
                <ArrowRight
                  size={14}
                  strokeWidth={1.25}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                id="download-resume-hero"
                onClick={() => {
                  track("resume_gate_open", { location: "hero" });
                  openResume();
                }}
                className="group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink underline decoration-hairline decoration-1 underline-offset-[7px] transition-colors duration-300 hover:decoration-terracotta cursor-pointer"
              >
                Download Resume
                <Download
                  size={14}
                  strokeWidth={1.25}
                  className="text-muted-ink transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-terracotta"
                />
              </button>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="book-call-hero"
                onClick={() =>
                  track("book_call_click", {
                    location: "hero",
                    link_url: BOOKING_URL,
                  })
                }
                className="group inline-flex items-center gap-3 bg-terracotta px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-[#a8431f]"
              >
                Book a Call
                <ArrowRight
                  size={14}
                  strokeWidth={1.25}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </div>

          {/* ------------------------------------------------- portrait */}
          <motion.aside
            className="mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-none"
            aria-label="Portrait of Anvesh Seeli"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.slow, delay: 0.24, ease: EASE_OUT }}
          >
            <motion.figure
              className="relative bg-paper p-2.5 shadow-[0_18px_50px_-32px_rgba(31,27,23,0.55)] ring-1 ring-hairline"
              style={reduce ? undefined : { y: portraitY, scale: portraitScale }}
            >
              <div
                className="pointer-events-none absolute -left-2 top-10 h-20 w-[3px] bg-terracotta"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden">
                <img
                  src="/anvesh-seeli.jpg"
                  alt="Anvesh Seeli, performance marketing and growth consultant"
                  width={400}
                  height={400}
                  loading="eager"
                  decoding="async"
                  className="aspect-square w-full object-cover grayscale-[10%] transition-all duration-700 hover:scale-[1.02] hover:grayscale-0"
                />
              </div>
              <figcaption className="flex flex-col gap-1 border-t border-hairline px-1 pb-1 pt-4">
                <span className="font-serif text-lg font-medium text-ink">
                  Anvesh Seeli
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-ink">
                  Performance Marketing &amp; Growth
                </span>
              </figcaption>
            </motion.figure>
          </motion.aside>
        </div>

        {/* ---------------------------------------------------- metrics */}
        <div
          id="hero-stats"
          className="grid grid-cols-2 gap-x-8 gap-y-9 border-t border-hairline py-10 md:grid-cols-4 md:gap-x-10 md:py-12"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.value}
              className="group flex flex-col gap-2"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.base,
                delay: 0.6 + index * 0.07,
                ease: EASE_OUT,
              }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-ink/60 tnum">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Rise delay={0.66 + index * 0.07} duration={0.8}>
                <span className="font-serif text-[2rem] font-medium leading-none text-ink transition-colors duration-300 group-hover:text-terracotta tnum md:text-[2.35rem]">
                  {stat.value}
                </span>
              </Rise>
              <span className="max-w-[15rem] font-body text-[0.9rem] leading-snug text-muted-ink">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* scroll cue — purely decorative */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-9 w-px -translate-x-1/2 overflow-hidden lg:block"
        aria-hidden="true"
      >
        <span className="cue-line block h-full w-px bg-terracotta/70" />
      </div>
    </section>
  );
}
