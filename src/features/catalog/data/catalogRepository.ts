import { mapCatalogActivityReadRowToActivity } from "@/features/catalog/data/catalogActivityMapper";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";
import type { CatalogActivityReadRow } from "@/features/catalog/models/CatalogActivityReadRow";
import {
  getSupabaseClient,
  getSupabaseClientError,
} from "@/shared/lib/supabase/supabaseClient";

export type CatalogRepository = {
  listActivities: () => Promise<CatalogActivity[]>;
  getActivityById: (activityId: string) => Promise<CatalogActivity | null>;
};

const CATALOG_ACTIVITY_SELECT =
  "id, title, center_id, center_name, city_id, city_name, category_id, category_label, description, short_description, image_url, age_rule_type, age_min, age_max, price_label, is_free, schedule_label, venue_name, venue_address_1, created_at";

function getCatalogRepositoryClient() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(
      getSupabaseClientError() ||
        "No pudimos conectar con Supabase para cargar el catalogo.",
    );
  }

  return supabase;
}

export const catalogRepository: CatalogRepository = {
  async listActivities() {
    const supabase = getCatalogRepositoryClient();
    const { data, error } = await supabase
      .from("catalog_activities_read")
      .select(CATALOG_ACTIVITY_SELECT)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(
        error.message || "No pudimos cargar el catalogo desde la base de datos.",
      );
    }

    return (data as CatalogActivityReadRow[] | null)?.map(
      mapCatalogActivityReadRowToActivity,
    ) ?? [];
  },
  async getActivityById(activityId) {
    if (!/^\d+$/.test(activityId)) {
      return null;
    }

    const supabase = getCatalogRepositoryClient();
    const { data, error } = await supabase
      .from("catalog_activities_read")
      .select(CATALOG_ACTIVITY_SELECT)
      .eq("id", Number(activityId))
      .maybeSingle();

    if (error) {
      throw new Error(
        error.message ||
          "No pudimos cargar esta actividad desde la base de datos.",
      );
    }

    if (!data) {
      return null;
    }

    return mapCatalogActivityReadRowToActivity(data as CatalogActivityReadRow);
  },
};
