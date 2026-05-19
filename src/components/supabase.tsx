'use client';

import { useEffect, useState } from 'react';

export function SupabaseDebug() {
  const [envStatus, setEnvStatus] = useState<unknown>(null);
  
  useEffect(() => {
    setEnvStatus({
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      keyValue: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...',
      hasDoctorId: !!process.env.NEXT_PUBLIC_DOCTOR_ID,
    });
  }, []);
  
  if (!envStatus) return <div>Loading...</div>;
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs z-50 max-w-md">
      <h3 className="font-bold mb-2">🔧 Supabase Debug Info:</h3>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(envStatus, null, 2)}
      </pre>
    </div>
  );
}