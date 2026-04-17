import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InfoPill } from "@/shared/ui/InfoPill";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
  nensGoTypography,
} from "@/shared/theme/tokens";

type PlaceholderCard = {
  title: string;
  body: string;
  accentColor: string;
};

type PlaceholderShellScreenProps = {
  eyebrow: string;
  title: string;
  description: string;
  cards: PlaceholderCard[];
  footerNote: string;
  highlightLabel: string;
};

export function PlaceholderShellScreen({
  eyebrow,
  title,
  description,
  cards,
  footerNote,
  highlightLabel,
}: PlaceholderShellScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.backgroundBubblePrimary} pointerEvents="none" />
      <View style={styles.backgroundBubbleWarm} pointerEvents="none" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <Image
              source={require("../../../../assets/images/nensgo-mark.png")}
              style={styles.brandMark}
            />
            <InfoPill label={highlightLabel} tone="primary" />
          </View>

          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.signalRow}>
            <InfoPill label="POC nativo" />
            <InfoPill label="Alcance controlado" tone="warm" />
          </View>
        </View>

        <View style={styles.cardGrid}>
          {cards.map((card) => (
            <View key={card.title} style={styles.detailCard}>
              <View
                style={[styles.cardAccent, { backgroundColor: card.accentColor }]}
              />
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardBody}>{card.body}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footerPanel}>
          <Text style={styles.footerTitle}>Estado honesto del slice</Text>
          <Text style={styles.footerBody}>{footerNote}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: nensGoColors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: nensGoSpacing.xl,
    paddingBottom: nensGoSpacing.xxxl,
    paddingTop: nensGoSpacing.sm,
    gap: nensGoSpacing.xl,
  },
  backgroundBubblePrimary: {
    position: "absolute",
    right: -70,
    top: 110,
    height: 220,
    width: 220,
    borderRadius: 220,
    backgroundColor: "rgba(99, 190, 235, 0.16)",
  },
  backgroundBubbleWarm: {
    position: "absolute",
    left: -80,
    bottom: 140,
    height: 220,
    width: 220,
    borderRadius: 220,
    backgroundColor: "rgba(245, 201, 74, 0.16)",
  },
  heroCard: {
    backgroundColor: nensGoColors.surface,
    borderRadius: nensGoRadii.lg,
    padding: nensGoSpacing.xxl,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    shadowColor: nensGoColors.text,
    shadowOpacity: 0.09,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5,
    gap: nensGoSpacing.md,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: nensGoSpacing.sm,
  },
  brandMark: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  eyebrow: {
    fontSize: nensGoTypography.micro,
    fontWeight: "800",
    color: nensGoColors.primaryStrong,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontSize: nensGoTypography.hero,
    fontWeight: "800",
    lineHeight: 38,
    color: nensGoColors.text,
  },
  description: {
    fontSize: nensGoTypography.body,
    lineHeight: 24,
    color: nensGoColors.textMuted,
  },
  signalRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
    marginTop: nensGoSpacing.sm,
  },
  cardGrid: {
    gap: nensGoSpacing.md,
  },
  detailCard: {
    backgroundColor: nensGoColors.surface,
    borderRadius: nensGoRadii.md,
    padding: nensGoSpacing.lg,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    gap: nensGoSpacing.sm,
  },
  cardAccent: {
    height: 6,
    width: 56,
    borderRadius: nensGoRadii.pill,
  },
  cardTitle: {
    fontSize: nensGoTypography.section,
    fontWeight: "700",
    color: nensGoColors.text,
  },
  cardBody: {
    fontSize: nensGoTypography.meta,
    lineHeight: 22,
    color: nensGoColors.textMuted,
  },
  footerPanel: {
    backgroundColor: nensGoColors.surfaceMuted,
    borderRadius: nensGoRadii.md,
    padding: nensGoSpacing.lg,
    gap: nensGoSpacing.sm,
    borderWidth: 1,
    borderColor: nensGoColors.border,
  },
  footerTitle: {
    fontSize: nensGoTypography.meta,
    fontWeight: "700",
    color: nensGoColors.text,
  },
  footerBody: {
    fontSize: nensGoTypography.meta,
    lineHeight: 21,
    color: nensGoColors.textMuted,
  },
});
