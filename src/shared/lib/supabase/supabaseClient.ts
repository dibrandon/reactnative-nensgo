import "react-native-url-polyfill/auto";

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

type SupabaseAuthStorage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

function resolveNativeAuthStorage() {
  if (Platform.OS === "web") {
    return undefined;
  }

  try {
    const resolvedModule = require("@react-native-async-storage/async-storage");
    const resolvedStorage = (resolvedModule?.default ??
      resolvedModule) as SupabaseAuthStorage | undefined;

    if (
      !resolvedStorage ||
      typeof resolvedStorage.getItem !== "function" ||
      typeof resolvedStorage.setItem !== "function" ||
      typeof resolvedStorage.removeItem !== "function"
    ) {
      throw new Error("AsyncStorage no expone la interfaz esperada.");
    }

    return resolvedStorage;
  } catch (error) {
    if (__DEV__) {
      console.warn(
        "[supabase] AsyncStorage nativo no esta disponible. La persistencia de sesion queda desactivada en este runtime.",
        error,
      );
    }

    return undefined;
  }
}

if (!supabaseConfigError) {
  try {
    const nativeAuthStorage = resolveNativeAuthStorage();
    const canPersistNativeSession =
      Platform.OS === "web" || Boolean(nativeAuthStorage);

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: canPersistNativeSession,
        autoRefreshToken: canPersistNativeSession,
        detectSessionInUrl: Platform.OS === "web",
        storage: nativeAuthStorage,
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
