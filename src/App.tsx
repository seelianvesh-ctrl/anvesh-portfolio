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

export default function App() {
  return (
    <div className="relative min-h-screen bg-cream text-ink select-none font-body antialiased selection:bg-terracotta/20 selection:text-ink">
      {/* High-fidelity tactile paper noise overlay */}
      <div className="paper-grain" />

      {/* Slim, sticky navigation bar */}
      <Header />

      {/* Main Container */}
      <main className="relative z-10">
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

        {/* 5. Interactive accordion-style case studies */}
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

        {/* 11. FAQ collapsible accordions */}
        <FAQ />

        {/* 12. Contact CTAs & dark footer */}
        <Contact />
      </main>
    </div>
  );
}
