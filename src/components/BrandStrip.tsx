import { useState } from "react";
import Marquee from "./ui/Marquee";

const BRANDS = [
  { name: "Domino's Pizza", domain: "dominos.com" },
  { name: "Mars", domain: "mars.com" },
  { name: "Pedigree", domain: "pedigree.com" },
  { name: "Whiskas", domain: "whiskas.com" },
  { name: "Sheba", domain: "sheba.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Jumia", domain: "jumia.com" },
];

/**
 * Brand ticker.
 *
 * Full-bleed band so the page opens up after the hero. Marks are desaturated
 * until hovered, and fall back to a typeset wordmark if the logo host is
 * unreachable.
 */
export default function BrandStrip() {
  const [failedDomains, setFailedDomains] = useState<Record<string, boolean>>({});

  const mark = (brand: (typeof BRANDS)[number]) =>
    failedDomains[brand.domain] ? (
      <span className="whitespace-nowrap font-serif text-sm font-medium uppercase tracking-[0.14em] text-muted-ink">
        {brand.name}
      </span>
    ) : (
      <img
        src={`https://logo.clearbit.com/${brand.domain}`}
        alt={`${brand.name} Logo`}
        width={112}
        height={32}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() =>
          setFailedDomains((prev) => ({ ...prev, [brand.domain]: true }))
        }
        className="h-8 w-[112px] object-contain opacity-55 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
      />
    );

  return (
    <section className="border-b border-hairline bg-band">
      <div className="mx-auto max-w-[1440px] px-6 pt-7 md:px-10 lg:px-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="eyebrow">Brands I&apos;ve worked with / on</p>
          <p className="font-body text-xs italic text-muted-ink">
            Trademarks of their respective owners.
          </p>
        </div>
      </div>

      <div id="brand-logos-container" className="py-7 md:py-9">
        <Marquee duration={54}>
          {BRANDS.map((brand) => (
            <div
              key={brand.domain}
              className="flex h-12 shrink-0 items-center justify-center px-8 sm:px-12"
            >
              {mark(brand)}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
