import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import {
  getActivityContactOptionIcon,
  getActivityContactOptionLabel,
  openActivityContactAction,
} from "@/features/catalog/data/activityContactAction";
import { resolveCatalogImageSource } from "@/features/catalog/data/catalogImageSources";
import {
  getCatalogDetailFacts,
  getCatalogLocationFacts,
} from "@/features/catalog/helpers/catalogDetailPresentation";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";
import type { ActivityContactOption } from "@/features/catalog/models/ActivityContactOption";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";
import { AppButton } from "@/shared/ui/AppButton";
import { AppText } from "@/shared/ui/AppText";
import { InfoPill } from "@/shared/ui/InfoPill";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

function DetailFactCard({
  label,
  value,
  icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  tone?: "default" | "warm";
}) {
  return (
    <SurfaceCard tone="muted" style={styles.factCard}>
      <View
        style={[
          styles.iconWrap,
          tone === "warm" ? styles.iconWrapWarm : styles.iconWrapDefault,
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={
            tone === "warm" ? nensGoColors.orange : nensGoColors.primaryStrong
          }
        />
      </View>
      <AppText variant="eyebrow">{label}</AppText>
      <AppText variant="bodyStrong">{value}</AppText>
    </SurfaceCard>
  );
}

function ContactOptionRow({
  contactOption,
  onPress,
}: {
  contactOption: ActivityContactOption;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.contactOptionRow,
        pressed && styles.contactOptionRowPressed,
      ]}
    >
      <View style={styles.contactOptionIconWrap}>
        <MaterialCommunityIcons
          name={getActivityContactOptionIcon(contactOption)}
          size={18}
          color={nensGoColors.primaryStrong}
        />
      </View>
      <View style={styles.contactOptionCopy}>
        <AppText variant="bodyStrong">
          {getActivityContactOptionLabel(contactOption)}
        </AppText>
        <AppText variant="meta" numberOfLines={1}>
          {contactOption.contactValue}
        </AppText>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={nensGoColors.primaryStrong}
      />
    </Pressable>
  );
}

type CatalogActivityDetailContentProps = {
  activity: CatalogActivity;
  backLabel: string;
  contactError: string | null;
  contactOptions: ActivityContactOption[];
  isContactLoading: boolean;
  isFavorite: boolean;
  isFavoritePending: boolean;
  onBack: () => void;
  onReloadContactOptions: () => void;
  onToggleFavorite: () => Promise<void> | void;
};

