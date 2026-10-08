import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Reading progress: a 2px terracotta hairline pinned to the top of the viewport.
 * Driven by a motion value, so it never triggers a React render.
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-terracotta no-print"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
