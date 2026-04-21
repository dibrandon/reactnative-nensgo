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
  isFavorite?: boolean;
  isFavoritePending?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
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
  isFavorite = false,
  isFavoritePending = false,
  onPress,
  onToggleFavorite,
}: CatalogActivityCardProps) {
  const imageSource = resolveCatalogImageSource(activity.imageUrl);
  const cardBody = (
    <SurfaceCard style={styles.card}>
      <View style={styles.mediaWrap}>
        <Image source={imageSource} style={styles.image} />
        {activity.isFree ? (
          <View style={styles.topRow}>
            <CardBadge label="Gratis" tone="warm" />
          </View>
        ) : null}
        {onToggleFavorite ? (
          <Pressable
            accessibilityRole="button"
            onPress={(event) => {
              event.stopPropagation();
              onToggleFavorite();
            }}
            style={({ pressed }) => [
              styles.favoriteButton,
              pressed && styles.favoriteButtonPressed,
            ]}
          >
            <MaterialCommunityIcons
              name={
                isFavoritePending
                  ? "progress-clock"
                  : isFavorite
                    ? "heart"
                    : "heart-outline"
              }
              size={20}
              color={
                isFavorite
                  ? nensGoColors.coral
                  : isFavoritePending
                    ? nensGoColors.primaryStrong
                    : nensGoColors.primaryStrong
              }
            />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.content}>
        {activity.categoryLabel ? (
          <AppText variant="eyebrow" style={styles.categoryLabel} numberOfLines={1}>
            {activity.categoryLabel}
          </AppText>
        ) : null}

        <View style={styles.copyBlock}>
          <AppText variant="title" style={styles.title} numberOfLines={2}>
            {activity.title}
          </AppText>

          {activity.ageLabel ? (
            <AppText variant="bodyStrong" style={styles.ageLine} numberOfLines={1}>
              {activity.ageLabel}
            </AppText>
          ) : null}

          <AppText variant="body" style={styles.detailLine} numberOfLines={1}>
            {activity.centerName || activity.venueName || "Centro por definir"}
          </AppText>
          <AppText variant="body" style={styles.detailLine} numberOfLines={1}>
            {activity.cityName}
          </AppText>
        </View>

        {onPress ? (
          <View style={styles.ctaButton}>
            <AppText variant="button" style={styles.ctaLabel}>
              Ver mas
            </AppText>
            <MaterialCommunityIcons
              name="arrow-right"
              size={18}
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
  },
  mediaWrap: {
    position: "relative",
    aspectRatio: 4 / 3,
    overflow: "hidden",
    backgroundColor: nensGoColors.backgroundSoft,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  topRow: {
    position: "absolute",
    left: nensGoSpacing.md,
    top: nensGoSpacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.xs,
  },
  favoriteButton: {
    position: "absolute",
    right: nensGoSpacing.md,
    top: nensGoSpacing.md,
    width: 38,
    height: 38,
    borderRadius: nensGoRadii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderWidth: 1,
    borderColor: nensGoColors.border,
  },
  favoriteButtonPressed: {
    opacity: 0.86,
  },
  content: {
    paddingHorizontal: nensGoSpacing.lg,
    paddingVertical: nensGoSpacing.md,
    gap: nensGoSpacing.md,
  },
  categoryLabel: {
    color: nensGoColors.purple,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
  },
  copyBlock: {
    gap: 6,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
  },
  ageLine: {
    color: nensGoColors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  detailLine: {
    color: nensGoColors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  cardBadge: {
    borderRadius: nensGoRadii.pill,
    paddingHorizontal: nensGoSpacing.md,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  cardBadgePrimary: {
    backgroundColor: nensGoColors.primary,
  },
  cardBadgeSoft: {
    backgroundColor: nensGoColors.surfaceMuted,
  },
  cardBadgeWarm: {
    backgroundColor: nensGoColors.mint,
  },
  cardBadgeLabel: {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0,
    color: nensGoColors.surface,
    textTransform: "none",
  },
  cardBadgeLabelPrimary: {
    color: nensGoColors.surface,
  },
  ctaButton: {
    marginTop: nensGoSpacing.sm,
    minHeight: 46,
    borderRadius: nensGoRadii.md,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    backgroundColor: nensGoColors.surface,
    paddingHorizontal: nensGoSpacing.xl,
    paddingVertical: nensGoSpacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ctaLabel: {
    fontSize: 14,
    color: nensGoColors.primaryStrong,
  },
});
