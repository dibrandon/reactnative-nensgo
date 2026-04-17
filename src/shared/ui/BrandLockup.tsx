import { Image, StyleSheet, View } from "react-native";

import { AppText } from "@/shared/ui/AppText";
import { nensGoColors, nensGoSpacing } from "@/shared/theme/tokens";

type BrandLockupProps = {
  compact?: boolean;
};

export function BrandLockup({ compact = false }: BrandLockupProps) {
  return (
    <View style={styles.row}>
      <Image
        source={require("../../../assets/images/nensgo-mark.png")}
        style={[styles.mark, compact && styles.markCompact]}
      />
      <View style={styles.wordmark}>
        <AppText variant={compact ? "section" : "title"} style={styles.nens}>
          Nens
        </AppText>
        <AppText variant={compact ? "section" : "title"} style={styles.go}>
          Go
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.md,
  },
  mark: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },
  markCompact: {
    width: 34,
    height: 34,
  },
  wordmark: {
    flexDirection: "row",
    alignItems: "center",
  },
  nens: {
    color: nensGoColors.primaryStrong,
  },
  go: {
    color: nensGoColors.coral,
  },
});
