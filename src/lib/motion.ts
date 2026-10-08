/**
 * Shared motion language.
 *
 * One easing family for the whole site (out-quint for reveals, in-out-quart for
 * size changes) so movement feels authored rather than assembled. Every helper
 * degrades to a plain fade when the visitor asks for reduced motion.
 */
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IO: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DUR = {
  quick: 0.32,
  base: 0.62,
  slow: 0.95,
} as const;

/** Trigger point used by every scroll reveal on the page. */
export const VIEWPORT = { once: true, margin: "-8% 0px -12% 0px" } as const;

type RevealOptions = {
  /** Travel distance in px. */
  distance?: number;
  /** Seconds. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  /** Cross-fade from below instead of a straight rise. */
  from?: "below" | "left" | "none";
};

/**
 * Returns motion props for a one-shot scroll reveal.
 * Under reduced motion the element only fades, and travels no distance.
 */
export function useReveal({
  distance = 18,
  delay = 0,
  duration = DUR.base,
  from = "below",
}: RevealOptions = {}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: VIEWPORT,
      transition: { duration: 0.4, delay: delay * 0.4, ease: EASE_OUT },
    } as const;
  }

  const hidden =
    from === "left"
      ? { opacity: 0, x: -distance }
      : from === "none"
        ? { opacity: 0 }
        : { opacity: 0, y: distance };

  return {
    initial: hidden,
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: VIEWPORT,
    transition: { duration, delay, ease: EASE_OUT },
  } as const;
}

/**
 * Staggered container/child variants for grouped lists
 * (credentials, notes, capability items).
 */
export function useStagger(step = 0.08) {
  const reduce = useReducedMotion();

  return {
    container: {
      hidden: {},
      visible: { transition: { staggerChildren: reduce ? 0 : step } },
    },
    item: reduce
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.4 } },
        }
      : {
          hidden: { opacity: 0, y: 14 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: DUR.base, ease: EASE_OUT },
          },
        },
  } as const;
}

/**
 * Tracks which of the given elements is currently crossing the reading line
 * (roughly a third down the viewport). Used for the capability index and the
 * case-file ledger.
 */
export function useActiveIndex(count: number, offset = 0.34) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * offset;
      let next = 0;
      refs.current.forEach((el, index) => {
        if (el && el.getBoundingClientRect().top - line <= 0) next = index;
      });
      setActive((prev) => (prev === next ? prev : next));
    };

    const request = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [count, offset]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { active, setRef };
}

/** GA4 helper — every interaction event on the page routes through here. */
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag === "function") gtag("event", event, params);
}

/** Smooth-scrolls an element under the sticky header. */
export function scrollToElement(el: HTMLElement | null, offset = 84) {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

/** Smooth-scrolls to a section by id, clearing the sticky header. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToElement(el);
  return true;
}
