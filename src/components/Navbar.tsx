import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#appointment" }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileOpen) {
        gsap.to(mobileMenuRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3, ease: "power2.out" });
        gsap.from(mobileMenuRef.current.querySelectorAll(".mobile-link"), {
          y: 20, opacity: 0, stagger: 0.05, duration: 0.4, ease: "power3.out", delay: 0.1
        });
      } else {
        gsap.to(mobileMenuRef.current, { opacity: 0, pointerEvents: "none", duration: 0.2, ease: "power2.in" });
      }
    }
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ?
          "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3" :
          "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo and Clinic Name */}
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🦷</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-base font-bold tracking-tight text-foreground">
                Neeraj Dental
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Clinic
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="link-underline text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 pb-0.5"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo("#appointment")}
              className="text-[13px] font-medium bg-primary text-primary-foreground px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors duration-300"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 opacity-0 pointer-events-none"
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="mobile-link text-2xl font-medium text-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo("#appointment")}
          className="mobile-link mt-4 bg-primary text-primary-foreground px-8 py-3 rounded-full text-base font-medium hover:bg-primary/90 transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </>
  );
};

export default Navbar;