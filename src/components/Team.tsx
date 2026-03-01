import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const doctors = [
  {
    name: "Dr. Naveen Wagade",
    role: "General Dentistry",
    image: "https://i.pinimg.com/1200x/f2/21/a4/f221a4d14681ade6976e37af0ac87cb4.jpg",
  },
  {
    name: "Dr. Neerja Sharma",
    role: "Orthodontics",
    image: "https://i.pinimg.com/1200x/42/e7/40/42e740d10846e6a2baa8e08964781d7d.jpg",
  },
  {
    name: "Dr. Rohit Mehta",
    role: "Cosmetic Dentistry",
    image: "https://i.pinimg.com/736x/0b/3c/a0/0b3ca0ba91641d9df1e9b5c804ad8a16.jpg",
  },
  {
    name: "Dr. Sunaina Khan",
    role: "Oral Surgery",
    image: "https://i.pinimg.com/736x/fc/39/f4/fc39f4f0b1be155ee44124b0cbc542ac.jpg",
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      tl.from(".team-card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="section-spacing">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">

          {doctors.map((doc) => (
            <div key={doc.name} className="group team-card">
              
              <div className="overflow-hidden rounded-xl aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] shadow-soft">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold">
                  {doc.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {doc.role}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Team;