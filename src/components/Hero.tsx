import { motion, useReducedMotion } from "motion/react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToWork = () => {
    const element = document.getElementById("work");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: "easeOut" },
      };

  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 md:px-12 md:pt-24 md:pb-28">
      <motion.div {...animationProps} className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_360px] lg:items-center">
        <div className="flex flex-col space-y-8 text-left">
          {/* H1 Main Heading */}
          <h1 className="font-serif text-[44px] leading-[1.1] font-normal text-ink md:text-[64px] tracking-tight max-w-4xl" id="hero-heading">
            Performance Marketing &{" "}
            <span className="text-terracotta italic font-normal">Growth</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-xl text-muted-ink md:text-2xl leading-relaxed max-w-3xl" id="hero-sub">
            I help consumer brands improve acquisition, media efficiency, and measurement across Google, Meta, CRM, and social commerce.
          </p>

          {/* Fine Print / Proof Line */}
          <div className="border-l-2 border-terracotta pl-4 py-1" id="hero-proof-line">
            <p className="font-body text-base text-ink font-medium tracking-wide">
              Mars Pet Nutrition · Domino's Pizza India · IIM Calcutta MBA · ₹7Cr+ monthly media managed
            </p>
          </div>

          {/* CTA Button Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4" id="hero-ctas">
            <button
              onClick={handleScrollToWork}
              className="rounded border border-ink bg-ink px-6 py-3 font-serif text-base font-medium text-cream transition-colors duration-200 hover:bg-ink/90 cursor-pointer"
            >
              View Case Studies
            </button>

            <button
              onClick={() => (window as any).openResumeGate?.()}
              className="rounded border border-hairline bg-cream px-6 py-3 font-serif text-base font-medium text-ink transition-colors duration-200 hover:bg-hairline cursor-pointer"
              id="download-resume-hero"
            >
              Download Resume
            </button>

            <a
              href="https://calendly.com/seelianvesh/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-terracotta px-6 py-3 font-serif text-base font-medium text-cream transition-colors duration-200 hover:bg-terracotta/90 cursor-pointer"
              id="book-call-hero"
            >
              Book a Call
            </a>
          </div>
        </div>

        {/* Professional portrait for credibility and trust */}
        <aside className="mx-auto w-full max-w-[320px] lg:max-w-none" aria-label="Portrait of Anvesh Seeli">
          <div className="relative rounded-2xl border border-hairline bg-cream p-3 shadow-sm">
            <div className="absolute -left-3 top-8 h-24 w-1 bg-terracotta" aria-hidden="true" />
            <img
              src="/anvesh-seeli.jpg"
              alt="Anvesh Seeli, performance marketing and growth consultant"
              className="aspect-square w-full rounded-xl object-cover grayscale-[8%]"
            />
            <div className="pt-4 text-center">
              <p className="font-serif text-lg font-semibold text-ink">Anvesh Seeli</p>
              <p className="font-body text-sm text-muted-ink">Performance Marketing & Growth</p>
            </div>
          </div>
        </aside>

        {/* Hairline Rule Separating Hero & Stats */}
        <div className="w-full lg:col-span-2 pt-2">
          <hr className="border-hairline" />
        </div>

        {/* Editorial Stat Row */}
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 md:gap-x-12 lg:col-span-2" id="hero-stats">
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-normal text-terracotta md:text-4xl">CAC ↓22%</span>
            <span className="font-body text-sm text-muted-ink mt-1">Sustained acquisition cost reduction</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-normal text-ink md:text-4xl">ROAS 3.4x</span>
            <span className="font-body text-sm text-muted-ink mt-1">Average blended campaign return</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-normal text-ink md:text-4xl">CVR ↑25%</span>
            <span className="font-body text-sm text-muted-ink mt-1">Average funnel conversion lift</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-normal text-ink md:text-4xl">₹7Cr+</span>
            <span className="font-body text-sm text-muted-ink mt-1">Monthly active media spend managed</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
