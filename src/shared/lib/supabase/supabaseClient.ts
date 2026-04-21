import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
const normalizedSupabaseUrl = supabaseUrl.replace(/\/+$/, "");

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
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: Platform.OS === "web",
        storage: Platform.OS === "web" ? undefined : AsyncStorage,
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

export function getSupabaseProjectUrl() {
  return normalizedSupabaseUrl;
}

export function buildSupabasePublicStorageUrl(
  bucketName: string,
  objectPath: string,
) {
  const normalizedBucketName = bucketName.trim().replace(/^\/+|\/+$/g, "");
  const normalizedObjectPath = objectPath.trim().replace(/^\/+/, "");

  if (
    !normalizedSupabaseUrl ||
    !normalizedBucketName ||
    !normalizedObjectPath
  ) {
    return "";
  }

  const encodedPath = normalizedObjectPath
    .split("/")
    .filter(Boolean)
    .map((pathSegment) => encodeURIComponent(pathSegment))
    .join("/");

  if (!encodedPath) {
    return "";
  }

  return `${normalizedSupabaseUrl}/storage/v1/object/public/${normalizedBucketName}/${encodedPath}`;
}
