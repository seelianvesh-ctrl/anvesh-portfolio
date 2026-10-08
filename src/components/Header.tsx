import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useActiveSection, useScrollY } from "../lib/scroll";
import { EASE_OUT, scrollToSection, track } from "../lib/motion";

const NAV = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "services", label: "Services" },
  { id: "timeline", label: "Timeline" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

const BOOKING_URL = "https://calendly.com/seelianvesh/30min";

/**
 * Masthead.
 *
 * Rests flat over the hero, then acquires a hairline and tightens once the page
 * starts moving. The current chapter is marked by a rule that slides between
 * items rather than a highlight that blinks on and off.
 */
export default function Header() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const y = useScrollY();
  const compact = y > 48;

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const bookCall = (location: string) => {
    track("book_call_click", { location, link_url: BOOKING_URL });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full bg-cream/85 backdrop-blur-md transition-[border-color] duration-500 ${
        compact ? "border-b border-hairline" : "border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-[height] duration-500 md:px-10 lg:px-14 ${
          compact ? "h-[58px]" : "h-[72px]"
        }`}
      >
        <button
          type="button"
          id="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2.5 cursor-pointer"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 bg-terracotta transition-transform duration-500 group-hover:rotate-45"
          />
          <span className="font-serif text-[1.15rem] font-medium tracking-tight text-ink">
            Anvesh Seeli
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                id={`nav-item-${item.id}`}
                onClick={() => go(item.id)}
                className={`relative cursor-pointer py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  isActive ? "text-ink" : "text-muted-ink hover:text-ink"
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-rule"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-terracotta"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.5, ease: EASE_OUT }
                    }
                  />
                ) : null}
              </button>
            );
          })}
          <a
            href="/articles/"
            id="nav-item-articles"
            className="py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-ink transition-colors duration-300 hover:text-ink"
          >
            Articles
          </a>
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-cta"
            onClick={() => bookCall("header_desktop")}
            className="group inline-flex items-center gap-2.5 bg-ink px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-terracotta"
          >
            Book a Call
            <ArrowRight
              size={13}
              strokeWidth={1.25}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        <button
          type="button"
          id="mobile-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 cursor-pointer items-center justify-center md:hidden"
        >
          {menuOpen ? (
            <X size={18} strokeWidth={1.5} />
          ) : (
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-5 bg-ink" />
              <span className="block h-px w-5 bg-ink" />
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: reduce ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="absolute inset-x-0 top-full h-[calc(100vh-100%)] overflow-y-auto border-t border-hairline bg-cream md:hidden"
          >
            <nav className="flex flex-col px-6 py-6" aria-label="Mobile">
              {NAV.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => go(item.id)}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduce ? 0 : 0.05 + index * 0.05,
                    ease: EASE_OUT,
                  }}
                  className="flex items-baseline gap-4 border-b border-hairline py-4 text-left"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-terracotta tnum">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-serif text-[1.35rem] ${
                      active === item.id ? "text-terracotta" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}

              <a
                href="/articles/"
                id="mobile-nav-item-articles"
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4 border-b border-hairline py-4"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-terracotta tnum">
                  {String(NAV.length + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-[1.35rem] text-ink">
                  Articles
                </span>
              </a>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-nav-cta"
                onClick={() => {
                  bookCall("header_mobile");
                  setMenuOpen(false);
                }}
                className="mt-7 flex items-center justify-between bg-terracotta px-5 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-cream"
              >
                Book a Call
                <ArrowRight size={14} strokeWidth={1.25} />
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
