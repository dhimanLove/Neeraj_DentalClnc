import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="warm-surface border-t border-border section-spacing">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
                <span className="text-primary-foreground font-semibold">
                  N
                </span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Neeraj Dental Clinic
              </span>
            </div>

            <p className="text-sm text-subtle leading-relaxed mb-6 max-w-xs">
              Precision dentistry with warmth, comfort, and modern care in Kaithal.
            </p>

            <div className="space-y-3 text-sm text-subtle">
              <div className="flex items-center gap-2">
                <MapPin size={15} />
                Kaithal, Haryana
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} />
                neerajdentalclinic@gmail.com
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold mb-6 tracking-wide">
              Navigate
            </h4>
            {["Home", "Services", "About", "Team", "Testimonials", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-sm text-subtle hover:text-foreground transition-all duration-300 py-2 link-underline"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-6 tracking-wide">
              Services
            </h4>
            {[
              "General Dentistry",
              "Cosmetic Dentistry",
              "Orthodontics",
              "Dental Implants",
              "Teeth Whitening",
              "Oral Surgery",
            ].map((service) => (
              <p key={service} className="text-sm text-subtle py-2">
                {service}
              </p>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold mb-6 tracking-wide">
              Stay updated
            </h4>
            <p className="text-sm text-subtle mb-5">
              Dental health tips and clinic updates.
            </p>

            <div className="flex overflow-hidden rounded-xl border border-border shadow-soft">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
              />
              <button
                className="btn-primary px-5 flex items-center justify-center"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-20 pt-6 text-sm text-subtle text-center">
          © {new Date().getFullYear()} Neeraj Dental Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;