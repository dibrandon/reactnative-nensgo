import { StyleSheet, View } from "react-native";

import { AppText } from "@/shared/ui/AppText";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";

type InfoPillProps = {
  label: string;
  tone?: "primary" | "warm" | "soft";
};

export function InfoPill({ label, tone = "soft" }: InfoPillProps) {
  return (
    <View style={[styles.base, pillToneStyles[tone]]}>
      <AppText variant="eyebrow" style={[styles.label, labelToneStyles[tone]]}>
        {label}
      </AppText>
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
    letterSpacing: 0.5,
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
