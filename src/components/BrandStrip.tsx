import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const BRANDS = [
  { name: "Domino's Pizza", domain: "dominos.com" },
  { name: "Mars", domain: "mars.com" },
  { name: "Pedigree", domain: "pedigree.com" },
  { name: "Whiskas", domain: "whiskas.com" },
  { name: "Sheba", domain: "sheba.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Jumia", domain: "jumia.com" }
];

export default function BrandStrip() {
  const shouldReduceMotion = useReducedMotion();
  const [failedDomains, setFailedDomains] = useState<Record<string, boolean>>({});

  const handleImageError = (domain: string) => {
    setFailedDomains((prev) => ({ ...prev, [domain]: true }));
  };

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
      };

  const isMarquee = !shouldReduceMotion;
  const marqueeItems = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 bg-cream">
      <motion.div {...animationProps} className="flex flex-col space-y-6">
        {/* Fine Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-serif text-xs uppercase tracking-widest text-muted-ink">
            Brands I've worked with / on
          </span>
          <span className="font-body text-xs italic text-muted-ink">
            Trademarks of their respective owners.
          </span>
        </div>

        {/* Thin top divider */}
        <hr className="border-hairline" />

        {/* Logo Container */}
        <div className="relative w-full overflow-hidden py-2" id="brand-logos-container">
          {/* Gradient Overlay for Fade Effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent" />

          {isMarquee ? (
            <motion.div
              className="flex w-max items-center gap-16 sm:gap-24"
              animate={{
                x: ["0%", "-25%"]
              }}
              transition={{
                ease: "linear",
                duration: 35,
                repeat: Infinity,
              }}
            >
              {marqueeItems.map((brand, idx) => {
                const isFailed = failedDomains[brand.domain];
                return (
                  <div
                    key={`${brand.domain}-${idx}`}
                    className="group relative flex h-14 shrink-0 items-center justify-center transition-all duration-300"
                  >
                    {isFailed ? (
                      <span className="font-serif text-xs md:text-sm tracking-widest uppercase font-semibold text-muted-ink hover:text-ink transition-colors select-none">
                        {brand.name}
                      </span>
                    ) : (
                      <img
                        src={`https://logo.clearbit.com/${brand.domain}`}
                        alt={`${brand.name} Logo`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(brand.domain)}
                        className="h-8 sm:h-10 w-auto max-w-[140px] object-contain filter grayscale opacity-65 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    )}
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 py-4 md:justify-between">
              {BRANDS.map((brand) => {
                const isFailed = failedDomains[brand.domain];
                return (
                  <div
                    key={brand.domain}
                    className="group relative flex h-14 items-center justify-center transition-all duration-300"
                  >
                    {isFailed ? (
                      <span className="font-serif text-xs md:text-sm tracking-widest uppercase font-semibold text-muted-ink hover:text-ink transition-colors select-none">
                        {brand.name}
                      </span>
                    ) : (
                      <img
                        src={`https://logo.clearbit.com/${brand.domain}`}
                        alt={`${brand.name} Logo`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(brand.domain)}
                        className="h-10 w-auto max-w-[140px] object-contain filter grayscale opacity-65 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Thin bottom divider */}
        <hr className="border-hairline" />
      </motion.div>
    </section>
  );
}
