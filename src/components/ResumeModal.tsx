import { Download, X } from "lucide-react";
import { useEffect } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handleDownloadResumeClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "resume_download", {
        location: "resume_modal",
        link_url: "/resume.pdf",
      });
    }
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-cream text-ink border border-hairline p-6 md:p-12 shadow-2xl rounded max-h-[90vh] overflow-y-auto select-text" id="resume-modal-content">
        
        {/* Controls */}
        <div className="absolute top-4 right-4 flex items-center space-x-3">
          <a
            href="/resume.pdf"
            download="Anvesh_Seeli_Resume.pdf"
            onClick={handleDownloadResumeClick}
            className="flex items-center gap-2 rounded border border-hairline px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-ink hover:text-ink hover:border-ink transition-colors cursor-pointer"
            aria-label="Download resume PDF"
            id="btn-download-resume-modal"
          >
            <Download size={14} />
            Download PDF
          </a>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-muted-ink hover:text-ink hover:border-ink transition-colors cursor-pointer"
            aria-label="Close modal"
            id="btn-close-resume-modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Paper Resume Sheet Container */}
        <div className="mt-8 font-serif leading-relaxed max-w-3xl mx-auto select-text" id="resume-sheet">
          
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-hairline">
            <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              ANVESH SEELI
            </h1>
            <p className="text-sm font-semibold tracking-wide text-terracotta font-sans uppercase">
              Performance Marketing & Growth | Paid Media, Measurement & Commerce-led Growth
            </p>
            <p className="text-xs text-muted-ink font-sans">
              +91 81431 30661 &nbsp;·&nbsp; seelianvesh@gmail.com &nbsp;·&nbsp; linkedin.com/in/anvesh-seeli &nbsp;·&nbsp; anveshseeli.com
            </p>
          </div>

          {/* 1. PROFESSIONAL SUMMARY */}
          <div className="py-6 border-b border-hairline">
            <h2 className="text-sm font-semibold tracking-wider text-terracotta font-sans uppercase mb-3">
              Professional Summary
            </h2>
            <p className="text-sm text-ink leading-relaxed text-justify" style={{ fontFamily: "Georgia, serif" }}>
              Performance marketing and growth professional with <strong>4+ years</strong> across QSR, FMCG / pet care, SaaS product marketing and financial services, backed by an <strong>MBA from IIM Calcutta</strong> and <strong>B.Tech from NIT Calicut</strong>. I operate where media, measurement and business outcomes meet — running full-funnel acquisition across Google, Meta, Performance Max, YouTube, UAC, CRM and social commerce while keeping a strict eye on CAC, ROAS and unit economics. I have managed a <strong>Rs. 7 Cr+ monthly media portfolio</strong>, driven <strong>17% YoY customer growth</strong>, and used incrementality testing to turn marketing activity into clear decisions leadership can trust.
            </p>
          </div>

          {/* 2. CORE EXPERTISE */}
          <div className="py-6 border-b border-hairline">
            <h2 className="text-sm font-semibold tracking-wider text-terracotta font-sans uppercase mb-3">
              Core Expertise
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-ink font-sans">
                <strong className="text-ink">Performance Marketing:</strong> <span className="text-muted-ink">Google Ads (Search, Performance Max, Shopping, YouTube, UAC); Meta Ads (prospecting, retargeting, creative scaling); paid social, affiliates, influencers; budget governance</span>
              </p>
              <p className="text-ink font-sans">
                <strong className="text-ink">Measurement & Analytics:</strong> <span className="text-muted-ink">GA4, SQL, Power BI, Amplitude, Singular (MMP), Cube; incrementality testing; attribution sanity checks; funnel reporting; source-of-truth dashboards</span>
              </p>
              <p className="text-ink font-sans">
                <strong className="text-ink">Growth & Commerce:</strong> <span className="text-muted-ink">GTM strategy; CAC optimization; CRM & lifecycle; sampling / trial-led acquisition; social commerce (Instagram Shop, payment-partner campaigns); marketing-mix modeling</span>
              </p>
              <p className="text-ink font-sans">
                <strong className="text-ink">Economics & Discipline:</strong> <span className="text-muted-ink">CAC, CPA, LTV, ROAS, contribution margin, unit economics; scale / hold / cut decisions; ROI-accountable budget planning</span>
              </p>
              <p className="text-ink font-sans">
                <strong className="text-ink">Leadership & Operations:</strong> <span className="text-muted-ink">Cross-functional leadership (product, design, engineering); agency governance (10+ partners); leadership-ready reporting; Lean Six Sigma Green Belt</span>
              </p>
            </div>
          </div>

          {/* 3. PROFESSIONAL EXPERIENCE */}
          <div className="py-6 border-b border-hairline">
            <h2 className="text-sm font-semibold tracking-wider text-terracotta font-sans uppercase mb-4">
              Professional Experience
            </h2>
            
            <div className="space-y-6">
              {/* Mars */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <h3 className="font-bold text-ink text-base">
                    DDM Program Manager – Pet Nutrition <span className="text-muted-ink font-normal italic">— Mars Pet Nutrition, Hyderabad</span>
                  </h3>
                  <span className="text-ink font-semibold whitespace-nowrap">May 2025 – Feb 2026</span>
                </div>
                <p className="text-xs text-muted-ink italic leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                  Performance marketing, sampling-led acquisition, DDM planning, social commerce and measurement for brands including Pedigree, Whiskas and Sheba.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-ink" style={{ fontFamily: "Georgia, serif" }}>
                  <li>Drove Google, Meta and Performance Max-led acquisition initiatives with a focus on bottom-line cost efficiency.</li>
                  <li>Ran sampling-led acquisition across media and payment-partner channels, delivering <strong>655K samples in 3 months</strong> (50% of the annual target).</li>
                  <li>Improved visibility into channel efficiency and reduced cost-per-sample by 40% through optimised conversion funnels.</li>
                  <li>Led DDM reporting, planning and performance governance; launched a social-commerce integration via Instagram Shop to lift trial-to-purchase.</li>
                </ul>
              </div>

              {/* Brane */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <h3 className="font-bold text-ink text-base">
                    Product Leader – Marketing <span className="text-muted-ink font-normal italic">— Brane Enterprises, India</span>
                  </h3>
                  <span className="text-ink font-semibold whitespace-nowrap">Mar 2024 – Feb 2025</span>
                </div>
                <p className="text-xs text-muted-ink italic leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                  Product marketing, GTM planning, positioning and cross-functional operating systems for a product-led (SaaS) business.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-ink" style={{ fontFamily: "Georgia, serif" }}>
                  <li>Built product-marketing workflows and launch-planning structures; created GTM narratives, positioning documents and communication frameworks.</li>
                  <li>Partnered with product, design, engineering and business teams; supported OKR-based planning and improved launch readiness.</li>
                </ul>
              </div>

              {/* Domino's */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <h3 className="font-bold text-ink text-base">
                    Deputy Manager – Digital Marketing <span className="text-muted-ink font-normal italic">— Jubilant FoodWorks / Domino's Pizza India, Noida</span>
                  </h3>
                  <span className="text-ink font-semibold whitespace-nowrap">Aug 2021 – Mar 2023</span>
                </div>
                <p className="text-xs text-muted-ink italic leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                  Pan-India digital marketing across acquisition, retention, app growth, CRM, paid media, influencers, affiliates and brand partnerships.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-ink" style={{ fontFamily: "Georgia, serif" }}>
                  <li>Managed a <strong>Rs. 7 Cr+ monthly media portfolio</strong> with full ROI accountability across Meta, Google, YouTube, UAC, CRM, affiliates and influencers.</li>
                  <li>Contributed to 17% YoY customer-acquisition growth; lifted traffic 35% and conversion 25% via CRM and app-journey optimization.</li>
                  <li>Ran incrementality tests to validate true media contribution; coordinated 30+ stakeholders and 10+ partner agencies.</li>
                </ul>
              </div>

              {/* Simply Grow */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <h3 className="font-bold text-ink text-base">
                    Assistant Sales Manager <span className="text-muted-ink font-normal italic">— Simply Grow Technologies, Hyderabad</span>
                  </h3>
                  <span className="text-ink font-semibold whitespace-nowrap">Dec 2017 – Nov 2018</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-ink" style={{ fontFamily: "Georgia, serif" }}>
                  <li>Managed partnerships with 35 BSE-listed AMC fund houses; expanded SIP book by <strong>Rs. 120 Cr</strong> and lump-sum by <strong>Rs. 42 Cr</strong>; 12,500+ registrations in 7 months (peak 190% MoM), 95% CSAT across 11,000+ tickets.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. CONSULTING & LIVE PROJECTS */}
          <div className="py-6 border-b border-hairline">
            <h2 className="text-sm font-semibold tracking-wider text-terracotta font-sans uppercase mb-4">
              Consulting & Live Projects
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-sm">
                  <h3 className="font-bold text-ink">
                    Lead Generation & Store-Location Model — Prione / Cloudtail (Amazon–Catamaran JV) — MBA Internship
                  </h3>
                  <span className="text-ink font-semibold">2020</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-ink" style={{ fontFamily: "Georgia, serif" }}>
                  <li>Designed and ran A/B-tested Meta lead-gen campaigns for Amazon Easy Exclusive Stores, lifting hot-lead conversion to 66–74% and cutting cost-per-hot-lead to ~Rs. 29; built a channel cost-effectiveness framework to generate 4,000+ leads.</li>
                  <li>Built a scalable location-scouting tool (Google My Maps + browser automation + Excel macros) that reduced store-location turnaround time by ~40%.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-sm">
                  <h3 className="font-bold text-ink">
                    Return-Rate Reduction & Reverse Logistics — Jumia (Egypt) — Live Project (Country-Manager validated)
                  </h3>
                  <span className="text-ink font-semibold">MBA</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-ink" style={{ fontFamily: "Georgia, serif" }}>
                  <li>Identified 20+ opportunities and policy changes targeting a 30% return-rate reduction; benchmarked return policy vs local/global peers and ideated 6 UX initiatives; built an interactive dashboard to track return-rate contributors across categories, sellers and warehouses.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5. EDUCATION */}
          <div className="py-6 border-b border-hairline">
            <h2 className="text-sm font-semibold tracking-wider text-terracotta font-sans uppercase mb-3">
              Education
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-baseline">
                <p className="text-ink font-bold">
                  MBA — Marketing & Organizational Behavior, <span className="font-normal italic">IIM Calcutta</span>
                </p>
                <span className="text-ink font-semibold">2019 – 2021</span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-ink font-bold">
                  B.Tech — Mechanical Engineering, <span className="font-normal italic">NIT Calicut</span>
                </p>
                <span className="text-ink font-semibold">2013 – 2017</span>
              </div>
            </div>
          </div>

          {/* 6. CERTIFICATIONS & TECHNICAL STACK */}
          <div className="py-6">
            <h2 className="text-sm font-semibold tracking-wider text-terracotta font-sans uppercase mb-3">
              Certifications & Technical Stack
            </h2>
            <div className="space-y-2 text-sm text-sans">
              <p className="text-ink">
                <strong className="text-ink">Certifications:</strong> <span className="text-muted-ink">Google Ads — Measurement, Display, Apps & AI-Powered Performance Ads; Fundamentals of Digital Marketing; Lean Six Sigma Green Belt — KPMG.</span>
              </p>
              <p className="text-ink">
                <strong className="text-ink">Tools & Tech:</strong> <span className="text-muted-ink">Google Ads, Meta Ads, Performance Max, YouTube, DV360, Programmatic, Instagram Shop, GA4, SQL, Power BI, Amplitude, Singular, Cube.</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
