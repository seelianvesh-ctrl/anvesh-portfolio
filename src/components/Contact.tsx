import { motion } from "motion/react";
import {
  ArrowUpRight,
  Calendar,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { useReveal, track } from "../lib/motion";

const BOOKING_URL = "https://calendly.com/seelianvesh/30min";

/**
 * Closing panel: the three ways to start, set as full-width rows that flood
 * terracotta on hover. Same links, same analytics events as before.
 */
export default function Contact() {
  const heading = useReveal({ distance: 16 });
  const rows = useReveal({ distance: 16, delay: 0.08 });

  return (
    <section id="contact" className="dark-band relative bg-deep-charcoal text-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <motion.div
          {...heading}
          className="grid gap-x-14 gap-y-12 lg:grid-cols-12"
        >
          <div className="lg:col-span-6">
            <p className="eyebrow text-[#E2D9CC]/70">Collaboration</p>
            <h2
              id="contact-heading"
              className="display-2 mt-5 max-w-[24rem] text-cream"
            >
              Let&apos;s engineer your growth pipeline.
            </h2>
            <p className="mt-6 max-w-[26rem] font-body text-[1rem] leading-relaxed text-[#E2D9CC]/80">
              Whether you want to audit a high-spend account, fix measurement
              that is misleading your budgets, or require fractional growth
              management, let&apos;s explore how we can align your spend with
              business margins.
            </p>
          </div>

          <div
            id="contact-touchpoints"
            className="flex flex-col lg:col-span-6 lg:pl-6"
          >
            <Row
              id="calendly-button"
              href={BOOKING_URL}
              external
              icon={<Calendar size={16} strokeWidth={1.25} />}
              kicker="Introductory Session"
              label="Book a 30-Min Call"
              onClick={() =>
                track("book_call_click", {
                  location: "contact_section",
                  link_url: BOOKING_URL,
                })
              }
            />
            <Row
              id="email-button"
              href="mailto:hi@anveshseeli.com"
              icon={<Mail size={16} strokeWidth={1.25} />}
              kicker="Direct Inquiry"
              label="hi@anveshseeli.com"
              onClick={() => track("email_click")}
            />
            <Row
              id="linkedin-button"
              href="https://www.linkedin.com/in/anvesh-seeli/"
              external
              icon={<Linkedin size={16} strokeWidth={1.25} />}
              kicker="Professional Network"
              label="LinkedIn Profile"
              onClick={() => track("linkedin_click")}
            />
          </div>
        </motion.div>

        <motion.div
          {...rows}
          className="mt-16 border-t border-[#E2D9CC]/15 pt-8"
        >
          <p className="eyebrow text-[#E2D9CC]/60">Elsewhere</p>
          <div id="social-links" className="mt-5 flex flex-wrap gap-3">
            <Chip
              id="instagram-link"
              href="https://www.instagram.com/the_performanceengineer/"
              icon={<Instagram size={14} strokeWidth={1.25} />}
              label="Instagram"
              onClick={() => track("instagram_click")}
            />
            <Chip
              id="github-link"
              href="https://github.com/seelianvesh-ctrl"
              icon={<Github size={14} strokeWidth={1.25} />}
              label="GitHub"
              onClick={() => track("github_click")}
            />
            <Chip
              id="boldpro-link"
              href="https://in.bold.pro/my/anvesh-seeli-240819164718"
              icon={<Globe size={14} strokeWidth={1.25} />}
              label="Bold.pro"
              onClick={() => track("boldpro_click")}
            />
          </div>
        </motion.div>
      </div>

      <div className="border-t border-[#E2D9CC]/15 bg-ink">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-6 py-8 text-[#E2D9CC]/55 md:flex-row md:items-center md:px-10 lg:px-14">
          <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-4">
            <span className="font-serif text-[1.05rem] font-medium text-cream">
              Anvesh Seeli
            </span>
            <span className="hidden h-4 w-px bg-[#E2D9CC]/20 md:block" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]">
              Performance Marketing &amp; Growth Consultant
            </span>
          </div>
          <div className="flex items-center gap-5 font-mono text-[10.5px] uppercase tracking-[0.14em]">
            <span>Based in India.</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex cursor-pointer items-center gap-2 transition-colors duration-300 hover:text-cream"
              aria-label="Back to top"
            >
              Back to Top
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-1"
              >
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  id,
  href,
  icon,
  kicker,
  label,
  onClick,
  external = false,
}: {
  id: string;
  href: string;
  icon: React.ReactNode;
  kicker: string;
  label: string;
  onClick: () => void;
  external?: boolean;
}) {
  return (
    <a
      id={id}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="fill-row group flex items-center justify-between gap-6 border-b border-[#E2D9CC]/15 py-6"
    >
      <span className="flex min-w-0 items-center gap-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E2D9CC]/25 text-[#E2D9CC]/80 transition-colors duration-500 group-hover:border-cream group-hover:text-cream">
          {icon}
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E2D9CC]/60 transition-colors duration-500 group-hover:text-cream/80">
            {kicker}
          </span>
          <span className="truncate font-serif text-[1.05rem] font-medium text-cream md:text-[1.15rem]">
            {label}
          </span>
        </span>
      </span>
      <ArrowUpRight
        size={18}
        strokeWidth={1.25}
        className="shrink-0 text-[#E2D9CC]/60 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cream"
      />
    </a>
  );
}

function Chip({
  id,
  href,
  icon,
  label,
  onClick,
}: {
  id: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group flex items-center gap-2.5 border border-[#E2D9CC]/20 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#E2D9CC]/80 transition-colors duration-300 hover:border-cream hover:text-cream"
    >
      <span className="transition-colors duration-300 group-hover:text-ember">
        {icon}
      </span>
      {label}
    </a>
  );
}
