import { getSupabase } from "@/lib/supabase";
import type { AppointmentBookingInput } from "@/types/appointment";

export type BookAppointmentResult =
  | { ok: true }
  | { ok: false; message: string };

export async function bookAppointment(
  input: AppointmentBookingInput
): Promise<BookAppointmentResult> {
  const doctorId = import.meta.env.VITE_DOCTOR_ID?.trim();

  if (!doctorId) {
    return {
      ok: false,
      message: "Doctor ID is not set. Add VITE_DOCTOR_ID to your .env file.",
    };
  }

  const supabase = getSupabase();

  const { error } = await supabase.from("appointments").insert({
    doctor_id: doctorId,
    full_name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone,
    country_code: input.countryCode,
    treatment: input.service,
    appointment_date: input.date,
    concern: input.message?.trim() || null,
  });

  if (error) {
    console.error("Supabase appointment insert failed:", error);
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
