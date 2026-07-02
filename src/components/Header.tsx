import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("work");

  // Track scroll position to update active anchor
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["work", "capabilities", "services", "timeline", "credentials", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Work", target: "work" },
    { label: "Capabilities", target: "capabilities" },
    { label: "Services", target: "services" },
    { label: "Timeline", target: "timeline" },
    { label: "Credentials", target: "credentials" },
    { label: "Contact", target: "contact" }
  ];

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand/Signature */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-lg font-semibold tracking-tight text-ink cursor-pointer focus:outline-none"
          id="nav-logo"
        >
          Anvesh Seeli
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className={`font-body text-base tracking-wide transition-colors duration-200 cursor-pointer focus:outline-none ${
                activeSection === item.target
                  ? "text-terracotta font-medium"
                  : "text-muted-ink hover:text-ink"
              }`}
              id={`nav-item-${item.target}`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/articles/"
            className="font-body text-base tracking-wide text-muted-ink transition-colors duration-200 hover:text-ink"
            id="nav-item-articles"
          >
            Articles
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden items-center md:flex">
          <a
            href="https://calendly.com/seelianvesh/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag("event", "book_call_click", {
                  location: "header_desktop",
                  link_url: "https://calendly.com/seelianvesh/30min",
                });
              }
            }}
            className="rounded bg-terracotta px-5 py-2 font-serif text-sm font-medium text-cream transition-colors duration-200 hover:bg-terracotta/90 cursor-pointer"
            id="nav-cta"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden focus:outline-none"
          aria-label="Toggle Menu"
          id="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-hairline bg-cream px-6 py-6 md:hidden">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className={`text-left font-body text-lg py-1 transition-colors ${
                  activeSection === item.target ? "text-terracotta font-medium" : "text-muted-ink"
                }`}
                id={`mobile-nav-item-${item.target}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/articles/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left font-body text-lg py-1 transition-colors text-muted-ink"
              id="mobile-nav-item-articles"
            >
              Articles
            </a>
            <div className="pt-4 border-t border-hairline">
              <a
                href="https://calendly.com/seelianvesh/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "book_call_click", {
                      location: "header_mobile",
                      link_url: "https://calendly.com/seelianvesh/30min",
                    });
                  }
                }}
                className="block w-full text-center rounded bg-terracotta py-3 font-serif text-base font-medium text-cream hover:bg-terracotta/90"
                id="mobile-nav-cta"
              >
                Book a Call
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
