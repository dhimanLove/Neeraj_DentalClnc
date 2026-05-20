import { useEffect, useRef } from "react";
import { Stethoscope, Sparkles, SmilePlus, Wrench, Sun, Baby, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    desc: "Preventive care, cleanings, and comprehensive oral health management.",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    desc: "Veneers, bonding, and smile design tailored to your features.",
  },
  {
    icon: SmilePlus,
    title: "Orthodontics",
    desc: "Clear aligners and modern braces for natural-looking alignment.",
  },
  {
    icon: Wrench,
    title: "Dental Implants",
    desc: "Permanent, biocompatible tooth replacement with precision placement.",
  },
  {
    icon: Sun,
    title: "Teeth Whitening",
    desc: "Professional-grade whitening for lasting brightness.",
  },
  {
    icon: Baby,
    title: "Pediatric Care",
    desc: "Gentle, child-focused dentistry in a calm environment.",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".services-label", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      })
      .from(".services-title", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.3")
      .from(".services-sub", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(".service-row", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 lg:py-40 bg-background"
    >
      <div className="container-wide">
        {/* HEADER */}
        <div className="max-w-[680px] mb-24">
          <p className="services-label text-[11px] uppercase tracking-[0.22em] text-primary font-medium mb-6">
            Services
          </p>
          <h2 className="services-title text-[3rem] sm:text-[4.5rem] font-[600] tracking-[-0.06em] leading-[0.92] text-foreground">
            Dental care designed around comfort.
          </h2>
          <p className="services-sub mt-8 text-[17px] leading-[1.9] text-muted-foreground max-w-[560px]">
            Modern treatments delivered with precision, calmness, and a patient-first approach.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-border" />

        {/* SERVICES */}
        <div>
          {services.map((service, i) => (
            <div
              key={service.title}
              className="
                service-row
                group
                grid grid-cols-1 lg:grid-cols-12 gap-10
                py-10 lg:py-14
                border-b border-border
                transition-colors duration-300
                hover:bg-muted/30
              "
            >
              {/* LEFT - Icon + Number */}
              <div className="lg:col-span-3 flex items-start gap-5">
                <div className="
                  flex h-12 w-12 items-center justify-center
                  rounded-full border border-border
                  transition-all duration-300
                  group-hover:border-foreground/20 group-hover:bg-foreground/5
                ">
                  <service.icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-foreground transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mt-3">
                  0{i + 1}
                </span>
              </div>

              {/* CENTER - Title */}
              <div className="lg:col-span-6 flex items-center">
                <h3 className="
                  text-[1.9rem] leading-[1] tracking-[-0.04em] font-[500] text-foreground
                  transition-transform duration-300 group-hover:translate-x-2
                ">
                  {service.title}
                </h3>
              </div>

              {/* RIGHT - Description + CTA */}
              <div className="lg:col-span-3">
                <p className="text-[15px] leading-[1.9] text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                  {service.desc}
                </p>
                <div className="
                  mt-6 flex items-center gap-2
                  opacity-0 translate-y-2
                  transition-all duration-300
                  group-hover:opacity-100 group-hover:translate-y-0
                ">
                  <span className="text-sm font-medium text-foreground">Learn more</span>
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;