import { motion, useReducedMotion } from "motion/react";
import { EASE_IO } from "../../lib/motion";

/**
 * Expand/collapse mark.
 *
 * Two hairlines. One is always horizontal; the other is pinned upright (rotate
 * 90deg) so the pair reads as "+" at rest. On open, the upright stroke folds
 * away — it fades while shrinking along its own axis — leaving the single
 * horizontal line, "−".
 *
 * Both strokes are 1px tall, so the rotation must be static and only opacity /
 * scale animated: an early version animated rotate to 0 when closed, which laid
 * the upright stroke flat on top of the horizontal one and made every row read
 * as "−" regardless of state.
 *
 * Shared by the case ledger and the FAQ.
 */
export default function Mark({ open }: { open: boolean }) {
  const reduce = useReducedMotion();
  const stroke = "bg-ink";
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.36, ease: EASE_IO };

  return (
    <span
      aria-hidden="true"
      className="relative flex h-9 w-9 shrink-0 items-center justify-center border border-hairline transition-colors duration-300 group-hover:border-ink"
    >
      {/* horizontal stroke — present in both states */}
      <span className={`absolute h-px w-4 ${stroke}`} />

      {/* upright stroke — stands vertical, folds away when open */}
      <motion.span
        className={`absolute h-px w-4 ${stroke}`}
        initial={false}
        animate={{
          rotate: 90,
          opacity: open ? 0 : 1,
          scaleX: open ? 0.2 : 1,
        }}
        transition={transition}
      />
    </span>
  );
}
