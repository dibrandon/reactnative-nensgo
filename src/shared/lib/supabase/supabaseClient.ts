import "react-native-url-polyfill/auto";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

const missingEnvVars: string[] = [];

if (!supabaseUrl) {
  missingEnvVars.push("EXPO_PUBLIC_SUPABASE_URL");
}

if (!supabaseAnonKey) {
  missingEnvVars.push("EXPO_PUBLIC_SUPABASE_ANON_KEY");
}

const supabaseConfigError = missingEnvVars.length
  ? `Faltan variables publicas de Supabase: ${missingEnvVars.join(", ")}.`
  : "";

let supabaseRuntimeError = "";
let supabaseClient: SupabaseClient | null = null;

if (!supabaseConfigError) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  } catch (error) {
    supabaseRuntimeError =
      "No pudimos inicializar el cliente de Supabase con la configuracion actual.";

    if (__DEV__) {
      console.warn("[supabase] Fallo al crear el cliente.", error);
    }
  }
}

export function getSupabaseClient() {
  return supabaseClient;
}

export function isSupabaseReady() {
  return Boolean(supabaseClient);
}

export function getSupabaseClientError() {
  return supabaseConfigError || supabaseRuntimeError;
}
