import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { Linking, Image, StyleSheet, View } from "react-native";

import { resolveCatalogImageSource } from "@/features/catalog/data/catalogImageSources";
import {
  buildCatalogContactUrl,
  getCatalogDetailFacts,
  getCatalogLocationFacts,
} from "@/features/catalog/helpers/catalogDetailPresentation";
import { goBackToExploreFallback } from "@/features/catalog/helpers/catalogNavigation";
import { useCatalogActivity } from "@/features/catalog/hooks/useCatalogActivity";
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

export function CatalogActivityDetailScreen() {
  const params = useLocalSearchParams<DetailRouteParams>();
  const activityId = Array.isArray(params.activityId)
    ? params.activityId[0] ?? ""
    : params.activityId ?? "";

  const { activity, error, isLoading, reload } = useCatalogActivity(activityId);

  function handleGoBack() {
    goBackToExploreFallback();
  }

  async function handleOpenContact() {
    if (!activity) {
      return;
    }

    const contactUrl = buildCatalogContactUrl(activity);

    if (!contactUrl) {
      return;
    }

    await Linking.openURL(contactUrl);
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
  const contactUrl = buildCatalogContactUrl(activity);

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
            {activity.categoryLabel ? (
              <InfoPill label={activity.categoryLabel} tone="primary" />
            ) : null}
            {activity.isFree ? <InfoPill label="Gratis" tone="warm" /> : null}
          </View>

          <AppText variant="title">{activity.title}</AppText>
          {activity.shortDescription ? (
            <AppText variant="body">{activity.shortDescription}</AppText>
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
        <AppText variant="body">
          Si esta actividad te interesa, puedes abrir el contacto directo.
        </AppText>
        <AppButton
          label={contactUrl ? "Abrir WhatsApp" : "Contacto no disponible"}
          icon="whatsapp"
          onPress={handleOpenContact}
          disabled={!contactUrl}
        />
      </SurfaceCard>
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
    gap: nensGoSpacing.sm,
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
});
