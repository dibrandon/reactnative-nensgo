import type { CatalogCityChoice } from "@/features/account/models/CatalogCityChoice";
import {
  getSupabaseClient,
  getSupabaseClientError,
} from "@/shared/lib/supabase/supabaseClient";

type CatalogCityChoiceRow = {
  city_id: number | null;
  city_name: string | null;
};

function getTrimmedText(value?: string | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function listCatalogCityChoices(): Promise<CatalogCityChoice[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(
      getSupabaseClientError() ||
        "No pudimos conectar con Supabase para cargar las ciudades.",
    );
  }

  const { data, error } = await supabase
    .from("catalog_activities_read")
    .select("city_id, city_name")
    .order("city_name", { ascending: true });

  if (error) {
    throw new Error(
      error.message || "No pudimos cargar las ciudades del catalogo.",
    );
  }

  const uniqueCities = new Map<string, CatalogCityChoice>();

  ((data ?? []) as CatalogCityChoiceRow[]).forEach((cityRow) => {
    const cityId =
      cityRow.city_id !== null && cityRow.city_id !== undefined
        ? String(cityRow.city_id)
        : "";
    const cityName = getTrimmedText(cityRow.city_name);

    if (!cityId || !cityName || uniqueCities.has(cityId)) {
      return;
    }

    uniqueCities.set(cityId, {
      id: cityId,
      name: cityName,
    });
  });

  return [...uniqueCities.values()].sort((leftCity, rightCity) =>
    leftCity.name.localeCompare(rightCity.name, "es", { sensitivity: "base" }),
  );
}
