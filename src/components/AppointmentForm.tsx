"use client";

import { useEffect, useRef, useState } from "react";
import { addDays, format } from "date-fns";

import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Lock,
  Star,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

import { bookAppointment } from "@/lib/appointments";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { TreatmentType } from "@/types/appointment";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: Zap, label: "Quick Booking", desc: "Complete in under 2 minutes" },
  { icon: Lock, label: "Secure & Private", desc: "Your data is encrypted" },
  { icon: CalendarDays, label: "Flexible Dates", desc: "Choose your preferred time" },
];

const TREATMENTS = [
  { value: "checkup", label: "Routine Checkup" },
  { value: "root-canal", label: "Root Canal Treatment" },
  { value: "whitening", label: "Teeth Whitening" },
  { value: "braces", label: "Braces & Alignment" },
  { value: "implant", label: "Dental Implant" },
  { value: "extraction", label: "Tooth Extraction" },
];

const AppointmentForm = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitResetTimerRef = useRef<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const supabaseReady = isSupabaseConfigured();

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".apt-left-content > *",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".apt-form-card",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 74%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      if (submitResetTimerRef.current) {
        window.clearTimeout(submitResetTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!supabaseReady) {
      console.warn('Supabase is not configured. Please add your environment variables.');
    }
  }, [supabaseReady]);

  const getTodayStart = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const syncDate = (date?: Date) => {
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      date: date ? format(date, "yyyy-MM-dd") : "",
    }));

    setErrors((prev) => (prev.date ? { ...prev, date: "" } : prev));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const todayStart = getTodayStart();

    if (!formData.name.trim()) e.name = "Full name is required";
    if (!formData.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Enter a valid email";
    }
    if (!formData.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      e.phone = "Enter a valid 10-digit number";
    }

    if (!formData.date) {
      e.date = "Select a date";
    } else {
      const sel = new Date(formData.date);
      if (sel < todayStart) e.date = "Please select today or a future date";
    }

    if (!formData.service) e.service = "Select a treatment";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length) {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -6 },
          {
            x: 6,
            duration: 0.08,
            repeat: 5,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(formRef.current, { x: 0 });
            },
          }
        );
      }
      return;
    }

    if (!supabaseReady) {
      toast.error("Booking system is not configured. Please contact support.");
      return;
    }

    setLoading(true);

    try {
      const result = await bookAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        countryCode: formData.countryCode,
        date: formData.date,
        service: formData.service as TreatmentType,
        message: formData.message,
      });

      if (!result.ok) {
        toast.error(result.message || "Failed to book appointment");
        return;
      }

      toast.success("Appointment booked successfully!");
      setSubmitted(true);

      // Clear form after successful submission
      if (submitResetTimerRef.current) {
        window.clearTimeout(submitResetTimerRef.current);
      }

      submitResetTimerRef.current = window.setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+91",
          date: "",
          service: "",
          message: "",
        });
        setSelectedDate(undefined);
        setErrors({});
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const field = (name: string) => ({
    base:
      "w-full h-12 px-4 bg-background text-sm text-foreground border rounded-xl outline-none transition-all duration-200 placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
    state: errors[name]
      ? "border-red-400"
      : "border-border hover:border-primary/40",
  });

  return (
    <section
      id="appointment"
      ref={sectionRef}
      className="section-spacing bg-background overflow-hidden"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 apt-left-content space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface rounded-full border border-border">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground tracking-wide">
                  Available for bookings
                </span>
              </div>

              <div>
                <h2 className="text-4xl lg:text-5xl xl:text-[3.4rem] font-bold text-foreground leading-[1.08] tracking-tight">
                  Book your
                  <br />
                  <span className="relative">
                    appointment
                    <svg
                      className="absolute -bottom-1.5 left-0 w-full overflow-visible"
                      viewBox="0 0 300 6"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,3 Q75,6 150,3 Q225,0 300,3"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>
                <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-sm">
                  Schedule your visit with our expert dental team - quick, easy, and hassle-free.
                </p>
              </div>

              <div className="grid gap-3">
                {FEATURES.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 p-4 bg-surface rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors flex items-center justify-center flex-shrink-0">
                      <Icon className="text-primary" size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-foreground font-medium">4.9 Rating</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2">
                    {["#3b82f6", "#60a5fa", "#93c5fd"].map((c, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-background"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    500+ Happy Patients
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="apt-form-card bg-surface rounded-3xl border border-border overflow-hidden">
                <div className="px-8 lg:px-10 py-5 border-b border-border bg-surface/50">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Appointment Details
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Fill in the information below
                    </p>
                  </div>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="p-8 lg:p-10 space-y-5"
                  noValidate
                >
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide uppercase">
                      Full Name <span className="text-red-500 normal-case">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      placeholder="Enter your full name"
                      className={`${field("name").base} ${field("name").state}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide uppercase">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="your@email.com"
                        className={`${field("email").base} ${field("email").state}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide uppercase">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground border-r border-border pr-3 leading-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              phone: e.target.value.replace(/\D/g, ""),
                            });
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                          placeholder="9876543210"
                          maxLength={10}
                          className={`${field("phone").base} ${field("phone").state} pl-16`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide uppercase">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>

                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={`
                              w-full h-12 px-4 rounded-xl border
                              flex items-center justify-between
                              bg-surface text-foreground
                              transition-all duration-200
                              hover:border-primary/40
                              hover:bg-surface/80
                              ${errors.date ? "border-red-400" : "border-border"}
                            `}
                          >
                            <span className="flex items-center gap-2 text-sm">
                              <CalendarDays size={16} className="text-primary shrink-0" />
                              {selectedDate ? (
                                <span className="font-medium">
                                  {format(selectedDate, "PPP")}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">
                                  Select preferred date
                                </span>
                              )}
                            </span>
                            <ArrowRight size={14} className="text-muted-foreground shrink-0" />
                          </button>
                        </PopoverTrigger>

                        <PopoverContent
                          align="start"
                          sideOffset={10}
                          className="w-[348px] p-0 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
                        >
                          <div className="px-4 py-3 border-b border-border bg-surface">
                            <p className="text-sm font-semibold text-foreground">
                              Select Appointment Date
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              Choose your preferred slot
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 p-4 border-b border-border bg-background">
                            {[
                              { label: "Today", value: 0 },
                              { label: "Tomorrow", value: 1 },
                              { label: "3 Days", value: 3 },
                              { label: "1 Week", value: 7 },
                            ].map((preset) => (
                              <button
                                key={preset.value}
                                type="button"
                                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-surface hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                                onClick={() => {
                                  const newDate = addDays(new Date(), preset.value);
                                  syncDate(newDate);
                                }}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>

                          <div className="p-3 flex justify-center bg-background">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => syncDate(date ?? undefined)}
                              disabled={(date) => date < getTodayStart()}
                              initialFocus
                              className="rounded-xl border-0 bg-transparent p-0"
                              classNames={{
                                months: "flex flex-col space-y-4",
                                month: "space-y-4",
                                caption: "flex justify-center pt-1 relative items-center",
                                caption_label: "text-sm font-semibold text-foreground",
                                nav: "space-x-1 flex items-center",
                                nav_button: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-primary/10 rounded-md transition-all",
                                table: "w-full border-collapse",
                                head_row: "flex",
                                head_cell: "text-muted-foreground rounded-md w-9 font-medium text-[0.75rem]",
                                row: "flex w-full mt-2",
                                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-medium rounded-xl transition-all duration-200 hover:bg-primary/10 hover:text-primary",
                                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-md",
                                day_today: "border border-primary/30 text-primary",
                                day_outside: "text-muted-foreground opacity-40",
                                day_disabled: "text-muted-foreground opacity-30",
                                day_hidden: "invisible",
                              }}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      {errors.date && (
                        <p className="mt-1 text-xs text-red-500">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide uppercase">
                        Treatment <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.service}
                        onValueChange={(v) => {
                          setFormData({ ...formData, service: v });
                          if (errors.service) setErrors({ ...errors, service: "" });
                        }}
                      >
                        <SelectTrigger
                          className={`w-full h-12 px-4 text-sm rounded-xl transition-all duration-200 bg-surface border ${errors.service
                            ? "border-red-300 focus:ring-2 focus:ring-red-100"
                            : "border-border hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          }`}
                        >
                          <SelectValue placeholder="Select treatment type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border bg-background shadow-2xl">
                          {TREATMENTS.map(({ value, label }) => (
                            <SelectItem key={value} value={value} className="text-sm">
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="mt-1 text-xs text-red-500">{errors.service}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide uppercase">
                      Additional Notes{" "}
                      <span className="text-muted-foreground normal-case font-normal text-[11px]">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Describe any specific concerns or symptoms..."
                      rows={3}
                      className="w-full px-4 py-3 bg-background text-sm text-foreground border border-border rounded-xl outline-none resize-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-primary-foreground text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group mt-1"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Booked Successfully
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-muted-foreground">
                    By booking, you agree to our terms and privacy policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;