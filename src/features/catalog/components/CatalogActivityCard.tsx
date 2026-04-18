import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { resolveCatalogImageSource } from "@/features/catalog/data/catalogImageSources";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";
import { AppText } from "@/shared/ui/AppText";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

type CatalogActivityCardProps = {
  activity: CatalogActivity;
  onPress?: () => void;
};

function CardBadge({
  label,
  tone = "soft",
}: {
  label: string;
  tone?: "soft" | "primary" | "warm";
}) {
  return (
    <View
      style={[
        styles.cardBadge,
        tone === "primary"
          ? styles.cardBadgePrimary
          : tone === "warm"
            ? styles.cardBadgeWarm
            : styles.cardBadgeSoft,
      ]}
    >
      <AppText
        variant="eyebrow"
        style={[
          styles.cardBadgeLabel,
          tone === "primary" ? styles.cardBadgeLabelPrimary : null,
        ]}
        numberOfLines={1}
      >
        {label}
      </AppText>
    </View>
  );
}

export function CatalogActivityCard({
  activity,
  onPress,
}: CatalogActivityCardProps) {
  const imageSource = resolveCatalogImageSource(activity.imageUrl);
  const cardBody = (
    <SurfaceCard style={styles.card}>
      <View style={styles.mediaWrap}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.topRow}>
          {activity.categoryLabel ? (
            <CardBadge label={activity.categoryLabel} tone="primary" />
          ) : null}
          {activity.isFree ? <CardBadge label="Gratis" tone="warm" /> : null}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.copyBlock}>
          <AppText variant="bodyStrong" style={styles.title} numberOfLines={2}>
            {activity.title}
          </AppText>
          {activity.shortDescription ? (
            <AppText variant="meta" style={styles.summary} numberOfLines={2}>
              {activity.shortDescription}
            </AppText>
          ) : null}
        </View>

        <View style={styles.pillRow}>
          {activity.ageLabel ? <CardBadge label={activity.ageLabel} /> : null}
          <CardBadge label={activity.cityName} />
        </View>

        <View style={styles.centerRow}>
          <MaterialCommunityIcons
            name="map-marker-radius-outline"
            size={14}
            color={nensGoColors.primaryStrong}
          />
          <AppText variant="metaStrong" style={styles.centerLabel} numberOfLines={1}>
            {activity.centerName || activity.venueName || "Centro por definir"}
          </AppText>
        </View>

        {onPress ? (
          <View style={styles.ctaRow}>
            <AppText variant="metaStrong" style={styles.ctaLabel}>
              Ver detalle
            </AppText>
            <MaterialCommunityIcons
              name="arrow-right"
              size={16}
              color={nensGoColors.primaryStrong}
            />
          </View>
        ) : null}
      </View>
    </SurfaceCard>
  );

  if (!onPress) {
    return cardBody;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressablePressed]}
    >
      {cardBody}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },
  pressablePressed: {
    opacity: 0.92,
    transform: [{ scale: 0.992 }],
  },
  card: {
    overflow: "hidden",
    padding: 0,
    minHeight: 292,
  },
  mediaWrap: {
    position: "relative",
    backgroundColor: nensGoColors.backgroundSoft,
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
    resizeMode: "cover",
  },
  topRow: {
    position: "absolute",
    left: nensGoSpacing.md,
    right: nensGoSpacing.md,
    top: nensGoSpacing.md,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: nensGoSpacing.xs,
  },
  content: {
    minHeight: 176,
    paddingHorizontal: nensGoSpacing.lg,
    paddingVertical: nensGoSpacing.md,
    gap: nensGoSpacing.sm,
  },
  copyBlock: {
    gap: nensGoSpacing.xs,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
  },
  summary: {
    fontSize: 12,
    lineHeight: 16,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.xs,
  },
  cardBadge: {
    maxWidth: "100%",
    borderRadius: nensGoRadii.pill,
    paddingHorizontal: nensGoSpacing.sm,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  cardBadgeSoft: {
    backgroundColor: nensGoColors.surfaceMuted,
  },
  cardBadgePrimary: {
    backgroundColor: nensGoColors.primary,
  },
  cardBadgeWarm: {
    backgroundColor: nensGoColors.yellow,
  },
  cardBadgeLabel: {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.4,
    color: nensGoColors.text,
  },
  cardBadgeLabelPrimary: {
    color: nensGoColors.surface,
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 22,
  },
  centerLabel: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  ctaRow: {
    marginTop: "auto",
    paddingTop: nensGoSpacing.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ctaLabel: {
    fontSize: 13,
    lineHeight: 18,
    color: nensGoColors.primaryStrong,
  },
});
