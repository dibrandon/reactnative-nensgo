import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";

type CatalogDetailItemTone = "default" | "warm";

export type CatalogDetailItem = {
  key: string;
  label: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  tone?: CatalogDetailItemTone;
};

function getTrimmedText(value?: string) {
  return typeof value === "string" ? value.trim() : "";
}

function hasDistinctVenueName(venueName: string, centerName: string) {
  if (!venueName) {
    return false;
  }

  if (!centerName) {
    return true;
  }

  return venueName.toLocaleLowerCase() !== centerName.toLocaleLowerCase();
}

function normalizePhoneNumber(phone: string) {
  return phone.replace(/\D/g, "");
}

export function getCatalogDetailFacts(
  activity: CatalogActivity,
): CatalogDetailItem[] {
  const facts: CatalogDetailItem[] = [];
  const ageLabel = getTrimmedText(activity.ageLabel);
  const scheduleLabel = getTrimmedText(activity.scheduleLabel);
  const priceLabel = getTrimmedText(activity.priceLabel);

  if (ageLabel) {
    facts.push({
      key: "age",
      label: "Edad",
      value: ageLabel,
      icon: "account-group-outline",
    });
  }

  if (scheduleLabel) {
    facts.push({
      key: "schedule",
      label: "Horario",
      value: scheduleLabel,
      icon: "calendar-clock-outline",
    });
  }

  if (activity.isFree || priceLabel) {
    facts.push({
      key: "price",
      label: "Precio",
      value: activity.isFree ? "Gratis" : priceLabel,
      icon: "cash-multiple",
      tone: activity.isFree ? "warm" : "default",
    });
  }

  return facts;
}

export function getCatalogLocationFacts(
  activity: CatalogActivity,
): CatalogDetailItem[] {
  const locationFacts: CatalogDetailItem[] = [];
  const venueName = getTrimmedText(activity.venueName);
  const venueAddress = getTrimmedText(activity.venueAddress);
  const centerName = getTrimmedText(activity.centerName);
  const cityName = getTrimmedText(activity.cityName);

  if (hasDistinctVenueName(venueName, centerName)) {
    locationFacts.push({
      key: "venue",
      label: "Lugar",
      value: venueName,
      icon: "map-marker-outline",
    });
  }

  if (venueAddress) {
    locationFacts.push({
      key: "address",
      label: "Direccion",
      value: venueAddress,
      icon: "map-marker-path",
    });
  }

  if (centerName) {
    locationFacts.push({
      key: "center",
      label: "Centro",
      value: centerName,
      icon: "office-building-outline",
    });
  }

  if (cityName) {
    locationFacts.push({
      key: "city",
      label: "Ciudad",
      value: cityName,
      icon: "city-variant-outline",
    });
  }

  return locationFacts;
}

export function buildCatalogContactUrl(activity: CatalogActivity) {
  const normalizedPhone = normalizePhoneNumber(getTrimmedText(activity.contactPhone));

  if (!normalizedPhone) {
    return null;
  }

  const cityFragment = activity.cityName ? ` en ${activity.cityName}` : "";
  const message = `Hola, me interesa la actividad "${activity.title}"${cityFragment}. Podrias darme mas informacion?`;

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
