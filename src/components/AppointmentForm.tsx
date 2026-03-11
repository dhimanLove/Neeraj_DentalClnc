import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AppointmentForm = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    date: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit Indian mobile number";

    if (!formData.date) newErrors.date = "Select preferred date";

    if (!formData.service) newErrors.service = "Select a treatment";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
      <section
          id="appointment"
          ref={sectionRef}
          className="relative py-28 bg-gradient-to-b from-surface to-background overflow-hidden"
      >

        {/* Soft background glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-primary/10 blur-[150px] rounded-full"></div>
        </div>

        <div className="container-wide">

          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-4 max-w-md space-y-6">

              <h2 className="text-3xl lg:text-4xl font-semibold leading-tight tracking-tight">
                Book Your Appointment
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Schedule your visit with
                <span className="font-medium text-foreground">
                {" "}Neeraj Dental Clinic
              </span>
                {" "}for expert dental care in a comfortable and modern environment.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Fill out the form and our clinic team will contact you shortly
                to confirm your appointment and guide you through the next steps.
              </p>

              <ul className="text-sm text-muted-foreground space-y-3 pt-2">
                <li>✔ Experienced dental specialists</li>
                <li>✔ Modern equipment & painless treatments</li>
                <li>✔ Personalized care for every patient</li>
              </ul>

            </div>

            {/* FORM */}
            <div className="lg:col-span-7 lg:col-start-6">

              <form
                  onSubmit={handleSubmit}
                  className="form-card relative bg-background/90 backdrop-blur-xl rounded-3xl p-10 lg:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.08)] border border-border/60 space-y-8"
              >

                {/* NAME + EMAIL */}
                <div className="grid sm:grid-cols-2 gap-7">

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Full Name
                    </label>

                    <Input
                        placeholder="Enter full name"
                        className="bg-surface border border-border focus:ring-2 focus:ring-primary/40 transition-all"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />

                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email Address
                    </label>

                    <Input
                        type="email"
                        placeholder="example@email.com"
                        className="bg-surface border border-border focus:ring-2 focus:ring-primary/40 transition-all"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />

                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                </div>

                {/* PHONE + DATE */}
                <div className="grid sm:grid-cols-2 gap-7">

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Mobile Number
                    </label>

                    <div className="flex gap-2">

                      <Select
                          value={formData.countryCode}
                          onValueChange={(value) =>
                              setFormData({ ...formData, countryCode: value })
                          }
                      >
                        <SelectTrigger className="w-24 bg-surface border border-border rounded-lg">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent className="bg-background border border-border shadow-lg rounded-lg">
                          <SelectItem value="+91">+91 India</SelectItem>
                          <SelectItem value="+1">+1 USA</SelectItem>
                          <SelectItem value="+44">+44 UK</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                          type="tel"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          className="bg-surface border border-border focus:ring-2 focus:ring-primary/40 transition-all"
                          value={formData.phone}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value.replace(/\D/g, ""),
                              })
                          }
                      />

                    </div>

                    {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Preferred Date
                    </label>

                    <Input
                        type="date"
                        className="bg-surface border border-border focus:ring-2 focus:ring-primary/40 transition-all"
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                        }
                    />

                    {errors.date && (
                        <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                    )}
                  </div>

                </div>

                {/* SERVICE */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Treatment
                  </label>

                  <Select
                      onValueChange={(value) =>
                          setFormData({ ...formData, service: value })
                      }
                  >
                    <SelectTrigger className="bg-surface border border-border rounded-lg">
                      <SelectValue placeholder="Choose treatment" />
                    </SelectTrigger>

                    <SelectContent className="bg-background border border-border shadow-lg rounded-lg">
                      <SelectItem value="general-checkup">General Checkup</SelectItem>
                      <SelectItem value="root-canal">Root Canal Treatment</SelectItem>
                      <SelectItem value="whitening">Teeth Whitening</SelectItem>
                      <SelectItem value="implants">Dental Implants</SelectItem>
                      <SelectItem value="braces">Braces / Orthodontics</SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.service && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.service}
                      </p>
                  )}
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Concern (Optional)
                  </label>

                  <Textarea
                      placeholder="Describe your concern briefly..."
                      rows={4}
                      className="bg-surface border border-border resize-none focus:ring-2 focus:ring-primary/40 transition-all"
                      value={formData.message}
                      onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                      }
                  />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="btn-primary w-full py-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {submitted ? "Submitted Successfully" : "Book Appointment"}
                  {!submitted && <ArrowRight size={16} />}
                </button>

              </form>

            </div>

          </div>
        </div>
      </section>
  );
};

export default AppointmentForm;