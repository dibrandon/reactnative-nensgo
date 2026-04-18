import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, View } from "react-native";

import { accountMockProfile } from "@/features/account/data/accountMockProfile";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";
import { AppText } from "@/shared/ui/AppText";
import { BrandLockup } from "@/shared/ui/BrandLockup";
import { InfoPill } from "@/shared/ui/InfoPill";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

function FavoriteRow({
  title,
  city,
}: {
  title: string;
  city: string;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.favoriteRow,
        pressed && styles.favoriteRowPressed,
      ]}
      onPress={() => {}}
    >
      <View style={styles.favoriteLead}>
        <View style={styles.favoriteBullet} />
        <View style={styles.favoriteCopy}>
          <AppText variant="bodyStrong">{title}</AppText>
          <AppText variant="meta">{city}</AppText>
        </View>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={nensGoColors.primaryStrong}
      />
    </Pressable>
  );
}

export function AccountMockScreen() {
  return (
    <ScreenContainer>
      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <BrandLockup compact />
          <InfoPill label="Demo 5" tone="primary" />
        </View>

        <AppText variant="eyebrow">Cuenta</AppText>
        <AppText variant="hero">Tu espacio</AppText>
      </SurfaceCard>

      <SurfaceCard style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.avatarWrap}>
            <AppText variant="title" style={styles.avatarLabel}>
              U
            </AppText>
          </View>

          <View style={styles.profileCopy}>
            <AppText variant="title">{accountMockProfile.displayName}</AppText>
            <View style={styles.cityRow}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={18}
                color={nensGoColors.primaryStrong}
              />
              <AppText variant="metaStrong">{accountMockProfile.city}</AppText>
            </View>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard tone="muted" style={styles.favoritesCard}>
        <AppText variant="eyebrow">Favoritos</AppText>
        <AppText variant="section">Actividades guardadas</AppText>

        <View style={styles.favoriteList}>
          {accountMockProfile.favorites.map((favorite) => (
            <FavoriteRow
              key={favorite.id}
              title={favorite.title}
              city={favorite.city}
            />
          ))}
        </View>
      </SurfaceCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    gap: nensGoSpacing.md,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: nensGoSpacing.md,
    marginBottom: nensGoSpacing.sm,
  },
  profileCard: {
    gap: nensGoSpacing.md,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.lg,
  },
  avatarWrap: {
    width: 74,
    height: 74,
    borderRadius: nensGoRadii.lg,
    backgroundColor: nensGoColors.primaryStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLabel: {
    color: nensGoColors.surface,
  },
  profileCopy: {
    flex: 1,
    gap: nensGoSpacing.xs,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.xs,
  },
  favoritesCard: {
    gap: nensGoSpacing.md,
    marginBottom: nensGoSpacing.sm,
  },
  favoriteList: {
    gap: nensGoSpacing.sm,
  },
  favoriteRow: {
    minHeight: 68,
    borderRadius: nensGoRadii.md,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    backgroundColor: nensGoColors.surface,
    paddingHorizontal: nensGoSpacing.lg,
    paddingVertical: nensGoSpacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: nensGoSpacing.md,
  },
  favoriteRowPressed: {
    opacity: 0.9,
  },
  favoriteLead: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: nensGoSpacing.sm,
    flex: 1,
  },
  favoriteBullet: {
    width: 10,
    height: 10,
    borderRadius: nensGoRadii.pill,
    backgroundColor: nensGoColors.coral,
    marginTop: 7,
  },
  favoriteCopy: {
    flex: 1,
    gap: 2,
  },
});
