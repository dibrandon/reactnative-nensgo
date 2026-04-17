import { StyleSheet, Text, View } from "react-native";

import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
  nensGoTypography,
} from "@/shared/theme/tokens";

type InfoPillProps = {
  label: string;
  tone?: "primary" | "warm" | "soft";
};

export function InfoPill({ label, tone = "soft" }: InfoPillProps) {
  return (
    <View style={[styles.base, pillToneStyles[tone]]}>
      <Text style={[styles.label, labelToneStyles[tone]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: nensGoRadii.pill,
    paddingHorizontal: nensGoSpacing.md,
    paddingVertical: nensGoSpacing.sm,
  },
  label: {
    fontSize: nensGoTypography.micro,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

const pillToneStyles = StyleSheet.create({
  primary: {
    backgroundColor: nensGoColors.primary,
  },
  soft: {
    backgroundColor: nensGoColors.surfaceMuted,
  },
  warm: {
    backgroundColor: nensGoColors.yellow,
  },
});

const labelToneStyles = StyleSheet.create({
  primary: {
    color: nensGoColors.surface,
  },
  soft: {
    color: nensGoColors.text,
  },
  warm: {
    color: nensGoColors.text,
  },
});
