import { createClient } from '@supabase/supabase-js';

// DIRECT VALUES - YAHAN APNI VALUES DALO
const supabaseUrl = 'https://svfvkxfyejcmlbseagvu.supabase.co';
const supabaseAnonKey = 'sb_publishable_6tDeLcgY8RK7rc1VpKDP1Q_vuqRYbTA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const isSupabaseConfigured = () => {
  return true; // DIRECT FIX - hamesha true return karega
};