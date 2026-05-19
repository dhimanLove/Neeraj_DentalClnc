import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {
  Phone,
  Calendar,
  Sparkles,
  ArrowRight,
  Shield,
  Star,
  Clock,
  X
} from "lucide-react";
import gsap from 'gsap';
import AnimatedThemeToggle from "./themetoggle";

const NAV_LINKS = ['Services', 'About', 'Team', 'Reviews', 'Contact'];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navbarRef = useRef<HTMLElement>(null);

  // Refs for pill animation (nav links)
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const navItemRefs = useRef<(HTMLElement | null)[]>([]);

  // Refs for CTA button pill animation
  const ctaCircleRef = useRef<HTMLSpanElement | null>(null);
  const ctaTlRef = useRef<gsap.core.Timeline | null>(null);
  const ctaActiveTweenRef = useRef<gsap.core.Tween | null>(null);
  const ctaItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
  }, []);

  // Scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Smooth scroll with offset
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const navbarHeight = navbarRef.current?.offsetHeight || 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navbarHeight;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };
  const handleNavClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();

    const sectionMap: Record<string, string> = {
      Services: "services",
      About: "about",
      Team: "team",
      Reviews: "testimonials",
      Contact: "appointment",
    };

    const sectionId = sectionMap[link];

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }

    setMenuOpen(false);
  };

  // Handle hash on load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && NAV_LINKS.map(l => l.toLowerCase()).includes(hash)) {
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, []);

  // PILL ANIMATION SETUP (for nav links)
  const setupPillAnimations = () => {
    circleRefs.current.forEach((circle, i) => {
      const pill = navItemRefs.current[i];
      if (!circle || !pill) return;

      const rect = pill.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });

      const label = pill.querySelector<HTMLElement>('.pill-label');
      const hoverLabel = pill.querySelector<HTMLElement>('.pill-label-hover');

      if (label) gsap.set(label, { y: 0 });
      if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

      if (tlRefs.current[i]) tlRefs.current[i]?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: 'power3.easeOut' }, 0);
      if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: 'power3.easeOut' }, 0);
      if (hoverLabel) {
        gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease: 'power3.easeOut' }, 0);
      }

      tlRefs.current[i] = tl;
    });
  };

  // CTA BUTTON PILL ANIMATION SETUP (Premium)
  const setupCtaAnimation = () => {
    const pill = ctaItemRef.current;
    const circle = ctaCircleRef.current;
    if (!pill || !circle) return;

    const rect = pill.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const R = ((w * w) / 4 + h * h) / (2 * h);
    const D = Math.ceil(2 * R) + 2;
    const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
    const originY = D - delta;

    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.bottom = `-${delta}px`;

    gsap.set(circle, {
      xPercent: -50,
      scale: 0,
      transformOrigin: `50% ${originY}px`
    });

    const label = pill.querySelector<HTMLElement>('.pill-label');
    const hoverLabel = pill.querySelector<HTMLElement>('.pill-label-hover');
    const icon = pill.querySelector<HTMLElement>('.pill-icon');
    const hoverIcon = pill.querySelector<HTMLElement>('.pill-icon-hover');

    if (label) gsap.set(label, { y: 0 });
    if (icon) gsap.set(icon, { y: 0 });
    if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });
    if (hoverIcon) gsap.set(hoverIcon, { y: h + 12, opacity: 0 });

    if (ctaTlRef.current) ctaTlRef.current.kill();
    const tl = gsap.timeline({ paused: true });

    tl.to(circle, { scale: 1.3, xPercent: -50, duration: 2, ease: 'power3.easeOut' }, 0);
    if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: 'power3.easeOut' }, 0);
    if (icon) tl.to(icon, { y: -(h + 8), duration: 2, ease: 'power3.easeOut' }, 0);
    if (hoverLabel) {
      gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
      tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease: 'power3.easeOut' }, 0);
    }
    if (hoverIcon) {
      gsap.set(hoverIcon, { y: Math.ceil(h + 100), opacity: 0 });
      tl.to(hoverIcon, { y: 0, opacity: 1, duration: 2, ease: 'power3.easeOut' }, 0);
    }

    ctaTlRef.current = tl;
  };

  // Re-run setups on mount and resize
  useEffect(() => {
    setTimeout(() => {
      setupPillAnimations();
      setupCtaAnimation();
    }, 100);

    window.addEventListener('resize', () => {
      setupPillAnimations();
      setupCtaAnimation();
    });
    return () => window.removeEventListener('resize', () => { });
  }, []);

  const handlePillEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    if (activeTweenRefs.current[i]) activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  const handlePillLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    if (activeTweenRefs.current[i]) activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  const handleCtaEnter = () => {
    const tl = ctaTlRef.current;
    if (!tl) return;
    if (ctaActiveTweenRef.current) ctaActiveTweenRef.current.kill();
    ctaActiveTweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.4,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  const handleCtaLeave = () => {
    const tl = ctaTlRef.current;
    if (!tl) return;
    if (ctaActiveTweenRef.current) ctaActiveTweenRef.current.kill();
    ctaActiveTweenRef.current = tl.tweenTo(0, {
      duration: 0.25,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`
fixed top-0 left-0 right-0 z-50
px-6 md:px-10
flex items-center justify-between
transition-all duration-500
${scrolled ? "py-3" : "py-4"}
`}
      >
        {<div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: scrolled
                ? "hsl(var(--background) / 0.72)"
                : "hsl(var(--background) / 0.45)",

              backdropFilter: scrolled
                ? "blur(24px) saturate(180%)"
                : "blur(10px) saturate(140%)",

              WebkitBackdropFilter: scrolled
                ? "blur(24px) saturate(180%)"
                : "blur(10px) saturate(140%)",

              borderBottom: scrolled
                ? "1px solid hsl(var(--border) / 0.7)"
                : "1px solid transparent",

              boxShadow: scrolled
                ? "0 10px 30px rgba(0,0,0,0.04)"
                : "none",
            }}
          />
        </div>
        }
        {/* Logo */}
        <a
          href="/"
          className="relative z-10 flex items-center gap-2.5 group"
        >
          <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-sm ring-1 ring-border">
            <img
              src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-q5mb4zZCjsJCQx7qowogOswdi6h1Qz.png&w=500&q=75"
              alt="Neeraj Dental"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-foreground tracking-tight">Neeraj Dental</span>
            <span className="text-[9px] text-muted-foreground font-medium tracking-wider uppercase">Clinic & Care</span>
          </div>
        </a>

        {/* Desktop navigation */}
        <div
          className="hidden md:flex items-center relative z-10"
          style={{ gap: "0.25rem" }}
        >
          {NAV_LINKS.map((link, i) => (
            <div
              key={link}
              ref={(el) => {
                navItemRefs.current[i] = el;
              }}
              className="
        relative
        h-[42px]
        px-5
        inline-flex
        items-center
        justify-center
        overflow-hidden
        rounded-full
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-[1px]
      "
              style={{
                background: "transparent",
                color: "hsl(var(--muted-foreground))",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
              onMouseEnter={() => handlePillEnter(i)}
              onMouseLeave={() => handlePillLeave(i)}
              onClick={(e) => handleNavClick(e, link)}
            >
              <span
                className="absolute left-1/2 bottom-0 rounded-full pointer-events-none"
                style={{
                  background: "hsl(var(--primary))",
                  willChange: "transform",
                }}
                ref={(el) => {
                  circleRefs.current[i] = el;
                }}
              />

              <span className="label-stack relative flex items-center justify-center h-full leading-none z-[2]">
                <span
                  className="
            pill-label
            relative
            flex
            items-center
            justify-center
            h-full
            leading-none
          "
                  style={{ willChange: "transform" }}
                >
                  {link}
                </span>

                <span
                  className="
            pill-label-hover
            absolute
            left-0
            top-0
            flex
            items-center
            justify-center
            whitespace-nowrap
            h-full
            leading-none
          "
                  style={{
                    color: "hsl(var(--primary-foreground))",
                    willChange: "transform, opacity",
                  }}
                  aria-hidden="true"
                >
                  {link}
                </span>
              </span>
            </div>
          ))}

          {/* Phone */}
          <a
            href="tel:+919876543210"
            className="
      relative
      h-[42px]
      px-5
      ml-1
      inline-flex
      items-center
      justify-center
      rounded-full
      transition-all
      duration-300
      hover:-translate-y-[1px]
    "
            style={{
              background: "transparent",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "hsl(var(--muted-foreground))",
              gap: "8px",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>

            <Phone size={11} />

            <span>+91 98765 43210</span>
          </a>

          {/* Theme */}
          <div className="mx-1 flex items-center justify-center h-[42px]">
            <AnimatedThemeToggle />
          </div>

          {/* CTA */}
          <div
            ref={ctaItemRef}
            className="
      relative
      h-[42px]
      px-5
      inline-flex
      items-center
      justify-center
      overflow-hidden
      rounded-full
      cursor-pointer
      ml-2
      transition-all
      duration-300
      hover:-translate-y-[1px]
      active:scale-[0.985]
    "
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              boxShadow:
                "0 6px 20px hsl(var(--primary) / 0.16)",
            }}
            onMouseEnter={handleCtaEnter}
            onMouseLeave={handleCtaLeave}
            onClick={(e) => handleNavClick(e, "Contact")}
          >
            <span
              ref={ctaCircleRef}
              className="absolute left-1/2 bottom-0 rounded-full pointer-events-none"
              style={{
                background: "hsl(var(--primary-foreground))",
                willChange: "transform",
              }}
            />

            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border:
                  "1px solid hsl(var(--primary-foreground) / 0.08)",
              }}
            />

            <span className="label-stack relative z-[2] flex items-center justify-center h-full leading-none">
              <span
                className="
          pill-label
          relative
          flex
          items-center
          justify-center
          gap-1.5
          h-full
          leading-none
        "
                style={{ willChange: "transform" }}
              >
                <Calendar
                  size={12}
                  className="pill-icon shrink-0"
                />

                <span className="relative top-[0.5px]">
                  Book Now
                </span>
              </span>

              <span
                className="
          pill-label-hover
          absolute
          left-0
          top-0
          flex
          items-center
          justify-center
          gap-1.5
          whitespace-nowrap
          h-full
          leading-none
        "
                style={{
                  color: "hsl(var(--primary))",
                  willChange: "transform, opacity",
                }}
                aria-hidden="true"
              >
                <ArrowRight
                  size={12}
                  className="pill-icon-hover shrink-0"
                />

                <span className="relative top-[0.5px]">
                  Book Now
                </span>
              </span>
            </span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="relative z-10 flex flex-col gap-[5px] md:hidden w-6 cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-px w-full origin-center transition-all duration-300"
              style={{
                background: 'hsl(var(--foreground))',
                transform: menuOpen
                  ? (i === 0 ? 'rotate(45deg) translateY(6px)' : i === 2 ? 'rotate(-45deg) translateY(-6px)' : 'scaleX(0)')
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1
              }}
            />
          ))}
        </button>
      </nav>

      {/* Premium Mobile menu with theme variables */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col md:hidden transition-colors duration-300" style={{ background: 'hsl(var(--background) / 0.98)', backdropFilter: 'blur(20px)' }}>
          {/* Mobile header */}
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm" style={{ ring: '1px solid hsl(var(--border))' }}>
                <img
                  src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-q5mb4zZCjsJCQx7qowogOswdi6h1Qz.png&w=500&q=75"
                  alt="Neeraj Dental"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Neeraj Dental</p>
                <p className="text-[9px] text-muted-foreground font-medium tracking-wider uppercase">Premium Dental Care</p>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
              style={{ border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col px-6 pt-8 pb-6 gap-2 flex-1 overflow-y-auto">
            {NAV_LINKS.map((link, i) => {
              const icons = [Sparkles, Shield, Star, Clock, Calendar];
              const Icon = icons[i];
              return (
                <button 
                
                  key={link}
                  onClick={(e) => handleNavClick(e as any, link)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left text-sm font-medium transition-all duration-300 group rounded-xl"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  <span className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                      <Icon size={14} style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <span className="font-semibold">{link}</span>
                  </span>
                  <ArrowRight
                    size={14}
                    className="transition-all duration-300"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                </button>
              );
            })}
          </div>

          {/* Mobile footer */}
          <div className="px-6 py-6 space-y-4" style={{ borderTop: '1px solid hsl(var(--border))' }}>
            <div className="flex items-center justify-between gap-2 py-3 px-4 rounded-xl" style={{ background: 'hsl(var(--primary) / 0.05)', border: '1px solid hsl(var(--primary) / 0.1)' }}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>Open today</span>
              </div>
              <span className="text-xs font-semibold text-foreground">Mon–Sat, 9am–7pm</span>
            </div>

            <button
              onClick={(e) => handleNavClick(e as any, 'Contact')}
              className="w-full text-white py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 group"
              style={{ background: 'hsl(var(--primary))' }}
            >
              <Calendar size={14} className="group-hover:scale-110 transition-transform" />
              Book Appointment
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-all group"
              style={{ border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
            >
              <Phone size={14} className="group-hover:scale-110 transition-transform" style={{ color: 'hsl(var(--primary))' }} />
              +91 98765 43210
            </a>

            {/* Trust badge with theme variables */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="flex items-center gap-1">
                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] text-muted-foreground">4.9 Rating</span>
              </div>
              <div className="w-px h-3" style={{ background: 'hsl(var(--border))' }} />
              <div className="flex items-center gap-1">
                <Shield size={10} style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-[10px] text-muted-foreground">100% Secure</span>
              </div>
              <div className="w-px h-3" style={{ background: 'hsl(var(--border))' }} />
              <div className="flex items-center gap-1">
                <Clock size={10} style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-[10px] text-muted-foreground">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}