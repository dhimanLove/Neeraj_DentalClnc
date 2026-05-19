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
    text: "Dr. Rohit Mehta did my smile correction and I'm very happy with the results. The staff is polite and appointments are managed smoothly.",
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
      tl.from(".google-rating-card", {
        y: 30,
        opacity: 0,
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

          {/* Google Rating Section */}
          <div className="google-rating-card mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {/* Google Logo */}
                <div className="flex-shrink-0">
                  <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">4.9</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(1,247+ reviews)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Google Rating • Exceptional ⭐
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Trusted by thousands
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Based on real patient reviews
                  </div>
                </div>
                <div className="w-px h-8 bg-amber-200 dark:bg-amber-800/50 hidden sm:block" />
                <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm border border-amber-200 dark:border-amber-800/30">
                  <div className="text-xs text-muted-foreground">Recommended</div>
                  <div className="text-lg font-bold text-amber-600 dark:text-amber-500">98%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="test-card bg-background p-8 lg:p-10 hover:bg-surface transition-colors duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
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