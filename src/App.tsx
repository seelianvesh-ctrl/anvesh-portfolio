import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BrandStrip from "./components/BrandStrip";
import About from "./components/About";
import EntitySection from "./components/EntitySection";
import Capabilities from "./components/Capabilities";
import SelectedWork from "./components/SelectedWork";
import OperatingSystem from "./components/OperatingSystem";
import Services from "./components/Services";
import Timeline from "./components/Timeline";
import Credentials from "./components/Credentials";
import GrowthNotes from "./components/GrowthNotes";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import ResumeGateModal from "./components/ResumeGateModal";
import ScrollProgress from "./components/ui/ScrollProgress";
import ChapterRail from "./components/ui/ChapterRail";
import { startScrollTracking } from "./lib/scroll";

/** Chapters the header and the rail both track. */
const CHAPTER_IDS = [
  "work",
  "capabilities",
  "services",
  "timeline",
  "credentials",
  "contact",
];

export default function App() {
  // Open the resume gate when arriving via /?resume=gate (used by static article pages)
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("resume") === "gate") {
      const timer = setTimeout(
        () =>
          (
            window as unknown as { openResumeGate?: () => void }
          ).openResumeGate?.(),
        350,
      );
      window.history.replaceState({}, "", "/");
      return () => clearTimeout(timer);
    }
  }, []);

  // One scroll subscription for the header and chapter rail.
  useEffect(() => startScrollTracking(CHAPTER_IDS), []);

  return (
    <div className="relative min-h-screen bg-cream font-body text-ink antialiased">
      {/* High-fidelity tactile paper noise overlay */}
      <div className="paper-grain" aria-hidden="true" />

      <a href="#main" className="skip-link no-print">
        Skip to content
      </a>

      <ScrollProgress />
      <Header />

      <main id="main" className="relative z-10">
        {/* 1. Hero banner with high-impact serif headline and key stats */}
        <Hero />

        {/* 2. Logo ribbon for brands with error protection */}
        <BrandStrip />

        {/* 3. Strategic about / positioning copy */}
        <About />

        {/* 3b. Explicit entity section for SEO/GEO clarity */}
        <EntitySection />

        {/* 4. Core capabilities structured columns */}
        <Capabilities />

        {/* 5. Case ledger — every file stays in the document */}
        <SelectedWork />

        {/* 6. Growth operating system 5-step numbered framework */}
        <OperatingSystem />

        {/* 7. Strategic service offerings */}
        <Services />

        {/* 8. Career history timeline */}
        <Timeline />

        {/* 9. Professional education, certifications, and technical tools */}
        <Credentials />

        {/* 10. Brief notes, observations, and advice on incrementality */}
        <GrowthNotes />

        {/* 11. FAQ — answers remain mounted for crawlers and find-in-page */}
        <FAQ />

        {/* 12. Contact CTAs & dark footer */}
        <Contact />
      </main>

      <ChapterRail />

      {/* Resume Gate Modal */}
      <ResumeGateModal resumeUrl="/resume.pdf" />
    </div>
  );
}
