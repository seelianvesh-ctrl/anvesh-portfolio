import { motion, useReducedMotion } from "motion/react";
import { Mail, Linkedin, Calendar, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: "easeOut" }
      };

  return (
    <section id="contact" className="relative bg-deep-charcoal text-cream overflow-hidden">
      {/* Upper Connect Panel */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <motion.div {...animationProps} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Headline Column (Column 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-serif text-xs uppercase tracking-widest text-[#E2D9CC]">
              Collaboration
            </span>
            <h2 className="font-serif text-3xl leading-tight font-normal text-cream md:text-5xl max-w-xl" id="contact-heading">
              Let's engineer your growth pipeline.
            </h2>
            <p className="font-body text-base text-[#E2D9CC]/80 leading-relaxed max-w-md">
              Whether you want to audit a high-spend account, run GA4 & GTM tracking audits, or require fractional growth management, let's explore how we can align your spend with business margins.
            </p>
          </div>

          {/* Touchpoints Column (Column 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-12" id="contact-touchpoints">
            {/* Calendly booking CTA */}
            <a
              href="https://calendly.com/seelianvesh/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).gtag) {
                  (window as any).gtag("event", "book_call_click", {
                    location: "contact_section",
                    link_url: "https://calendly.com/seelianvesh/30min",
                  });
                }
              }}
              className="group flex items-center justify-between rounded bg-terracotta p-5 transition-all duration-300 hover:bg-terracotta/90"
              id="calendly-button"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/15 text-cream">
                  <Calendar size={18} />
                </div>
                <div className="text-left">
                  <span className="font-serif text-xs uppercase tracking-widest text-[#F7F3EC]/70 block">
                    Introductory Session
                  </span>
                  <span className="font-serif text-lg font-medium text-cream">
                    Book a 30-Min Call
                  </span>
                </div>
              </div>
              <ArrowUpRight size={20} className="text-cream transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* Email direct contact */}
            <a
              href="mailto:hi@anveshseeli.com"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).gtag) {
                  (window as any).gtag("event", "email_click");
                }
              }}
              className="group flex items-center justify-between rounded border border-hairline/20 bg-cream/5 p-5 transition-all duration-300 hover:bg-cream/10"
              id="email-button"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/15 text-cream">
                  <Mail size={18} />
                </div>
                <div className="text-left">
                  <span className="font-serif text-xs uppercase tracking-widest text-[#F7F3EC]/70 block">
                    Direct Inquiry
                  </span>
                  <span className="font-serif text-base font-normal text-cream">
                    hi@anveshseeli.com
                  </span>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-[#E2D9CC]/60 group-hover:text-cream transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* LinkedIn social channel */}
            <a
              href="https://www.linkedin.com/in/anvesh-seeli/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).gtag) {
                  (window as any).gtag("event", "linkedin_click");
                }
              }}
              className="group flex items-center justify-between rounded border border-hairline/20 bg-cream/5 p-5 transition-all duration-300 hover:bg-cream/10"
              id="linkedin-button"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/15 text-cream">
                  <Linkedin size={18} />
                </div>
                <div className="text-left">
                  <span className="font-serif text-xs uppercase tracking-widest text-[#F7F3EC]/70 block">
                    Professional Network
                  </span>
                  <span className="font-serif text-base font-normal text-cream">
                    LinkedIn Profile
                  </span>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-[#E2D9CC]/60 group-hover:text-cream transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Deep Footer Line */}
      <div className="border-t border-hairline/15 bg-[#1F1B17] py-8 text-xs text-[#E2D9CC]/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-12">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-center md:text-left">
            <span className="font-serif text-sm font-semibold text-cream">Anvesh Seeli</span>
            <span className="hidden md:inline-block text-[#E2D9CC]/25">|</span>
            <span className="font-body text-xs">Performance Marketing & Growth Consultant</span>
          </div>
          <div className="flex items-center gap-4 text-center md:text-right">
            <span>Based in India.</span>
            <button
              onClick={handleScrollToTop}
              className="hover:text-cream cursor-pointer transition-colors duration-200"
              aria-label="Back to top"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
