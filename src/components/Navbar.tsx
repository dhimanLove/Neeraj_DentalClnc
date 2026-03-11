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
    if (!mobileMenuRef.current) return;

    if (mobileOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.from(mobileMenuRef.current.querySelectorAll(".mobile-link"), {
        y: 20,
        opacity: 0,
        stagger: 0.07,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.1,
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.2,
        ease: "power2.in",
      });
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
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-16 xl:px-24">

          {/* Logo */}
          <button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-soft">
              <img
                  src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-q5mb4zZCjsJCQx7qowogOswdi6h1Qz.png&w=500&q=75"
                  alt="Neeraj Dental Logo"
                  className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start">
    <span className="text-base font-semibold tracking-tight">
      Neeraj Dental
    </span>
              <span className="text-xs font-medium text-muted-foreground">
      Clinic
    </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo("#appointment")}
              className="bg-primary text-primary-foreground px-7 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 opacity-0 pointer-events-none"
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="mobile-link text-2xl font-medium hover:text-primary transition-colors"
          >
            {link.label}
          </button>
        ))}

        <button
          onClick={() => scrollTo("#appointment")}
          className="mobile-link mt-6 bg-primary text-primary-foreground px-10 py-4 rounded-full text-base font-medium hover:bg-primary/90 transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </>
  );
};

export default Navbar;