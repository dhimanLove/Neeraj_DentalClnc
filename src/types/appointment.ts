export type TreatmentType =
  | "checkup"
  | "root-canal"
  | "whitening"
  | "braces"
  | "implant"
  | "extraction";

export type AppointmentBookingInput = {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  date: string;
  service: TreatmentType;
  message?: string;
};

export type AppointmentRow = {
  id: string;
  doctor_id: string;
  full_name: string;
  email: string;
  phone: string;
  country_code: string;
  treatment: TreatmentType;
  appointment_date: string;
  concern: string | null;
  status: string;
  created_at: string;
};
