import { Mail, MapPin, Phone, ArrowRight, Facebook, Instagram, Twitter, Youtube, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus("success");
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1000);
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "General Dentistry",
    "Cosmetic Dentistry",
    "Orthodontics",
    "Dental Implants",
    "Teeth Whitening",
    "Oral Surgery",
    "Root Canal Treatment",
    "Pediatric Dentistry",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const workingHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "By Appointment Only" },
  ];

  return (
    <footer className="bg-gradient-to-b from-surface to-background border-t border-border pt-16 pb-8">
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-lg">
                  <img
                    src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-q5mb4zZCjsJCQx7qowogOswdi6h1Qz.png&w=500&q=75"
                    alt="Neeraj Dental Clinic Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Neeraj Dental Clinic
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                Precision dentistry with warmth, comfort, and modern care in Kaithal. 
                Transforming smiles with advanced dental technology.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 group">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground">Kaithal, Haryana, India</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <Phone size={18} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="tel:+919876543210" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center gap-3 group">
                  <Mail size={18} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="mailto:neerajdentalclinic@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    neerajdentalclinic@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="text-sm font-semibold mb-6 tracking-wide uppercase text-primary">
                Quick Links
              </h4>
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300 py-2"
                    >
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-sm font-semibold mb-6 tracking-wide uppercase text-primary">
                Our Services
              </h4>
              <div className="grid grid-cols-1 gap-1">
                {services.map((service) => (
                  <a
                    key={service}
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 hover:translate-x-1 inline-block transition-transform"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact & Hours Column */}
            <div>
              <h4 className="text-sm font-semibold mb-6 tracking-wide uppercase text-primary">
                Clinic Hours
              </h4>
              <div className="space-y-3 mb-8">
                {workingHours.map((slot) => (
                  <div key={slot.day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{slot.day}</span>
                    <span className="font-medium text-foreground">{slot.hours}</span>
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    24/7 Emergency
                  </span>
                </div>
                <a href="tel:+919876543210" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
                <p className="text-xs text-muted-foreground mt-1">
                  Available for dental emergencies
                </p>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase text-primary">
                  Newsletter
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Get dental health tips and exclusive offers
                </p>
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
                {submitStatus === "success" && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2 animate-in slide-in-from-top-1">
                    ✓ Subscribed successfully!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    ✗ Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
              <p>
                © {currentYear} Neeraj Dental Clinic. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;