import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const testimonials = [
  {
    name: "Ritika Malhotra",
    text: "Dr. Naveen Wagade explained every step of my treatment clearly. The entire procedure was painless and the clinic environment is extremely clean and calm.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    text: "I had braces treatment with Dr. Neerja Sharma and the results are fantastic. Very professional approach and proper follow-up at every visit.",
    rating: 5,
  },
  {
    name: "Pooja Bansal",
    text: "Dr. Rohit Mehta did my smile correction and I’m very happy with the results. The staff is polite and appointments are managed smoothly.",
    rating: 5,
  },
  {
    name: "Sanjay Arora",
    text: "I visited for a wisdom tooth removal by Dr. Sunaina Khan. The surgery was smooth and recovery was quicker than expected.",
    rating: 5,
  },
];
const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      tl.from(".test-label", { y: 15, opacity: 0, duration: 0.5 });
      tl.from(".test-title", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3");
      tl.from(".test-card", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="section-spacing surface">
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">

          <div className="max-w-xl mb-16">
            <p className="test-label text-[13px] font-medium text-primary tracking-widest uppercase mb-4">
              Reviews
            </p>
            <h2 className="test-title text-4xl lg:text-5xl font-semibold tracking-tight">
              Patient experiences
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="test-card bg-background p-8 lg:p-10 hover:bg-surface transition-colors duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-foreground text-foreground" />
                  ))}
                </div>

                <p className="text-sm leading-relaxed mb-8">
                  "{t.text}"
                </p>

                <div className="text-sm font-medium text-muted-foreground">
                  {t.name}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
export default Testimonials;