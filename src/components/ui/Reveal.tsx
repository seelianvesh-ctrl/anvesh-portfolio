import type { ReactNode } from "react";
import { motion } from "motion/react";
import { DUR, EASE_OUT, VIEWPORT, useReveal } from "../../lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  from?: "below" | "left" | "none";
};

/** One-shot scroll reveal. Nothing appears twice, nothing bounces. */
export default function Reveal({
  children,
  className,
  delay = 0,
  distance,
  from,
}: RevealProps) {
  const props = useReveal({ delay, distance, from });
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}

type RipProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  duration?: number;
  /** Horizontal offset of the mask, for text that should arrive sideways. */
  from?: "below" | "left";
};

/**
 * Masked arrival: the content slides up out of a clipped box.
 *
 * The text in the DOM is always the final text — the movement lives entirely in
 * a transform, so crawlers, find-in-page and screen readers see the real value
 * and the block never changes size (no layout shift).
 */
export function Rise({
  children,
  className = "",
  delay = 0,
  duration = DUR.slow,
  from = "below",
}: RipProps) {
  const hidden = from === "left" ? { x: "-0.35em" } : { y: "0.9em" };

  return (
    <span
      className={`inline-block overflow-hidden align-bottom pt-[0.12em] -mt-[0.12em] pb-[0.16em] -mb-[0.16em] ${className}`}
    >
      <motion.span
        className="inline-block"
        initial={hidden}
        whileInView={{ x: 0, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** A block-level masked arrival, for headlines that break over several lines. */
export function RiseBlock({
  children,
  className = "",
  delay = 0,
  duration = DUR.slow,
}: Omit<RipProps, "from">) {
  return (
    <span className={`block overflow-hidden pt-[0.12em] -mt-[0.12em] pb-[0.16em] -mb-[0.16em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        whileInView={{ y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </span>
  );
}
