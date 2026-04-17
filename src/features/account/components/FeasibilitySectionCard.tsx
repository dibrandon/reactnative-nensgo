import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";
import { AppText } from "@/shared/ui/AppText";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

type FeasibilitySectionCardProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  eyebrow: string;
  title: string;
  items: string[];
  tone?: "default" | "warm" | "danger";
};

export function FeasibilitySectionCard({
  icon,
  eyebrow,
  title,
  items,
  tone = "default",
}: FeasibilitySectionCardProps) {
  return (
    <SurfaceCard tone="muted" style={styles.card}>
      <View style={[styles.iconWrap, iconWrapToneStyles[tone]]}>
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={iconToneStyles[tone].color}
        />
      </View>
      <AppText variant="eyebrow">{eyebrow}</AppText>
      <AppText variant="title">{title}</AppText>

      <View style={styles.list}>
        {items.map((item) => (
          <View key={item} style={styles.listItem}>
            <View style={[styles.dot, dotToneStyles[tone]]} />
            <AppText variant="meta" style={styles.listText}>
              {item}
            </AppText>
          </View>
        ))}
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: nensGoSpacing.sm,
  },
  iconWrap: {
    height: 44,
    width: 44,
    borderRadius: nensGoRadii.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: nensGoSpacing.xs,
  },
  list: {
    gap: nensGoSpacing.sm,
    marginTop: nensGoSpacing.xs,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: nensGoSpacing.sm,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: nensGoRadii.pill,
    marginTop: 6,
  },
  listText: {
    flex: 1,
  },
});

const iconWrapToneStyles = StyleSheet.create({
  default: {
    backgroundColor: "rgba(75, 143, 231, 0.12)",
  },
  warm: {
    backgroundColor: "rgba(245, 201, 74, 0.16)",
  },
  danger: {
    backgroundColor: "rgba(242, 106, 75, 0.14)",
  },
});

const dotToneStyles = StyleSheet.create({
  default: {
    backgroundColor: nensGoColors.primaryStrong,
  },
  warm: {
    backgroundColor: nensGoColors.yellow,
  },
  danger: {
    backgroundColor: nensGoColors.coral,
  },
});

const iconToneStyles = StyleSheet.create({
  default: {
    color: nensGoColors.primaryStrong,
  },
  warm: {
    color: nensGoColors.orange,
  },
  danger: {
    color: nensGoColors.coral,
  },
});
