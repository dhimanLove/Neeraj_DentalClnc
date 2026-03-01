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
        y: 40,
        opacity: 0,
        duration: 0.8,
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

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10-digit Indian mobile number";
    }

    if (!formData.date) {
      newErrors.date = "Select preferred date";
    }

    if (!formData.service) {
      newErrors.service = "Select a treatment";
    }

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
      className="section-spacing warm-surface"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* LEFT SIDE */}
          <div className="lg:col-span-4 max-w-lg">
            <h2 className="text-3xl font-semibold mb-4">
              Book Your Appointment
            </h2>
            <p className="text-muted-foreground">
              Fill in your details and our clinic team will contact you shortly.
            </p>
          </div>

          {/* FORM SIDE */}
          <div className="lg:col-span-7 lg:col-start-6">
            <form
              onSubmit={handleSubmit}
              className="form-card bg-background rounded-2xl p-8 shadow-soft border border-border"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">

                {/* FULL NAME */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Full Name
                  </label>
                  <Input
                    placeholder="Enter full name"
                    className="bg-surface border border-border"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    className="bg-surface border border-border"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* PHONE + COUNTRY */}
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

                      <SelectContent
                        className="bg-background border border-border shadow-medium rounded-lg z-50"
                      >
                        <SelectItem value="+91">+91 India</SelectItem>
                        <SelectItem value="+1">+1 USA</SelectItem>
                        <SelectItem value="+44">+44 UK</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="bg-surface border border-border"
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

                {/* DATE */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Preferred Date
                  </label>
                  <Input
                    type="date"
                    className="bg-surface border border-border"
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
              <div className="mb-6">
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

                  <SelectContent
                    className="bg-background border border-border shadow-medium rounded-lg z-50"
                  >
                    <SelectItem value="general-checkup">
                      General Checkup
                    </SelectItem>
                    <SelectItem value="root-canal">
                      Root Canal Treatment
                    </SelectItem>
                    <SelectItem value="whitening">
                      Teeth Whitening
                    </SelectItem>
                    <SelectItem value="implants">
                      Dental Implants
                    </SelectItem>
                    <SelectItem value="braces">
                      Braces / Orthodontics
                    </SelectItem>
                  </SelectContent>
                </Select>

                {errors.service && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div className="mb-8">
                <label className="text-sm font-medium mb-2 block">
                  Your Concern (Optional)
                </label>
                <Textarea
                  placeholder="Describe your concern briefly..."
                  rows={4}
                  className="bg-surface border border-border resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

                <button
                  type="submit"
                  className="btn-primary w-full px-10 py-5 rounded-full text-sm font-medium flex items-center justify-center gap-2"
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