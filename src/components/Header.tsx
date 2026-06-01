import { Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "Accueil", id: "accueil" },
  { label: "A propos", id: "historique" },
  { label: "Services", id: "services" },
  { label: "Tarifs", id: "tarifs" },
  { label: "Contact", id: "contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    if (!mobileOpen) return;
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const linkClass =
    "text-foreground hover:text-primary transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("accueil")}
            className="transition-opacity hover:opacity-80"
          >
            <Logo size="sm" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={linkClass}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <a
              href="https://wa.me/41227886595"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-strong"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Appeler maintenant</span>
            </a>

            {/* Hamburger Button — visible only on mobile */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors duration-200"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">
                {mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              </span>
              {/* Animated hamburger bars */}
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-6 bg-foreground rounded-full transition-all duration-300 origin-center ${
                    mobileOpen
                      ? "translate-y-[9px] rotate-45"
                      : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-foreground rounded-full transition-all duration-200 ${
                    mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-foreground rounded-full transition-all duration-300 origin-center ${
                    mobileOpen
                      ? "-translate-y-[9px] -rotate-45"
                      : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          mobileOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-background/98 backdrop-blur-md border-t border-border px-4 pb-6 pt-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary-light font-medium transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 60}ms` : "0ms",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-4 px-4">
            <a
              href="https://wa.me/41227886595"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 shadow-soft transition-all duration-300"
            >
              <Phone className="h-5 w-5" />
              Appeler maintenant
            </a>
          </div>
        </nav>
      </div>

      {/* Overlay behind mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
