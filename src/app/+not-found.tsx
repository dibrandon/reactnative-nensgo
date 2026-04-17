import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
  nensGoTypography,
} from "@/shared/theme/tokens";

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Ruta no disponible</Text>
        <Text style={styles.title}>Esta pantalla no existe en el POC</Text>
        <Text style={styles.body}>
          Vuelve a Explorar para seguir validando el shell nativo de NensGo.
        </Text>
        <Link href="/explore" style={styles.link}>
          Ir a Explorar
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: nensGoSpacing.xxl,
    backgroundColor: nensGoColors.background,
  },
  card: {
    width: "100%",
    backgroundColor: nensGoColors.surface,
    borderRadius: nensGoRadii.lg,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    padding: nensGoSpacing.xxl,
    gap: nensGoSpacing.md,
  },
  eyebrow: {
    fontSize: nensGoTypography.micro,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: nensGoColors.primaryStrong,
  },
  title: {
    fontSize: nensGoTypography.title,
    fontWeight: "800",
    color: nensGoColors.text,
  },
  body: {
    fontSize: nensGoTypography.body,
    lineHeight: 24,
    color: nensGoColors.textMuted,
  },
  link: {
    color: nensGoColors.primaryStrong,
    fontSize: nensGoTypography.body,
    fontWeight: "700",
  },
});
