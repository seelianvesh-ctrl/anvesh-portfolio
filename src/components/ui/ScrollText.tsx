import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

/**
 * Statement paragraph that sets itself as you scroll.
 *
 * Words ease from a light tint to full ink across the scroll range. The text
 * never changes — no clipping, no per-word jumping — so the paragraph reads
 * normally if JavaScript, motion or the observer is unavailable.
 */
export default function ScrollText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.42"],
  });
  const words = useMemo(() => text.split(" "), [text]);
  // First paint renders at full ink (also the no-JS state); the scroll effect
  // takes over once mounted.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (reduce || !ready) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}
