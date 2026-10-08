import { motion } from "motion/react";
import ScrollText from "./ui/ScrollText";
import { useReveal } from "../lib/motion";

const MANIFESTO =
  "I operate where media, measurement, and business outcomes meet. By designing and implementing scientific growth structures, I help brands replace intuitive media spend with predictable first-party customer acquisition pipelines.";

/**
 * Strategic thesis: a statement paragraph that sets itself on scroll, held in a
 * measured column with the label running down the margin like a print gutter.
 */
export default function About() {
  const first = useReveal({ distance: 14 });
  const second = useReveal({ distance: 14, delay: 0.06 });

  return (
    <section
      id="about"
      className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28 lg:px-14"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-14">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 lg:sticky lg:top-32">
            <span className="folio">01</span>
            <span className="h-px w-8 bg-hairline" aria-hidden="true" />
            <p className="eyebrow">Strategic Thesis</p>
          </div>
          <p className="mt-3 font-body text-sm italic text-muted-ink lg:sticky lg:top-40 lg:mt-8 lg:max-w-[13rem]">
            The intersection of media and unit economics.
          </p>
        </div>

        <div className="lg:col-span-9">
          <ScrollText
            className="font-serif text-[1.55rem] leading-[1.42] text-ink sm:text-[1.8rem] md:text-[2.15rem] md:leading-[1.36]"
            text={MANIFESTO}
          />

          <div className="mt-12 grid gap-10 border-t border-hairline pt-10 sm:grid-cols-2 sm:gap-0 md:mt-14">
            <motion.p
              {...first}
              className="font-body text-[1.02rem] leading-relaxed text-muted-ink sm:pr-10 md:text-[1.06rem]"
            >
              My hands-on advisory spans high-velocity scale settings like Quick
              Service Restaurants (QSR) with{" "}
              <strong className="font-medium text-ink">
                Domino&apos;s Pizza India
              </strong>
              , multi-category consumer goods and pet nutrition with{" "}
              <strong className="font-medium text-ink">Mars Pet Nutrition</strong>
              , and scalable product marketing operating models for
              next-generation enterprise SaaS with{" "}
              <strong className="font-medium text-ink">Brane Enterprises</strong>.
            </motion.p>

            <motion.p
              {...second}
              className="font-body text-[1.02rem] leading-relaxed text-muted-ink sm:border-l sm:border-hairline sm:pl-10 md:text-[1.06rem]"
            >
              With a background in mechanical engineering from NIT Calicut and an
              MBA from IIM Calcutta, I approach growth as a quantitative
              engineering challenge. Whether auditing complex multi-channel
              spends or untangling measurement that misleads budget decisions, I
              aim for absolute tracking clarity and proven incrementality.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
