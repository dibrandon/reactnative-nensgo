import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

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

function StatusRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statusRow}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={icon}
          size={18}
          color={nensGoColors.primaryStrong}
        />
      </View>
      <View style={styles.statusCopy}>
        <AppText variant="meta">{label}</AppText>
        <AppText variant="bodyStrong">{value}</AppText>
      </View>
    </View>
  );
}

export function AccountStatusScreen() {
  return (
    <ScreenContainer>
      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <BrandLockup compact />
          <InfoPill label="Baseline real" tone="primary" />
        </View>

        <AppText variant="eyebrow">Cuenta</AppText>
        <AppText variant="hero">Acceso aun no conectado</AppText>
        <AppText variant="body">
          Esta fase no activa autenticacion movil ni perfil real. La app solo
          conecta lectura publica del catalogo desde Supabase.
        </AppText>
      </SurfaceCard>

      <SurfaceCard tone="muted" style={styles.sectionCard}>
        <AppText variant="eyebrow">Lo que si existe ahora</AppText>
        <AppText variant="section">Baseline activa</AppText>

        <View style={styles.sectionList}>
          <StatusRow
            icon="view-grid-outline"
            label="Catalogo"
            value="Explorar ya carga actividades reales desde Supabase."
          />
          <StatusRow
            icon="file-document-outline"
            label="Detalle"
            value="La ficha usa datos reales del catalogo sin contacto fake."
          />
          <StatusRow
            icon="alert-circle-outline"
            label="Errores"
            value="Si falla Supabase, la app muestra estado honesto sin mocks."
          />
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.sectionCard}>
        <AppText variant="eyebrow">Pendiente</AppText>
        <AppText variant="section">Fuera de esta slice</AppText>

        <View style={styles.sectionList}>
          <StatusRow
            icon="account-lock-outline"
            label="Auth movil"
            value="Login, sesion, onboarding y provisioning siguen sin conectar."
          />
          <StatusRow
            icon="heart-outline"
            label="Favoritos"
            value="No existe persistencia remota ni simulacion local en esta fase."
          />
          <StatusRow
            icon="message-text-outline"
            label="Contacto real"
            value="Las opciones reales llegaran cuando entre activity_contact_options."
          />
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
  },
  sectionCard: {
    gap: nensGoSpacing.md,
  },
  sectionList: {
    gap: nensGoSpacing.md,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: nensGoSpacing.sm,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: nensGoRadii.pill,
    backgroundColor: nensGoColors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  statusCopy: {
    flex: 1,
    gap: 2,
  },
});
