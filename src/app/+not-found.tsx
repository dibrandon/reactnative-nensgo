import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/shared/ui/AppButton";
import { AppText } from "@/shared/ui/AppText";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";
import { nensGoSpacing } from "@/shared/theme/tokens";

export default function NotFoundScreen() {
  return (
    <ScreenContainer contentStyle={styles.content}>
      <SurfaceCard style={styles.card}>
        <AppText variant="eyebrow">Ruta no disponible</AppText>
        <AppText variant="title">Esta pantalla no esta disponible</AppText>
        <AppText variant="body">
          Vuelve a Explorar para seguir buscando actividades.
        </AppText>
        <AppButton
          label="Volver a Explorar"
          icon="arrow-right"
          onPress={() => router.replace("/explore")}
        />
      </SurfaceCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    flexGrow: 1,
  },
  card: {
    width: "100%",
    padding: nensGoSpacing.xxl,
    gap: nensGoSpacing.md,
  },
});
