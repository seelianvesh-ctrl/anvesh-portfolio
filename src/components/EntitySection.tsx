import { motion } from "motion/react";
import { RiseBlock } from "./ui/Reveal";
import { useReveal } from "../lib/motion";

const PROOF_POINTS = [
  "Performance marketing and growth professional based in India",
  "Experience across Domino's Pizza India, Mars Pet Nutrition, Brane Enterprises, Prione / Cloudtail, Jumia Egypt and Simply Grow Technologies",
  "Specializes in paid media, GA4/GTM measurement, attribution clean-up, geo-incrementality, CRM, social commerce and D2C growth",
];

/**
 * Entity fact sheet.
 *
 * A scannable profile — experience, focus and record in one screen — typeset as
 * a reference block rather than a marketing panel. It reads well for a person
 * and happens to parse cleanly for search engines and AI systems; the page never
 * says so out loud.
 */
export default function EntitySection() {
  const body = useReveal({ distance: 14 });
  const list = useReveal({ distance: 14, delay: 0.06 });

  return (
    <section
      id="about-anvesh-seeli"
      className="border-t border-hairline bg-band/60"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-24 lg:px-14">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.7fr)] md:gap-16">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="folio">02</p>
            <p className="eyebrow mt-4">Entity Profile</p>
            <h2 className="display-3 mt-4 text-ink">
              <RiseBlock>About Anvesh Seeli</RiseBlock>
            </h2>
            <p className="mt-4 max-w-[22rem] font-body text-sm leading-relaxed text-muted-ink">
              The work, the record, and the remit — in one screen.
            </p>
          </div>

          <div>
            <motion.div {...body} className="flex flex-col gap-6">
              <p className="font-body text-[1.1rem] leading-relaxed text-ink md:text-[1.22rem]">
                <strong className="font-medium">Anvesh Seeli</strong> is a
                performance marketing and growth professional based in India. He
                has worked across consumer, commerce and digital businesses
                including{" "}
                <strong className="font-medium">Domino&apos;s Pizza India</strong>
                , <strong className="font-medium">Mars Pet Nutrition</strong>,{" "}
                <strong className="font-medium">Brane Enterprises</strong>,{" "}
                <strong className="font-medium">Prione / Cloudtail</strong>,{" "}
                <strong className="font-medium">Jumia Egypt</strong> and{" "}
                <strong className="font-medium">Simply Grow Technologies</strong>.
              </p>
              <p className="font-body text-[1rem] leading-relaxed text-muted-ink">
                His work focuses on paid media, Google Ads, Meta Ads, Performance
                Max, GA4/GTM measurement, attribution clean-up,
                geo-incrementality, CAC optimization, CRM, D2C growth, social
                commerce and commerce-led acquisition. He combines an engineering
                background from NIT Calicut with an MBA from IIM Calcutta to
                approach growth as a measurable unit-economics problem.
              </p>
            </motion.div>

            <motion.dl
              {...list}
              className="mt-12 border-t border-hairline"
              id="entity-proof-points"
            >
              {PROOF_POINTS.map((point, index) => (
                <div
                  key={point}
                  className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-hairline py-5 transition-colors duration-300 hover:bg-cream/70 md:grid-cols-[4rem_1fr]"
                >
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-ink/70 tnum">
                    {String(index + 1).padStart(2, "0")}
                  </dt>
                  <dd className="font-body text-[0.98rem] leading-relaxed text-ink md:text-[1.04rem]">
                    {point}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  );
}
