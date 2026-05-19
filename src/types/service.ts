import { getSupabase } from "@/lib/supabase";

export type AppointmentPayload = {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  date: string;
  service: string;
  message?: string;
};

export const appointmentService = {
  async createAppointment(
    payload: AppointmentPayload
  ) {
    try {
      const supabase = getSupabase();

      const { error } = await supabase
        .from("appointments")
        .insert([
          {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            country_code: payload.countryCode,
            appointment_date: payload.date,
            service: payload.service,
            message: payload.message,
            doctor_id:
              import.meta.env.VITE_DOCTOR_ID,
          },
        ]);

      if (error) {
        console.error(error);

        return {
          ok: false,
          message: error.message,
        };
      }

      return {
        ok: true,
      };
    } catch (err) {
      console.error(err);

      return {
        ok: false,
        message:
          "Unexpected server error",
      };
    }
  },
};