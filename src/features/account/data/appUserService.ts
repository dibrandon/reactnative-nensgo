import type { User } from "@supabase/supabase-js";

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

export type AppUserProfileInput = {
  name: string;
  lastName?: string;
  cityId: string | number;
};

export type DefaultOnboardingForm = {
  name: string;
  lastName: string;
  cityId: string;
};

function getTrimmedText(value?: string | null) {
  return typeof value === "string" ? value.trim() : "";
}

function getAuthUserMetadata(authUser?: Pick<User, "user_metadata"> | null) {
  return authUser?.user_metadata && typeof authUser.user_metadata === "object"
    ? authUser.user_metadata
    : {};
}

function splitAuthFullName(fullName: string) {
  const normalizedFullName = getTrimmedText(fullName);

  if (!normalizedFullName) {
    return {
      name: "",
      lastName: "",
    };
  }

  const nameParts = normalizedFullName.split(/\s+/).filter(Boolean);

  if (nameParts.length === 1) {
    return {
      name: nameParts[0] ?? "",
      lastName: "",
    };
  }

  return {
    name: nameParts.slice(0, -1).join(" "),
    lastName: nameParts[nameParts.length - 1] ?? "",
  };
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

export function hasRequiredAppUserProfile(appUser?: AppUser | null) {
  return Boolean(getTrimmedText(appUser?.name) && appUser?.cityId);
}

export function getDefaultOnboardingForm(
  authUser?: Pick<User, "email" | "user_metadata"> | null,
  appUser?: AppUser | null,
): DefaultOnboardingForm {
  const metadata = getAuthUserMetadata(authUser);
  const metadataFullName = getTrimmedText(
    typeof metadata.full_name === "string" ? metadata.full_name : "",
  );
  const metadataName = getTrimmedText(
    typeof metadata.name === "string" ? metadata.name : "",
  );
  const splitFullName = splitAuthFullName(metadataFullName || metadataName);
  const emailLocalPart = getTrimmedText(authUser?.email).split("@")[0] ?? "";

  const preferredName =
    getTrimmedText(appUser?.name) ||
    getTrimmedText(
      typeof metadata.given_name === "string" ? metadata.given_name : "",
    ) ||
    getTrimmedText(
      typeof metadata.first_name === "string" ? metadata.first_name : "",
    ) ||
    splitFullName.name ||
    emailLocalPart;
  const preferredLastName =
    getTrimmedText(appUser?.lastName) ||
    getTrimmedText(
      typeof metadata.family_name === "string" ? metadata.family_name : "",
    ) ||
    getTrimmedText(
      typeof metadata.last_name === "string" ? metadata.last_name : "",
    ) ||
    splitFullName.lastName;

  return {
    name: preferredName,
    lastName: preferredLastName,
    cityId: appUser?.cityId ?? "",
  };
}

function getAuthUserId(authUserOrId: string | Pick<User, "id">) {
  return typeof authUserOrId === "string" ? authUserOrId : authUserOrId.id;
}

export async function readAppUser(authUserOrId: string | Pick<User, "id">) {
  const authUserId = getAuthUserId(authUserOrId);

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

export async function ensureAppUserProfile(profileInput: AppUserProfileInput) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(
      getSupabaseClientError() ||
        "No pudimos conectar con Supabase para completar el perfil.",
    );
  }

  const normalizedName = getTrimmedText(profileInput?.name);
  const normalizedLastName = getTrimmedText(profileInput?.lastName);
  const normalizedCityId =
    typeof profileInput?.cityId === "string" && /^\d+$/.test(profileInput.cityId)
      ? Number(profileInput.cityId)
      : typeof profileInput?.cityId === "number"
        ? profileInput.cityId
        : null;

  if (!normalizedName) {
    throw new Error("El nombre es obligatorio para completar el perfil.");
  }

  if (!normalizedCityId) {
    throw new Error("La ciudad es obligatoria para completar el perfil.");
  }

  const { data, error } = await supabase.rpc("ensure_my_profile", {
    profile_name: normalizedName,
    profile_last_name: normalizedLastName || null,
    profile_city_id: normalizedCityId,
  });

  if (error) {
    throw new Error(
      error.message || "No pudimos completar el perfil del usuario.",
    );
  }

  const profileRow = data as UserProfileRow | null;

  if (!profileRow?.id) {
    throw new Error("Supabase no devolvio un perfil valido tras el onboarding.");
  }

  const cityName = await getCityNameById(
    profileRow.city_id ?? normalizedCityId,
  );

  return buildAppUser(profileRow, cityName);
}
