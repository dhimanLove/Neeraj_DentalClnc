import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Image clip-path reveal
      tl.fromTo(".about-image-wrap", {
        clipPath: "inset(0 100% 0 0)",
      }, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.3,
        ease: "expo.out",
      });

      tl.from(".about-label", { y: 15, opacity: 0, duration: 0.5 }, 0.4);
      tl.from(".about-title", { y: 20, opacity: 0, duration: 0.6 }, 0.5);
      tl.from(".about-body", { y: 15, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.7);
      tl.from(".about-stat", { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 }, 0.9);

      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-30 lg:py-36 surface grain">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="about-image-wrap overflow-hidden rounded-2xl">
              <div ref={imageRef}>
                <img
                  src="https://i.pinimg.com/736x/15/5d/c2/155dc2e04ccb72fedb2e82928e83c580.jpg"
                  alt="Dentist providing attentive patient care"
                  className="w-full h-[420px] lg:h-[540px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="about-label text-[13px] font-medium text-primary tracking-widest uppercase mb-4">
              About
            </p>
            <h2 className="about-title text-heading text-foreground mb-6">
              Built on trust,<br />driven by precision
            </h2>
            <p className="about-body text-body-lg text-muted-foreground mb-4">
              For over 15 years, we've provided thoughtful, evidence-based dental care.
              Our approach prioritizes long-term oral health over quick fixes, combining
              clinical expertise with genuine patient relationships.
            </p>
            <p className="about-body text-body-lg text-muted-foreground mb-10">
              Every treatment plan is personalized. We invest in understanding your
              goals and concerns before recommending any procedure.
            </p>

            {/* Stats — asymmetric layout */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "20+", label: "Years of practice" },
                { value: "10k", label: "Patients treated" },
                { value: "15", label: "Awards received" },
              ].map((stat) => (
                <div key={stat.label} className="about-stat">
                  <div className="text-2xl font-semibold text-foreground tracking-tight">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
