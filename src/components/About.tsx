import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "20+", label: "Years of practice", desc: "Est. 2004" },
  { value: "10k+", label: "Patients treated", desc: "Across all ages" },
  { value: "15", label: "Awards received", desc: "National & state" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        ".about-img",
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      // Vertical line grow
      gsap.fromTo(
        ".about-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.9,
          ease: "power3.out",
          transformOrigin: "top center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Text animations
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
      
      tl.from(".about-label", { y: 14, opacity: 0, duration: 0.5, ease: "power3.out" })
        .from(".about-title", { y: 22, opacity: 0, duration: 0.65, ease: "power3.out" }, "-=0.2")
        .from(".about-text", { y: 16, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .from(".about-divider", { scaleX: 0, duration: 0.6, ease: "power3.out", transformOrigin: "left" }, "-=0.2")
        .from(".about-stat", { y: 20, opacity: 0, stagger: 0.1, duration: 0.55, ease: "power3.out" }, "-=0.1")
        .from(".about-cta", { y: 14, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-spacing bg-background overflow-hidden"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              {/* Background shapes - with proper dark mode */}
              <div className="absolute -top-8 -left-8 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 -z-10" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-muted/30 dark:bg-muted/10 -z-10" />

              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl shadow-medium">
                <img
                  src="https://i.pinimg.com/736x/15/5d/c2/155dc2e04ccb72fedb2e82928e83c580.jpg"
                  alt="Dentist providing attentive patient care"
                  className="about-img w-full h-[400px] lg:h-[500px] object-cover"
                  loading="lazy"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-6 lg:col-start-7 flex flex-col">
              {/* Label */}
              <div className="about-label flex items-center gap-3 mb-5">
                <div className="about-line w-8 h-px bg-primary" />
                <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
                  About the clinic
                </span>
              </div>

              {/* Heading */}
              <h2 className="about-title text-3xl sm:text-4xl lg:text-[2.8rem] font-bold text-foreground leading-[1.2] tracking-tight mb-6">
                Built on trust,<br />
                <span className="relative inline-block">
                  driven by precision
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 360 6" preserveAspectRatio="none">
                    <path d="M0,3 Q90,6 180,3 Q270,0 360,3" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              {/* Body text */}
              <div className="about-text space-y-4 mb-8">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  For over 20 years, we've delivered thoughtful, evidence-based dental care.
                  Our approach prioritizes long-term oral health over quick fixes - combining
                  clinical expertise with genuine patient relationships.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Every treatment plan is personalized. We invest time in understanding your
                  goals and concerns before recommending any procedure.
                </p>
              </div>

              {/* Divider */}
              <div className="about-divider h-px bg-border mb-10" />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="about-stat">
                    <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs font-semibold text-foreground/80 mb-0.5">
                      {stat.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="about-cta flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.querySelector("#appointment");
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 96;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-md active:scale-95 flex items-center gap-2 group"
                >
                  Book a Consultation
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full border border-border bg-surface group-hover:border-primary/50 group-hover:bg-primary/5 flex items-center justify-center transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary transition-colors">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                    </svg>
                  </div>
                  <span>Call us now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;