import { StyleSheet, View } from "react-native";

import { useCatalogActivities } from "@/features/catalog/hooks/useCatalogActivities";
import { nensGoSpacing } from "@/shared/theme/tokens";
import { AppText } from "@/shared/ui/AppText";
import { BrandLockup } from "@/shared/ui/BrandLockup";
import { InfoPill } from "@/shared/ui/InfoPill";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

import { CatalogActivityCard } from "./CatalogActivityCard";
import { CatalogStatePanel } from "./CatalogStatePanel";

export function CatalogScreen() {
  const { activities, error, isLoading, reload } = useCatalogActivities();
  const activityCountLabel = `${activities.length} actividades`;

  return (
    <ScreenContainer>
      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <BrandLockup compact />
          <InfoPill label="Slice 003" tone="primary" />
        </View>

        <AppText variant="eyebrow">Explorar</AppText>
        <AppText variant="hero">
          Catalogo familiar nativo con datos mock curados
        </AppText>
        <AppText variant="body">
          Esta slice valida si el loop principal de NensGo se sostiene en
          movil: abrir la app, escanear opciones familiares y detectar con
          rapidez cuales merece la pena abrir luego en detalle.
        </AppText>

        <View style={styles.signalRow}>
          <InfoPill label="Mock adaptado del fallback web" />
          <InfoPill label="Sin filtros todavia" tone="warm" />
          {!isLoading ? <InfoPill label={activityCountLabel} /> : null}
        </View>
      </SurfaceCard>

      <SurfaceCard tone="muted" style={styles.statusCard}>
        <AppText variant="metaStrong">Estado honesto del slice</AppText>
        <AppText variant="meta">
          Ya existe lectura de catalogo y cards moviles. Todavia no hay
          detalle, favoritos, filtros complejos ni contacto externo desde la
          ficha.
        </AppText>
      </SurfaceCard>

      {isLoading ? (
        <CatalogStatePanel
          icon="progress-clock"
          eyebrow="Catalogo"
          title="Cargando la primera capa de lectura"
          description="El catalogo de esta prueba de concepto vive en una capa mock curada para validar card, scanning y continuidad visual antes de tocar detalle o backend."
        />
      ) : null}

      {!isLoading && error ? (
        <CatalogStatePanel
          icon="alert-circle-outline"
          eyebrow="Catalogo"
          title="No pudimos cargar las actividades"
          description={error}
          actionLabel="Reintentar"
          onAction={reload}
        />
      ) : null}

      {!isLoading && !error && activities.length === 0 ? (
        <CatalogStatePanel
          icon="magnify-close"
          eyebrow="Catalogo"
          title="No hay actividades activas en este corte"
          description="El POC necesita al menos un conjunto pequeno de actividades para validar cards y detalle. Si esta pantalla queda vacia, la capa mock o el filtro del slice se han quedado sin contenido."
        />
      ) : null}

      {!isLoading && !error && activities.length > 0 ? (
        <View style={styles.cardList}>
          {activities.map((activity) => (
            <CatalogActivityCard key={activity.id} activity={activity} />
          ))}
        </View>
      ) : null}
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
  signalRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
    marginTop: nensGoSpacing.sm,
  },
  statusCard: {
    gap: nensGoSpacing.sm,
  },
  cardList: {
    gap: nensGoSpacing.lg,
  },
});
