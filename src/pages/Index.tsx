import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import AppointmentForm from "@/components/AppointmentForm";
import Footer from "@/components/Footer";

const Index = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="divider" />
      <Services />
      <About />
      <Team />
      <Testimonials />
      <AppointmentForm />
      <Footer />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center transition-all duration-500 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
};

export default Index;
