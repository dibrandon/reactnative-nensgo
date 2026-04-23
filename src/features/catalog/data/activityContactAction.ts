import { Linking } from "react-native";

import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";
import type { ActivityContactOption } from "@/features/catalog/models/ActivityContactOption";

function getTrimmedText(value?: string | null) {
  return typeof value === "string" ? value.trim() : "";
}

function getNormalizedContactMethod(contactMethod?: string | null) {
  return getTrimmedText(contactMethod).toLowerCase();
}

function buildActivityGreeting(activity: CatalogActivity) {
  const activityTitle = getTrimmedText(activity.title) || "esta actividad";
  const cityFragment = activity.cityName ? ` en ${activity.cityName}` : "";

  return `Hola, me interesa la actividad "${activityTitle}"${cityFragment}. Podrias darme mas informacion?`;
}

function buildWhatsappUrl(contactValue: string, activity: CatalogActivity) {
  const normalizedPhone = getTrimmedText(contactValue).replace(/\D+/g, "");

  if (!normalizedPhone) {
    return "";
  }

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(buildActivityGreeting(activity))}`;
}

function buildEmailUrl(contactValue: string, activity: CatalogActivity) {
  const normalizedEmail = getTrimmedText(contactValue);

  if (!normalizedEmail) {
    return "";
  }

  const subject = `Consulta sobre ${getTrimmedText(activity.title) || "actividad"}`;
  const body = buildActivityGreeting(activity);

  return `mailto:${normalizedEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildPhoneUrl(contactValue: string) {
  const normalizedPhone = getTrimmedText(contactValue).replace(/[^\d+]/g, "");

  return normalizedPhone ? `tel:${normalizedPhone}` : "";
}

function buildWebUrl(contactValue: string) {
  const normalizedUrl = getTrimmedText(contactValue);

  if (!normalizedUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(normalizedUrl)) {
    return normalizedUrl;
  }

  return `https://${normalizedUrl}`;
}

export function getActivityContactOptionLabel(
  contactOption: ActivityContactOption,
) {
  const contactMethod = getNormalizedContactMethod(contactOption.contactMethod);

  if (contactMethod === "whatsapp") {
    return "Abrir WhatsApp";
  }

  if (contactMethod === "email") {
    return "Enviar email";
  }

  if (contactMethod === "phone") {
    return "Llamar";
  }

  if (contactMethod === "form") {
    return "Abrir formulario";
  }

  if (contactMethod === "web") {
    return "Abrir web";
  }

  return "Abrir contacto";
}

export function getActivityContactOptionIcon(
  contactOption: ActivityContactOption,
) {
  const contactMethod = getNormalizedContactMethod(contactOption.contactMethod);

  if (contactMethod === "whatsapp") {
    return "whatsapp";
  }

  if (contactMethod === "email") {
    return "email-outline";
  }

  if (contactMethod === "phone") {
    return "phone-outline";
  }

  if (contactMethod === "form") {
    return "form-select";
  }

  if (contactMethod === "web") {
    return "web";
  }

  return "open-in-new";
}

export function buildActivityContactActionUrl(
  activity: CatalogActivity,
  contactOption: ActivityContactOption,
) {
  const contactMethod = getNormalizedContactMethod(contactOption.contactMethod);
  const contactValue = getTrimmedText(contactOption.contactValue);

  if (!contactMethod || !contactValue) {
    return "";
  }

  if (contactMethod === "whatsapp") {
    return buildWhatsappUrl(contactValue, activity);
  }

  if (contactMethod === "email") {
    return buildEmailUrl(contactValue, activity);
  }

  if (contactMethod === "phone") {
    return buildPhoneUrl(contactValue);
  }

  if (contactMethod === "form" || contactMethod === "web") {
    return buildWebUrl(contactValue);
  }

  return "";
}

export async function openActivityContactAction(
  activity: CatalogActivity,
  contactOption: ActivityContactOption,
) {
  const contactActionUrl = buildActivityContactActionUrl(activity, contactOption);

  if (!contactActionUrl) {
    return false;
  }

  try {
    await Linking.openURL(contactActionUrl);
    return true;
  } catch {
    return false;
  }
}
