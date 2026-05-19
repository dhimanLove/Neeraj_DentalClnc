import { supabase } from "./supabase";
import type { AppointmentBookingInput } from "@/types/appointment";

export type BookAppointmentResult =
  | { ok: true }
  | { ok: false; message: string };

export async function bookAppointment(
  input: AppointmentBookingInput
): Promise<BookAppointmentResult> {
  try {
    const doctorId = process.env.NEXT_PUBLIC_DOCTOR_ID?.trim();
    
    if (!doctorId) {
      return {
        ok: false,
        message: "Configuration error. Please contact support.",
      };
    }

    const { error } = await supabase.from("appointments").insert({
      doctor_id: doctorId,
      full_name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone,
      country_code: input.countryCode,
      treatment: input.service,
      appointment_date: input.date,
      concern: input.message?.trim() || null,
      status: 'pending',
    });

    if (error) {
      console.error("Supabase error:", error);
      return { ok: false, message: "Failed to book appointment. Please try again." };
    }

    return { ok: true };
  } catch (error) {
    console.error("Booking error:", error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}