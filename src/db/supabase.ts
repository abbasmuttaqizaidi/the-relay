import { createClient } from "@supabase/supabase-js";
import { getServerConfig } from "../lib/config.server";

/**
 * Creates and returns an administrative Supabase client using the Service Role Key.
 * This client BYPASSES Row Level Security (RLS) and is intended for use in the Service Layer
 * where business operations and validation are fully enforced by the application logic.
 */
export function getSupabaseAdmin() {
  const config = getServerConfig();

  const supabaseUrl = config.supabaseUrl;
  const serviceRoleKey = config.supabaseServiceRoleKey;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "CRITICAL: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in process.env. " +
        "Please configure these variables in your deployment settings or .env file.",
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Creates and returns a user-scoped Supabase client using the Anon Key.
 * If userJwt is provided, the client will include it in the Authorization header.
 * This client ENFORCES Row Level Security (RLS) policies.
 */
export function getSupabaseUserClient(userJwt?: string) {
  const config = getServerConfig();

  const supabaseUrl = config.supabaseUrl;
  const anonKey = config.supabaseAnonKey;

  if (!supabaseUrl || !anonKey) {
    throw new Error("CRITICAL: SUPABASE_URL or SUPABASE_ANON_KEY is missing in process.env.");
  }

  const globalHeaders = userJwt ? { Authorization: `Bearer ${userJwt}` } : undefined;

  return createClient(supabaseUrl, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: globalHeaders,
    },
  });
}
