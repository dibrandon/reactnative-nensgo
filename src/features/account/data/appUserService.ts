import type { AppUser } from "@/features/account/models/AppUser";
import {
  getSupabaseClient,
  getSupabaseClientError,
} from "@/shared/lib/supabase/supabaseClient";

type UserProfileRow = {
  id: string;
  name: string | null;
  last_name: string | null;
  email: string | null;
  city_id: number | null;
  role_id: number | null;
};

function getTrimmedText(value?: string | null) {
  return typeof value === "string" ? value.trim() : "";
}

function buildAppUser(userProfileRow: UserProfileRow, cityName: string): AppUser {
  const name = getTrimmedText(userProfileRow.name);
  const lastName = getTrimmedText(userProfileRow.last_name);

  return {
    id: userProfileRow.id,
    authUserId: userProfileRow.id,
    name,
    lastName,
    fullName: [name, lastName].filter(Boolean).join(" "),
    email: getTrimmedText(userProfileRow.email),
    cityId:
      userProfileRow.city_id !== null && userProfileRow.city_id !== undefined
        ? String(userProfileRow.city_id)
        : null,
    cityName,
    roleId:
      userProfileRow.role_id !== null && userProfileRow.role_id !== undefined
        ? String(userProfileRow.role_id)
        : null,
  };
}

async function getCityNameById(cityId: number | null) {
  if (!cityId) {
    return "";
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(
      getSupabaseClientError() ||
        "No pudimos conectar con Supabase para cargar la ciudad del perfil.",
    );
  }

  const { data, error } = await supabase
    .from("cities")
    .select("name")
    .eq("id", cityId)
    .maybeSingle();

  if (error) {
    throw new Error(
      error.message || "No pudimos resolver la ciudad del perfil.",
    );
  }

  return getTrimmedText(data?.name);
}

export function isAuthUserEmailVerified(authUser?: {
  email_confirmed_at?: string | null;
  confirmed_at?: string | null;
}) {
  return Boolean(authUser?.email_confirmed_at || authUser?.confirmed_at);
}

export async function readAppUser(authUserId: string) {
  if (!authUserId) {
    return null;
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(
      getSupabaseClientError() ||
        "No pudimos conectar con Supabase para cargar el perfil.",
    );
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .select("id, name, last_name, email, city_id, role_id")
    .eq("id", authUserId)
    .maybeSingle();

  if (error) {
    throw new Error(
      error.message || "No pudimos cargar el perfil de la cuenta autenticada.",
    );
  }

  if (!data) {
    return null;
  }

  const cityName = await getCityNameById(data.city_id);

  return buildAppUser(data as UserProfileRow, cityName);
}
