import { StyleSheet, View } from "react-native";

import { authFeasibilityState } from "@/features/account/data/authFeasibilityState";
import { nensGoSpacing } from "@/shared/theme/tokens";
import { AppText } from "@/shared/ui/AppText";
import { BrandLockup } from "@/shared/ui/BrandLockup";
import { InfoPill } from "@/shared/ui/InfoPill";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

import { FeasibilitySectionCard } from "./FeasibilitySectionCard";

export function AccountFeasibilityScreen() {
  return (
    <ScreenContainer>
      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <BrandLockup compact />
          <InfoPill label="Slice 005" tone="primary" />
        </View>

        <AppText variant="eyebrow">Cuenta</AppText>
        <AppText variant="hero">
          Viabilidad tecnica de auth sin fingir login real
        </AppText>
        <AppText variant="body">
          La app sigue en modo anonimo, y eso es correcto para este POC. Esta
          pantalla no intenta autenticar; deja claro como encajaria identidad en
          movil si el proyecto decide seguir.
        </AppText>

        <View style={styles.signalRow}>
          <InfoPill label="Modo anonimo activo" />
          <InfoPill label={authFeasibilityState.proposedProvider} tone="warm" />
        </View>
      </SurfaceCard>

      <SurfaceCard tone="muted" style={styles.runtimeCard}>
        <AppText variant="metaStrong">Estado actual del runtime</AppText>
        <AppText variant="meta">
          Hoy el POC resuelve el loop principal sin autenticar: catalogo,
          detalle y contacto externo viven en abierto. Eso reduce complejidad y
          permite evaluar la experiencia base antes de atarla a identidad.
        </AppText>

        <View style={styles.capabilityRow}>
          {authFeasibilityState.currentCapabilities.map((capability) => (
            <InfoPill key={capability} label={capability} />
          ))}
        </View>
      </SurfaceCard>

      <FeasibilitySectionCard
        icon="shield-check-outline"
        eyebrow="Baseline web observado"
        title="Lo que ya sabemos del producto actual"
        items={authFeasibilityState.observedWebBaseline}
      />

      <FeasibilitySectionCard
        icon="alert-decagram-outline"
        eyebrow="Bloqueadores"
        title="Inputs que faltan antes de auth movil real"
        items={authFeasibilityState.missingInputs}
        tone="danger"
      />

      <FeasibilitySectionCard
        icon="map-marker-account-outline"
        eyebrow="Camino propuesto"
        title="Minimo recorrido si el POC continua"
        items={authFeasibilityState.proposedPath}
      />

      <FeasibilitySectionCard
        icon="rocket-launch-outline"
        eyebrow="Lo que auth podria desbloquear"
        title="Coste futuro con sentido de producto"
        items={authFeasibilityState.futureUnlocks}
        tone="warm"
      />
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
  runtimeCard: {
    gap: nensGoSpacing.sm,
  },
  capabilityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
    marginTop: nensGoSpacing.xs,
  },
});
