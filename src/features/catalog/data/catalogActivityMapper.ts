import type { CatalogActivityReadRow } from "@/features/catalog/models/CatalogActivityReadRow";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";

function getTrimmedText(value?: string | null) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeCatalogImageUrl(value?: string | null) {
  const imageUrl = getTrimmedText(value);

  if (!imageUrl) {
    return undefined;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return undefined;
}

function buildAgeLabel(
  ageRuleType?: string | null,
  ageMin?: number | null,
  ageMax?: number | null,
) {
  const normalizedRuleType = getTrimmedText(ageRuleType).toLowerCase();

  if (normalizedRuleType === "range") {
    if (ageMin !== null && ageMin !== undefined && ageMax) {
      return `${ageMin} a ${ageMax} anos`;
    }

    if (ageMin !== null && ageMin !== undefined) {
      return `Desde ${ageMin} anos`;
    }

    if (ageMax) {
      return `Hasta ${ageMax} anos`;
    }
  }

  if (normalizedRuleType === "all" || normalizedRuleType === "open") {
    return "Todas las edades";
  }

  return undefined;
}

export function mapCatalogActivityReadRowToActivity(
  activityReadRow: CatalogActivityReadRow,
): CatalogActivity {
  const description = getTrimmedText(activityReadRow.description);
  const shortDescription =
    getTrimmedText(activityReadRow.short_description) || description;

  return {
    id: String(activityReadRow.id),
    title: getTrimmedText(activityReadRow.title),
    categoryLabel: getTrimmedText(activityReadRow.category_label) || undefined,
    description: description || undefined,
    shortDescription: shortDescription || undefined,
    imageUrl: normalizeCatalogImageUrl(activityReadRow.image_url),
    cityName: getTrimmedText(activityReadRow.city_name),
    centerName: getTrimmedText(activityReadRow.center_name) || undefined,
    ageLabel: buildAgeLabel(
      activityReadRow.age_rule_type,
      activityReadRow.age_min,
      activityReadRow.age_max,
    ),
    scheduleLabel: getTrimmedText(activityReadRow.schedule_label) || undefined,
    priceLabel: getTrimmedText(activityReadRow.price_label) || undefined,
    venueName: getTrimmedText(activityReadRow.venue_name) || undefined,
    venueAddress:
      getTrimmedText(activityReadRow.venue_address_1) || undefined,
    isFree: activityReadRow.is_free,
  };
}