export function CatalogActivityDetailContent({
  activity,
  backLabel,
  contactError,
  contactOptions,
  isContactLoading,
  isFavorite,
  isFavoritePending,
  onBack,
  onReloadContactOptions,
  onToggleFavorite,
}: CatalogActivityDetailContentProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    if (contactOptions.length <= 1) {
      setIsContactModalOpen(false);
    }
  }, [contactOptions.length]);

  async function handleOpenContactOption(contactOption: ActivityContactOption) {
    const opened = await openActivityContactAction(activity, contactOption);

    if (!opened) {
      Alert.alert(
        "No pudimos abrir este contacto",
        "Revisa la opcion disponible o prueba de nuevo en unos segundos.",
      );
      return;
    }

    setIsContactModalOpen(false);
  }

  const imageSource = resolveCatalogImageSource(activity.imageUrl);
  const detailFacts = getCatalogDetailFacts(activity);
  const locationFacts = getCatalogLocationFacts(activity);
  const detailCopy = activity.shortDescription;
  const hasMultipleContactOptions = contactOptions.length > 1;
  const hasSingleContactOption = contactOptions.length === 1;
  const primaryContactOption = hasSingleContactOption
    ? contactOptions[0]
    : null;

  return (
    <ScreenContainer>
      <AppButton
        label={backLabel}
        variant="secondary"
        icon="arrow-left"
        onPress={onBack}
      />

      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroMediaWrap}>
          <Image source={imageSource} style={styles.heroImage} />
        </View>

        <View style={styles.heroBody}>
          <View style={styles.heroBadgeRow}>
            <View style={styles.heroBadgeStack}>
              {activity.categoryLabel ? (
                <InfoPill label={activity.categoryLabel} tone="primary" />
              ) : null}
              {activity.isFree ? <InfoPill label="Gratis" tone="warm" /> : null}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => {
                void onToggleFavorite();
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
                    : nensGoColors.primaryStrong
                }
              />
            </Pressable>
          </View>

          <AppText variant="title">{activity.title}</AppText>
          {detailCopy ? <AppText variant="body">{detailCopy}</AppText> : null}

          <View style={styles.heroMetaRow}>
            {activity.ageLabel ? <InfoPill label={activity.ageLabel} /> : null}
            {activity.cityName ? <InfoPill label={activity.cityName} /> : null}
          </View>
        </View>
      </SurfaceCard>

      {detailFacts.length > 0 ? (
        <View style={styles.sectionBlock}>
          <AppText variant="title">Detalles</AppText>
          <View style={styles.factList}>
            {detailFacts.map((fact) => (
              <DetailFactCard
                key={fact.key}
                label={fact.label}
                value={fact.value}
                icon={fact.icon}
                tone={fact.tone}
              />
            ))}
          </View>
        </View>
      ) : null}

      {locationFacts.length > 0 ? (
        <View style={styles.sectionBlock}>
          <AppText variant="title">Ubicacion</AppText>
          <View style={styles.factList}>
            {locationFacts.map((item) => (
              <DetailFactCard
                key={item.key}
                label={item.label}
                value={item.value}
                icon={item.icon}
              />
            ))}
          </View>
        </View>
      ) : null}

      <SurfaceCard style={styles.contactCard}>
        <AppText variant="title">Contacto</AppText>
        {isContactLoading ? (
          <View style={styles.contactStatusBox}>
            <MaterialCommunityIcons
              name="progress-clock"
              size={18}
              color={nensGoColors.primaryStrong}
            />
            <AppText variant="metaStrong" style={styles.contactStatusText}>
              Cargando las opciones disponibles.
            </AppText>
          </View>
        ) : null}

        {!isContactLoading && contactError ? (
          <>
            <AppText variant="body">
              No pudimos cargar el contacto de esta actividad ahora mismo.
            </AppText>
            <AppButton
              label="Reintentar"
              variant="secondary"
              icon="refresh"
              onPress={onReloadContactOptions}
            />
          </>
        ) : null}

        {!isContactLoading && !contactError && contactOptions.length === 0 ? (
          <>
            <AppText variant="body">
              Esta actividad no tiene un canal de contacto activo por ahora.
            </AppText>
            <AppButton
              label="Sin contacto disponible"
              variant="secondary"
              icon="information-outline"
              disabled
            />
          </>
        ) : null}

        {!isContactLoading && !contactError && primaryContactOption ? (
          <AppButton
            label={getActivityContactOptionLabel(primaryContactOption)}
            icon={getActivityContactOptionIcon(primaryContactOption)}
            onPress={() => {
              void handleOpenContactOption(primaryContactOption);
            }}
          />
        ) : null}

        {!isContactLoading && !contactError && hasMultipleContactOptions ? (
          <>
            <AppText variant="body">
              Elige la forma de contacto que prefieras para continuar.
            </AppText>
            <AppButton
              label={`Elegir contacto (${contactOptions.length})`}
              icon="chevron-right"
              onPress={() => {
                setIsContactModalOpen(true);
              }}
            />
          </>
        ) : null}
      </SurfaceCard>

      <Modal
        animationType="fade"
        transparent
        visible={isContactModalOpen}
        onRequestClose={() => {
          setIsContactModalOpen(false);
        }}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              setIsContactModalOpen(false);
            }}
          />
          <SurfaceCard style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderCopy}>
                <AppText variant="section">Elige una forma de contacto</AppText>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  setIsContactModalOpen(false);
                }}
                style={({ pressed }) => [
                  styles.modalCloseButton,
                  pressed && styles.modalCloseButtonPressed,
                ]}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color={nensGoColors.primaryStrong}
                />
              </Pressable>
            </View>

            <View style={styles.modalList}>
              {contactOptions.map((contactOption) => (
                <ContactOptionRow
                  key={contactOption.id}
                  contactOption={contactOption}
                  onPress={() => {
                    void handleOpenContactOption(contactOption);
                  }}
                />
              ))}
            </View>
          </SurfaceCard>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    overflow: "hidden",
    padding: 0,
  },
  heroMediaWrap: {
    backgroundColor: nensGoColors.backgroundSoft,
  },
  heroImage: {
    width: "100%",
    height: 280,
    resizeMode: "cover",
  },
  heroBody: {
    padding: nensGoSpacing.xxl,
    gap: nensGoSpacing.md,
  },
  heroBadgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: nensGoSpacing.sm,
  },
  heroBadgeStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
    flex: 1,
  },
  heroMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
  },
  sectionBlock: {
    gap: nensGoSpacing.md,
  },
  factList: {
    gap: nensGoSpacing.md,
  },
  factCard: {
    gap: nensGoSpacing.sm,
  },
  iconWrap: {
    height: 42,
    width: 42,
    borderRadius: nensGoRadii.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: nensGoSpacing.xs,
  },
  iconWrapDefault: {
    backgroundColor: "rgba(75, 143, 231, 0.12)",
  },
  iconWrapWarm: {
    backgroundColor: "rgba(245, 138, 58, 0.16)",
  },
  contactCard: {
    gap: nensGoSpacing.md,
    marginBottom: nensGoSpacing.sm,
  },
  contactStatusBox: {
    minHeight: 52,
    borderRadius: nensGoRadii.md,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    backgroundColor: nensGoColors.surfaceMuted,
    paddingHorizontal: nensGoSpacing.lg,
    paddingVertical: nensGoSpacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.sm,
  },
  contactStatusText: {
    color: nensGoColors.primaryStrong,
    flex: 1,
  },
  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: nensGoRadii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: nensGoColors.surfaceMuted,
    borderWidth: 1,
    borderColor: nensGoColors.border,
  },
  favoriteButtonPressed: {
    opacity: 0.88,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(47, 61, 115, 0.34)",
    justifyContent: "center",
    paddingHorizontal: nensGoSpacing.xl,
  },
  modalCard: {
    gap: nensGoSpacing.md,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: nensGoSpacing.md,
  },
  modalHeaderCopy: {
    flex: 1,
    gap: 2,
  },
  modalCloseButton: {
    width: 38,
    height: 38,
    borderRadius: nensGoRadii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: nensGoColors.surfaceMuted,
  },
  modalCloseButtonPressed: {
    opacity: 0.86,
  },
  modalList: {
    gap: nensGoSpacing.sm,
  },
  contactOptionRow: {
    minHeight: 60,
    borderRadius: nensGoRadii.md,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    backgroundColor: nensGoColors.surface,
    paddingHorizontal: nensGoSpacing.md,
    paddingVertical: nensGoSpacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.sm,
  },
  contactOptionRowPressed: {
    opacity: 0.9,
  },
  contactOptionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: nensGoRadii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: nensGoColors.surfaceMuted,
  },
  contactOptionCopy: {
    flex: 1,
    gap: 2,
  },
});
