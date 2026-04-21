import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { useRemoteFavorites } from "@/features/favorites/hooks/useRemoteFavorites";
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
import { goBackToExploreFallback } from "@/features/catalog/helpers/catalogNavigation";
import { useCatalogActivity } from "@/features/catalog/hooks/useCatalogActivity";
import { useActivityContactOptions } from "@/features/catalog/hooks/useActivityContactOptions";
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

import { CatalogStatePanel } from "./CatalogStatePanel";

type DetailRouteParams = {
  activityId?: string | string[];
};

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

export function CatalogActivityDetailScreen() {
  const params = useLocalSearchParams<DetailRouteParams>();
  const activityId = Array.isArray(params.activityId)
    ? params.activityId[0] ?? ""
    : params.activityId ?? "";

  const { activity, error, isLoading, reload } = useCatalogActivity(activityId);
  const {
    contactOptions,
    error: contactError,
    isLoading: isContactLoading,
    reload: reloadContactOptions,
  } = useActivityContactOptions(activity?.id ?? "", Boolean(activity));
  const { isFavorite, isPending, toggleFavorite } = useRemoteFavorites();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  function handleGoBack() {
    goBackToExploreFallback();
  }

  useEffect(() => {
    if (contactOptions.length <= 1) {
      setIsContactModalOpen(false);
    }
  }, [contactOptions.length]);

  async function handleOpenContactOption(contactOption: ActivityContactOption) {
    if (!activity) {
      return;
    }

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

  async function handleToggleFavorite() {
    if (!activity) {
      return;
    }

    const result = await toggleFavorite(activity.id);

    if (result.reason === "auth_required" || result.reason === "profile_required") {
      router.push("/account");
      return;
    }

    if (result.error) {
      Alert.alert(
        "No pudimos cambiar este favorito",
        result.error.message,
      );
    }
  }

  if (isLoading) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a explorar"
          variant="secondary"
          icon="arrow-left"
          onPress={handleGoBack}
        />
        <CatalogStatePanel
          icon="progress-clock"
          eyebrow="Detalle"
          title="Cargando la ficha"
          description="Estamos preparando la informacion de esta actividad."
        />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a explorar"
          variant="secondary"
          icon="arrow-left"
          onPress={handleGoBack}
        />
        <CatalogStatePanel
          icon="alert-circle-outline"
          eyebrow="Detalle"
          title="No pudimos cargar esta actividad"
          description={error}
          actionLabel="Reintentar"
          onAction={reload}
        />
      </ScreenContainer>
    );
  }

  if (!activity) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a explorar"
          variant="secondary"
          icon="arrow-left"
          onPress={handleGoBack}
        />
        <CatalogStatePanel
          icon="magnify-close"
          eyebrow="Detalle"
          title="No encontramos esta actividad"
          description="Vuelve a explorar para revisar otras opciones."
          actionLabel="Volver al catalogo"
          onAction={handleGoBack}
        />
      </ScreenContainer>
    );
  }

  const imageSource = resolveCatalogImageSource(activity.imageUrl);
  const detailFacts = getCatalogDetailFacts(activity);
  const locationFacts = getCatalogLocationFacts(activity);
  const detailCopy = activity.description || activity.shortDescription;
  const hasMultipleContactOptions = contactOptions.length > 1;
  const hasSingleContactOption = contactOptions.length === 1;
  const primaryContactOption = hasSingleContactOption
    ? contactOptions[0]
    : null;

  return (
    <ScreenContainer>
      <AppButton
        label="Volver a explorar"
        variant="secondary"
        icon="arrow-left"
        onPress={handleGoBack}
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
                void handleToggleFavorite();
              }}
              style={({ pressed }) => [
                styles.favoriteButton,
                pressed && styles.favoriteButtonPressed,
              ]}
            >
              <MaterialCommunityIcons
                name={
                  isPending(activity.id)
                    ? "progress-clock"
                    : isFavorite(activity.id)
                      ? "heart"
                      : "heart-outline"
                }
                size={20}
                color={
                  isFavorite(activity.id)
                    ? nensGoColors.coral
                    : nensGoColors.primaryStrong
                }
              />
            </Pressable>
          </View>

          <AppText variant="title">{activity.title}</AppText>
          {detailCopy ? (
            <AppText variant="body">{detailCopy}</AppText>
          ) : null}

          <View style={styles.heroMetaRow}>
            {activity.ageLabel ? <InfoPill label={activity.ageLabel} /> : null}
            <InfoPill label={activity.cityName} />
          </View>
        </View>
      </SurfaceCard>

      {detailFacts.length > 0 ? (
        <View style={styles.sectionBlock}>
          <AppText variant="eyebrow">Informacion clave</AppText>
          <AppText variant="title">Evalua si encaja</AppText>
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
          <AppText variant="eyebrow">Ubicacion</AppText>
          <AppText variant="title">Referencia practica</AppText>
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
        <AppText variant="eyebrow">Accion principal</AppText>
        <AppText variant="title">Contactar</AppText>
        {isContactLoading ? (
          <View style={styles.contactStatusBox}>
            <MaterialCommunityIcons
              name="progress-clock"
              size={18}
              color={nensGoColors.primaryStrong}
            />
            <AppText variant="metaStrong" style={styles.contactStatusText}>
              Cargando opciones reales de contacto
            </AppText>
          </View>
        ) : null}

        {!isContactLoading && contactError ? (
          <>
            <AppText variant="body">
              No pudimos resolver el contacto real de esta actividad desde
              Supabase.
            </AppText>
            <AppButton
              label="Reintentar contacto"
              variant="secondary"
              icon="refresh"
              onPress={reloadContactOptions}
            />
          </>
        ) : null}

        {!isContactLoading && !contactError && contactOptions.length === 0 ? (
          <>
            <AppText variant="body">
              Esta actividad no tiene opciones de contacto activas en el backend
              compartido. El estado actual es honesto: no hay CTA operativa
              hasta que exista al menos una opcion real.
            </AppText>
            <View style={styles.contactStatusBox}>
              <MaterialCommunityIcons
                name="information-outline"
                size={18}
                color={nensGoColors.primaryStrong}
              />
              <AppText variant="metaStrong" style={styles.contactStatusText}>
                Sin contacto activo para esta actividad
              </AppText>
            </View>
          </>
        ) : null}

        {!isContactLoading && !contactError && primaryContactOption ? (
          <>
            <AppText variant="body">
              Esta actividad tiene una sola opcion activa y la app la ejecuta de
              forma directa.
            </AppText>
            <AppButton
              label={getActivityContactOptionLabel(primaryContactOption)}
              icon={getActivityContactOptionIcon(primaryContactOption)}
              onPress={() => {
                void handleOpenContactOption(primaryContactOption);
              }}
            />
          </>
        ) : null}

        {!isContactLoading && !contactError && hasMultipleContactOptions ? (
          <>
            <AppText variant="body">
              Esta actividad ofrece varias opciones activas. Elige la que mejor
              te encaje para continuar.
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
                <AppText variant="eyebrow">Contacto real</AppText>
                <AppText variant="section">Elige una opcion</AppText>
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
    gap: nensGoSpacing.sm,
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
    gap: nensGoSpacing.sm,
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
