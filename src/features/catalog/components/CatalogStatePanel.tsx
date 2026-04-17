import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/shared/ui/AppButton";
import { AppText } from "@/shared/ui/AppText";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

type CatalogStatePanelProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function CatalogStatePanel({
  icon,
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}: CatalogStatePanelProps) {
  return (
    <SurfaceCard tone="muted" style={styles.card}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={nensGoColors.primaryStrong}
        />
      </View>
      <AppText variant="eyebrow">{eyebrow}</AppText>
      <AppText variant="title">{title}</AppText>
      <AppText variant="body">{description}</AppText>
      {actionLabel && onAction ? (
        <AppButton label={actionLabel} variant="secondary" onPress={onAction} />
      ) : null}
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
    backgroundColor: "rgba(75, 143, 231, 0.12)",
    marginBottom: nensGoSpacing.xs,
  },
});
