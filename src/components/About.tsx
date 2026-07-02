import { motion, useReducedMotion } from "motion/react";

export default function About() {
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
    <section id="about" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-28 bg-cream">
      <motion.div {...animationProps} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column - Small Editorial Label */}
        <div className="lg:col-span-3">
          <h2 className="font-serif text-xs uppercase tracking-widest text-muted-ink">
            Strategic Thesis
          </h2>
          <p className="font-body text-sm text-muted-ink italic mt-2">
            The intersection of media and unit economics.
          </p>
        </div>

        {/* Right Column - Prominent Editorial copy */}
        <div className="flex flex-col space-y-6 lg:col-span-9">
          <p className="font-serif text-2xl leading-relaxed text-ink md:text-3xl max-w-4xl">
            I operate where media, measurement, and business outcomes meet. 
            By designing and implementing scientific growth structures, I help brands replace intuitive media spend with predictable first-party customer acquisition pipelines.
          </p>
          <div className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2">
            <p className="font-body text-base text-muted-ink md:text-lg leading-relaxed">
              My hands-on advisory spans high-velocity scale settings like Quick Service Restaurants (QSR) with <strong>Domino's Pizza India</strong>, multi-category consumer goods and pet nutrition with <strong>Mars Pet Nutrition</strong>, and scalable product marketing operating models for next-generation enterprise SaaS with <strong>Brane Enterprises</strong>.
            </p>
            <p className="font-body text-base text-muted-ink md:text-lg leading-relaxed">
              With a background in mechanical engineering from NIT Calicut and an MBA from IIM Calcutta, I approach growth as a quantitative engineering challenge. Whether auditing complex multi-channel spends or performing GA4 & GTM tracking audits, I aim for absolute tracking clarity and proven incrementality.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
