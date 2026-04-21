import type { ActivityContactOption } from "@/features/catalog/models/ActivityContactOption";
import {
  getSupabaseClient,
  getSupabaseClientError,
} from "@/shared/lib/supabase/supabaseClient";

type ActivityContactOptionRow = {
  id: number;
  activity_id: number;
  contact_method: string | null;
  contact_value: string | null;
};

function getTrimmedText(value?: string | null) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeActivityContactOption(
  activityContactOptionRow: ActivityContactOptionRow,
): ActivityContactOption | null {
  const contactMethod = getTrimmedText(
    activityContactOptionRow.contact_method,
  ).toLowerCase();
  const contactValue = getTrimmedText(activityContactOptionRow.contact_value);

  if (!contactMethod || !contactValue) {
    return null;
  }

  return {
    id: String(activityContactOptionRow.id),
    activityId: String(activityContactOptionRow.activity_id),
    contactMethod,
    contactValue,
  };
}

function getActivityContactOptionsClient() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(
      getSupabaseClientError() ||
        "No pudimos conectar con Supabase para cargar el contacto real.",
    );
  }

  return supabase;
}

export async function listActivityContactOptions(activityId: string) {
  if (!/^\d+$/.test(activityId)) {
    return [];
  }

  const supabase = getActivityContactOptionsClient();
  const { data, error } = await supabase
    .from("activity_contact_options")
    .select("id, activity_id, contact_method, contact_value")
    .eq("activity_id", Number(activityId))
    .eq("is_active", true)
    .eq("is_deleted", false)
    .order("id", { ascending: true });

  if (error) {
    throw new Error(
      error.message ||
        "No pudimos cargar las opciones de contacto de esta actividad.",
    );
  }

  return ((data as ActivityContactOptionRow[] | null) ?? [])
    .map(normalizeActivityContactOption)
    .filter((contactOption): contactOption is ActivityContactOption =>
      Boolean(contactOption),
    );
}
