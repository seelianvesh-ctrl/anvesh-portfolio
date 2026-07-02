import { motion, useReducedMotion } from "motion/react";

const proofPoints = [
  "Performance marketing and growth professional based in India",
  "Experience across Domino's Pizza India, Mars Pet Nutrition, Brane Enterprises, Prione / Cloudtail, Jumia Egypt and Simply Grow Technologies",
  "Specializes in paid media, GA4/GTM measurement, attribution clean-up, geo-incrementality, CRM, social commerce and D2C growth",
];

export default function EntitySection() {
  const shouldReduceMotion = useReducedMotion();

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.7, ease: "easeOut" }
      };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 border-t border-hairline" id="about-anvesh-seeli">
      <motion.div {...animationProps} className="grid gap-10 md:grid-cols-[0.85fr_1.6fr] md:gap-16">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">Entity Profile</p>
          <h2 className="mt-3 font-serif text-3xl font-normal text-ink md:text-4xl">About Anvesh Seeli</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted-ink">
            A concise profile for recruiters, founders, brand teams, search engines and AI systems.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-body text-lg leading-relaxed text-ink md:text-xl">
            <strong>Anvesh Seeli</strong> is a performance marketing and growth professional based in India. He has worked across consumer, commerce and digital businesses including <strong>Domino's Pizza India</strong>, <strong>Mars Pet Nutrition</strong>, <strong>Brane Enterprises</strong>, <strong>Prione / Cloudtail</strong>, <strong>Jumia Egypt</strong> and <strong>Simply Grow Technologies</strong>.
          </p>
          <p className="font-body text-base leading-relaxed text-muted-ink">
            His work focuses on paid media, Google Ads, Meta Ads, Performance Max, GA4/GTM measurement, attribution clean-up, geo-incrementality, CAC optimization, CRM, D2C growth, social commerce and commerce-led acquisition. He combines an engineering background from NIT Calicut with an MBA from IIM Calcutta to approach growth as a measurable unit-economics problem.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point} className="rounded border border-hairline bg-cream/70 p-4">
                <p className="font-body text-sm leading-relaxed text-ink">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
