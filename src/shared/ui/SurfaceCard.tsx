import { View, StyleSheet, type ViewProps } from "react-native";

import {
  nensGoColors,
  nensGoRadii,
  nensGoShadows,
  nensGoSpacing,
} from "@/shared/theme/tokens";

type SurfaceCardProps = ViewProps & {
  tone?: "default" | "muted";
};

export function SurfaceCard({
  tone = "default",
  style,
  children,
  ...props
}: SurfaceCardProps) {
  return (
    <View
      style={[styles.base, tone === "muted" ? styles.muted : styles.default, style]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: nensGoRadii.lg,
    padding: nensGoSpacing.xxl,
    borderWidth: 1,
    borderColor: nensGoColors.border,
  },
  default: {
    backgroundColor: nensGoColors.surface,
    ...nensGoShadows.card,
  },
  muted: {
    backgroundColor: nensGoColors.surfaceMuted,
  },
});
