import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";

export type CatalogExploreFilters = {
  city: string | null;
  category: string | null;
  ageBand: string | null;
};

export type CatalogFilterOptions = {
  cities: string[];
  categories: string[];
  ageBands: string[];
};

export const emptyCatalogExploreFilters: CatalogExploreFilters = {
  city: null,
  category: null,
  ageBand: null,
};

function compareLabels(left: string, right: string) {
  return left.localeCompare(right, "es", { sensitivity: "base" });
}

export function normalizeText(value?: string | null) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase();
}

export function normalizeAgeBand(rawAgeLabel?: string | null) {
  const normalized = normalizeText(rawAgeLabel);

  if (!normalized) {
    return null;
  }

  if (normalized === "4 a 10 anos") {
    return "4-10 anos";
  }

  if (normalized === "6 a 12 anos" || normalized === "7 a 12 anos") {
    return "6-12 anos";
  }

  if (normalized === "8 a 14 anos") {
    return "8-14 anos";
  }

  if (normalized === "para todas las edades") {
    return "Todas las edades";
  }

  return rawAgeLabel?.trim() ?? null;
}

export function matchesSearch(
  activity: CatalogActivity,
  searchQuery: string,
) {
  const normalizedQuery = normalizeText(searchQuery);

  if (!normalizedQuery) {
    return true;
  }

  const searchableFields = [
    activity.title,
    activity.description,
    activity.shortDescription,
    activity.cityName,
    activity.categoryLabel,
    activity.centerName,
  ];

  return searchableFields.some((value) =>
    normalizeText(value).includes(normalizedQuery),
  );
}

export function matchesFilters(
  activity: CatalogActivity,
  appliedFilters: CatalogExploreFilters,
) {
  if (
    appliedFilters.city &&
    normalizeText(activity.cityName) !== normalizeText(appliedFilters.city)
  ) {
    return false;
  }

  if (
    appliedFilters.category &&
    normalizeText(activity.categoryLabel) !==
      normalizeText(appliedFilters.category)
  ) {
    return false;
  }

  if (
    appliedFilters.ageBand &&
    normalizeText(normalizeAgeBand(activity.ageLabel)) !==
      normalizeText(appliedFilters.ageBand)
  ) {
    return false;
  }

  return true;
}

export function getFilterOptions(
  activities: CatalogActivity[],
): CatalogFilterOptions {
  const cities = new Set<string>();
  const categories = new Set<string>();
  const ageBands = new Set<string>();

  activities.forEach((activity) => {
    if (activity.cityName) {
      cities.add(activity.cityName.trim());
    }

    if (activity.categoryLabel) {
      categories.add(activity.categoryLabel.trim());
    }

    const normalizedAgeBand = normalizeAgeBand(activity.ageLabel);

    if (normalizedAgeBand) {
      ageBands.add(normalizedAgeBand);
    }
  });

  return {
    cities: [...cities].sort(compareLabels),
    categories: [...categories].sort(compareLabels),
    ageBands: [...ageBands].sort(compareLabels),
  };
}
