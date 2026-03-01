import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-line", {
        clipPath: "inset(0 0 100% 0)",
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
      }, 0.3);

      tl.from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, 0.8);

      tl.from(".hero-cta", {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
      }, 1.1);

      tl.fromTo(".hero-image-wrap", {
        clipPath: "inset(100% 0 0 0)",
      }, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "expo.out",
      }, 0.5);

      gsap.to(imageRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 xl:col-span-5 max-w-xl">

              <p className="hero-line text-[12px] font-medium text-primary tracking-[0.25em] uppercase mb-6">
                Neeraj Dental Clinic - Kaithal
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.05]">
                <span className="hero-line block">Advanced dental care</span>
                <span className="hero-line block">you can trust.</span>
              </h1>

              <p className="hero-sub text-base sm:text-lg text-muted-foreground mt-8 max-w-lg">
                Safe, painless and modern dental treatments in Kaithal.
                From routine checkups to advanced procedures - your smile is in expert hands.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-10">
                <a
                  href="#appointment"
                  className="hero-cta btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium"
                >
                  Book Appointment
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#services"
                  className="hero-cta link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  View Treatments
                </a>
              </div>

              {/* STATS */}
              <div className="flex flex-wrap items-center gap-10 mt-14 pt-6 border-t border-border">
                {[
                  { value: "15+", label: "Years Experience" },
                  { value: "12,000+", label: "Patients Treated" },
                  { value: "100%", label: "Sterilized Equipment" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-semibold">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div
                ref={imageRef}
                className="hero-image-wrap overflow-hidden rounded-xl shadow-medium"
              >
                <img
                  src="public\neeraj wala ckinic.jpg"
                  alt="Neeraj Dental Clinic reception area"
                  className="
                    w-full object-cover
                    h-[360px]
                    sm:h-[420px]
                    md:h-[480px]
                    lg:h-[520px]
                    xl:h-[600px]
                  "
                  loading="eager"
                />
              </div>

              <p className="hero-caption text-xs text-muted-foreground mt-4">
                Neeraj Dental Clinic - Kaithal, Haryana
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;