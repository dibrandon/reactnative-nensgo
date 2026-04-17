import { StyleSheet } from "react-native";

import { nensGoColors, nensGoTypography } from "@/shared/theme/tokens";

export const nensGoFontFamilies = {
  regular: "NunitoSans_400Regular",
  semibold: "NunitoSans_600SemiBold",
  bold: "NunitoSans_700Bold",
  extrabold: "NunitoSans_800ExtraBold",
} as const;

export const textStyles = StyleSheet.create({
  eyebrow: {
    fontFamily: nensGoFontFamilies.extrabold,
    fontSize: nensGoTypography.micro,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: nensGoColors.primaryStrong,
  },
  hero: {
    fontFamily: nensGoFontFamilies.extrabold,
    fontSize: nensGoTypography.hero,
    lineHeight: 38,
    color: nensGoColors.text,
  },
  title: {
    fontFamily: nensGoFontFamilies.extrabold,
    fontSize: nensGoTypography.title,
    lineHeight: 30,
    color: nensGoColors.text,
  },
  section: {
    fontFamily: nensGoFontFamilies.bold,
    fontSize: nensGoTypography.section,
    lineHeight: 26,
    color: nensGoColors.text,
  },
  body: {
    fontFamily: nensGoFontFamilies.regular,
    fontSize: nensGoTypography.body,
    lineHeight: 24,
    color: nensGoColors.textMuted,
  },
  bodyStrong: {
    fontFamily: nensGoFontFamilies.semibold,
    fontSize: nensGoTypography.body,
    lineHeight: 24,
    color: nensGoColors.text,
  },
  meta: {
    fontFamily: nensGoFontFamilies.regular,
    fontSize: nensGoTypography.meta,
    lineHeight: 21,
    color: nensGoColors.textMuted,
  },
  metaStrong: {
    fontFamily: nensGoFontFamilies.bold,
    fontSize: nensGoTypography.meta,
    lineHeight: 20,
    color: nensGoColors.text,
  },
  button: {
    fontFamily: nensGoFontFamilies.bold,
    fontSize: nensGoTypography.meta,
  },
});
