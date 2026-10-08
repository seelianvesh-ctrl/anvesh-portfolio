import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. */
  duration?: number;
  className?: string;
  /** Content shown when the visitor prefers reduced motion (no movement). */
  staticClassName?: string;
};

/**
 * CSS-driven ticker. Two identical copies translate by exactly -50%, so the
 * loop is seamless; the animation runs on the compositor and pauses on hover.
 */
export default function Marquee({
  children,
  duration = 46,
  className = "",
  staticClassName = "",
}: MarqueeProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`flex flex-wrap items-center gap-x-16 gap-y-6 ${staticClassName}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
