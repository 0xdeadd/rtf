import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Read-only client (anon key). Returns null when env vars are missing. */
export function supabaseAnon(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Write client (service role key). Server-only. Throws when not configured. */
export function supabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase admin is not configured");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
