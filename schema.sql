-- Run this in Supabase Dashboard → SQL Editor

-- Treatment options (must match form Select values)
CREATE TYPE treatment_type AS ENUM (
    'checkup',
    'root-canal',
    'whitening',
    'braces',
    'implant',
    'extraction',
    'filling',
    'crown',
    'bridge',
    'other'
);

CREATE TYPE appointment_status AS ENUM (
    'pending',
    'confirmed',
    'cancelled',
    'completed',
    'no-show',
    'rescheduled'
);

CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(10),
    specialization VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    country_code VARCHAR(5) NOT NULL DEFAULT '+91',
    treatment treatment_type NOT NULL,
    appointment_date DATE NOT NULL,
    concern TEXT,
    status appointment_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);

-- Sample doctor - copy the returned id into .env as VITE_DOCTOR_ID
INSERT INTO doctors (name, email, phone, specialization)
VALUES ('Dr. Neeraj', 'clinic@example.com', '9876543210', 'General Dentistry');

-- Row Level Security: public site can INSERT bookings only
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can book appointments"
ON appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON appointments TO anon, authenticated;
