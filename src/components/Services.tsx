import { useEffect, useRef } from "react";
import { Stethoscope, Sparkles, SmilePlus, Wrench, Sun, Baby } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Stethoscope, title: "General Dentistry", desc: "Preventive care, cleanings, and comprehensive oral health management." },
  { icon: Sparkles, title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile design tailored to your features." },
  { icon: SmilePlus, title: "Orthodontics", desc: "Clear aligners and modern braces for natural-looking alignment." },
  { icon: Wrench, title: "Dental Implants", desc: "Permanent, biocompatible tooth replacement with precision placement." },
  { icon: Sun, title: "Teeth Whitening", desc: "Professional-grade whitening for lasting brightness." },
  { icon: Baby, title: "Pediatric Care", desc: "Gentle, child-focused dentistry in a calm environment." },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.from(".services-label", { y: 15, opacity: 0, duration: 0.6 });
      tl.from(".services-title", { y: 20, opacity: 0, duration: 0.7 }, "-=0.3");

      // Stagger cards with slight blur
      tl.from(".service-item", {
        y: 30,
        opacity: 0,
        filter: "blur(4px)",
        stagger: { amount: 0.6, from: "start" },
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-28 lg:py-36 grain">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mb-16">
          <p className="services-label text-[13px] font-medium text-primary tracking-widest uppercase mb-4">
            Services
          </p>
          <h2 className="services-title text-heading text-foreground">
            What we do
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`service-item group bg-background p-8 lg:p-10 transition-colors duration-300 hover:bg-surface ${
                i < 3 ? "" : ""
              }`}
            >
              <service.icon
                size={22}
                strokeWidth={1.5}
                className="text-primary mb-6 transition-transform duration-500 group-hover:translate-x-1"
              />
              <h3 className="text-base font-semibold text-foreground mb-2.5 tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
