import { StyleSheet, View } from "react-native";

import { AppButton } from "@/shared/ui/AppButton";
import { AppText } from "@/shared/ui/AppText";
import { BrandLockup } from "@/shared/ui/BrandLockup";
import { InfoPill } from "@/shared/ui/InfoPill";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing
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
  primaryActionLabel?: string;
};

export function PlaceholderShellScreen({
  eyebrow,
  title,
  description,
  cards,
  footerNote,
  highlightLabel,
  primaryActionLabel,
}: PlaceholderShellScreenProps) {
  return (
    <ScreenContainer>
      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroStack}>
          <View style={styles.heroHeader}>
            <BrandLockup compact />
            <InfoPill label={highlightLabel} tone="primary" />
          </View>

          <AppText variant="eyebrow">{eyebrow}</AppText>
          <AppText variant="hero">{title}</AppText>
          <AppText variant="body">{description}</AppText>

          <View style={styles.signalRow}>
            <InfoPill label="POC nativo" />
            <InfoPill label="Alcance controlado" tone="warm" />
          </View>
          {primaryActionLabel ? (
            <AppButton
              label={primaryActionLabel}
              variant="secondary"
              icon="arrow-right"
              disabled
            />
          ) : null}
        </View>
      </SurfaceCard>

      <View style={styles.cardGrid}>
        {cards.map((card) => (
          <SurfaceCard key={card.title} style={styles.detailCard}>
            <View
              style={[styles.cardAccent, { backgroundColor: card.accentColor }]}
            />
            <AppText variant="section">{card.title}</AppText>
            <AppText variant="meta">{card.body}</AppText>
          </SurfaceCard>
        ))}
      </View>

      <SurfaceCard tone="muted" style={styles.footerPanel}>
        <AppText variant="metaStrong">Estado honesto del slice</AppText>
        <AppText variant="meta">{footerNote}</AppText>
      </SurfaceCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    paddingBottom: nensGoSpacing.xxl,
  },
  heroStack: {
    gap: nensGoSpacing.md,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: nensGoSpacing.sm,
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
    padding: nensGoSpacing.lg,
    gap: nensGoSpacing.sm,
  },
  cardAccent: {
    height: 6,
    width: 56,
    borderRadius: nensGoRadii.pill,
  },
  footerPanel: {
    padding: nensGoSpacing.lg,
    gap: nensGoSpacing.sm,
  },
});
