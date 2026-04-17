import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image, StyleSheet, View } from "react-native";

import { resolveCatalogImageSource } from "@/features/catalog/data/catalogImageSources";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";
import { AppButton } from "@/shared/ui/AppButton";
import { AppText } from "@/shared/ui/AppText";
import { InfoPill } from "@/shared/ui/InfoPill";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

type CatalogActivityCardProps = {
  activity: CatalogActivity;
  onPress?: () => void;
};

export function CatalogActivityCard({
  activity,
  onPress,
}: CatalogActivityCardProps) {
  const imageSource = resolveCatalogImageSource(activity.imageUrl);

  return (
    <SurfaceCard style={styles.card}>
      <View style={styles.mediaWrap}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.topRow}>
          {activity.categoryLabel ? (
            <InfoPill label={activity.categoryLabel} tone="primary" />
          ) : null}
          {activity.isFree ? <InfoPill label="Gratis" tone="warm" /> : null}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.copyBlock}>
          <AppText variant="section">{activity.title}</AppText>
          {activity.shortDescription ? (
            <AppText variant="meta" numberOfLines={3}>
              {activity.shortDescription}
            </AppText>
          ) : null}
        </View>

        <View style={styles.pillRow}>
          {activity.ageLabel ? <InfoPill label={activity.ageLabel} /> : null}
          <InfoPill label={activity.cityName} />
        </View>

        <View style={styles.centerRow}>
          <MaterialCommunityIcons
            name="map-marker-radius-outline"
            size={18}
            color={nensGoColors.primaryStrong}
          />
          <View style={styles.centerCopy}>
            <AppText variant="metaStrong">
              {activity.centerName || activity.venueName || "Centro por definir"}
            </AppText>
            {activity.venueName && activity.venueName !== activity.centerName ? (
              <AppText variant="meta">{activity.venueName}</AppText>
            ) : null}
          </View>
        </View>

        {onPress ? (
          <AppButton
            label="Ver detalle"
            variant="secondary"
            icon="arrow-right"
            onPress={onPress}
          />
        ) : null}
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    padding: 0,
  },
  mediaWrap: {
    position: "relative",
    backgroundColor: nensGoColors.backgroundSoft,
  },
  image: {
    width: "100%",
    height: 204,
    resizeMode: "cover",
  },
  topRow: {
    position: "absolute",
    left: nensGoSpacing.lg,
    right: nensGoSpacing.lg,
    top: nensGoSpacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: nensGoSpacing.sm,
  },
  content: {
    padding: nensGoSpacing.xxl,
    gap: nensGoSpacing.lg,
  },
  copyBlock: {
    gap: nensGoSpacing.sm,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.sm,
    padding: nensGoSpacing.md,
    borderRadius: nensGoRadii.md,
    backgroundColor: nensGoColors.surfaceMuted,
  },
  centerCopy: {
    flex: 1,
    gap: 2,
  },
});
