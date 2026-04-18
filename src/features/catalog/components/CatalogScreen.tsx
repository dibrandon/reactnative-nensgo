import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { emptyCatalogExploreFilters } from "@/features/catalog/helpers/catalogExplore";
import { useCatalogExplore } from "@/features/catalog/hooks/useCatalogExplore";
import { nensGoColors, nensGoRadii, nensGoSpacing } from "@/shared/theme/tokens";
import { AppButton } from "@/shared/ui/AppButton";
import { AppText } from "@/shared/ui/AppText";
import { BrandLockup } from "@/shared/ui/BrandLockup";
import { InfoPill } from "@/shared/ui/InfoPill";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

import { CatalogActivityCard } from "./CatalogActivityCard";
import { CatalogStatePanel } from "./CatalogStatePanel";

function ActiveChip({
  label,
  onClear,
  tone = "soft",
}: {
  label: string;
  onClear: () => void;
  tone?: "soft" | "primary";
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.activeChip,
        tone === "primary" ? styles.activeChipPrimary : styles.activeChipSoft,
        pressed && styles.activeChipPressed,
      ]}
      onPress={onClear}
    >
      <AppText
        variant="metaStrong"
        style={[
          styles.activeChipLabel,
          tone === "primary" ? styles.activeChipLabelPrimary : null,
        ]}
      >
        {label}
      </AppText>
      <MaterialCommunityIcons
        name="close"
        size={16}
        color={
          tone === "primary" ? nensGoColors.surface : nensGoColors.primaryStrong
        }
      />
    </Pressable>
  );
}

function InlineAction({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.inlineAction, pressed && styles.inlineActionPressed]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={16}
        color={nensGoColors.primaryStrong}
      />
      <AppText variant="metaStrong" style={styles.inlineActionLabel}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function CatalogScreen() {
  const {
    allActivities,
    visibleActivities,
    error,
    isLoading,
    reload,
    searchQuery,
    appliedFilters,
    setSearchQuery,
    setAppliedFilters,
    clearFilters,
    clearSearch,
    clearAllExploreState,
    resultsCount,
    activeFilterCount,
    hasActiveFilters,
    hasSearchQuery,
    hasAnyExploreConstraint,
  } = useCatalogExplore();
  const activityCountLabel = `${resultsCount} actividades`;
  const filterChipEntries = [
    {
      key: "city",
      value: appliedFilters.city,
      clear: () => {
        setAppliedFilters({
          ...appliedFilters,
          city: null,
        });
      },
    },
    {
      key: "category",
      value: appliedFilters.category,
      clear: () => {
        setAppliedFilters({
          ...appliedFilters,
          category: null,
        });
      },
    },
    {
      key: "ageBand",
      value: appliedFilters.ageBand,
      clear: () => {
        setAppliedFilters({
          ...appliedFilters,
          ageBand: null,
        });
      },
    },
  ].filter((entry) => Boolean(entry.value));

  return (
    <ScreenContainer keyboardShouldPersistTaps="handled">
      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <BrandLockup compact />
        </View>

        <AppText variant="eyebrow">Explorar</AppText>
        <AppText variant="hero">Explora actividades familiares</AppText>
        <AppText variant="body">
          Busca por nombre o filtra por ciudad, categoria y edad.
        </AppText>

        <View style={styles.searchToolbar}>
          <View style={styles.searchField}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={nensGoColors.primaryStrong}
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Busca hockey, arte, Sitges..."
              placeholderTextColor={nensGoColors.tabInactive}
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
            />
          </View>

          <AppButton
            label="Filtros"
            variant="secondary"
            icon="tune"
            onPress={() => {
              router.push("/explore/filters");
            }}
          />
        </View>

        <View style={styles.signalRow}>
          {!isLoading ? <InfoPill label={activityCountLabel} /> : null}
          {hasActiveFilters ? (
            <InfoPill label={`${activeFilterCount} filtros activos`} tone="warm" />
          ) : null}
        </View>

        {hasSearchQuery || hasActiveFilters ? (
          <View style={styles.constraintsBlock}>
            {hasSearchQuery ? (
              <ActiveChip
                label={`"${searchQuery}"`}
                tone="primary"
                onClear={clearSearch}
              />
            ) : null}

            {filterChipEntries.map((entry) => (
              <ActiveChip
                key={entry.key}
                label={entry.value ?? ""}
                onClear={entry.clear}
              />
            ))}
          </View>
        ) : null}

        {hasSearchQuery || hasActiveFilters ? (
          <View style={styles.inlineActionRow}>
            {hasActiveFilters ? (
              <InlineAction
                label="Limpiar filtros"
                icon="filter-remove-outline"
                onPress={clearFilters}
              />
            ) : null}
            {hasSearchQuery ? (
              <InlineAction
                label="Borrar busqueda"
                icon="close-circle-outline"
                onPress={clearSearch}
              />
            ) : null}
          </View>
        ) : null}
      </SurfaceCard>

      {isLoading ? (
        <CatalogStatePanel
          icon="progress-clock"
          eyebrow="Catalogo"
          title="Cargando actividades"
          description="Estamos preparando el catalogo."
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

      {!isLoading && !error && allActivities.length === 0 ? (
        <CatalogStatePanel
          icon="magnify-close"
          eyebrow="Catalogo"
          title="No hay actividades disponibles"
          description="Vuelve a intentarlo un poco mas tarde."
        />
      ) : null}

      {!isLoading && !error && allActivities.length > 0 && resultsCount === 0 ? (
        <CatalogStatePanel
          icon="filter-variant-remove"
          eyebrow="Explorar"
          title="No encontramos actividades con estos criterios"
          description="El catalogo no esta roto: la combinacion actual de busqueda y filtros ha dejado este corte sin resultados. Puedes volver a empezar con un solo gesto."
          actionLabel="Mostrar todo"
          onAction={clearAllExploreState}
        />
      ) : null}

      {!isLoading && !error && visibleActivities.length > 0 ? (
        <View style={styles.cardList}>
          {visibleActivities.map((activity) => (
            <CatalogActivityCard
              key={activity.id}
              activity={activity}
              onPress={() => {
                router.push(`/explore/${activity.id}`);
              }}
            />
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
    justifyContent: "flex-start",
    gap: nensGoSpacing.md,
    marginBottom: nensGoSpacing.sm,
  },
  signalRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
  },
  searchToolbar: {
    gap: nensGoSpacing.md,
  },
  searchField: {
    minHeight: 58,
    borderRadius: nensGoRadii.lg,
    backgroundColor: nensGoColors.surfaceMuted,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    paddingHorizontal: nensGoSpacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: nensGoSpacing.md,
    color: nensGoColors.text,
    fontSize: 16,
  },
  constraintsBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
  },
  activeChip: {
    minHeight: 38,
    borderRadius: nensGoRadii.pill,
    paddingHorizontal: nensGoSpacing.md,
    paddingVertical: nensGoSpacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.xs,
  },
  activeChipSoft: {
    backgroundColor: nensGoColors.surfaceMuted,
    borderWidth: 1,
    borderColor: nensGoColors.border,
  },
  activeChipPrimary: {
    backgroundColor: nensGoColors.primaryStrong,
  },
  activeChipPressed: {
    opacity: 0.9,
  },
  activeChipLabel: {
    color: nensGoColors.primaryStrong,
  },
  activeChipLabelPrimary: {
    color: nensGoColors.surface,
  },
  inlineActionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.md,
  },
  inlineAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.xs,
    paddingVertical: nensGoSpacing.xs,
  },
  inlineActionPressed: {
    opacity: 0.76,
  },
  inlineActionLabel: {
    color: nensGoColors.primaryStrong,
  },
  cardList: {
    gap: nensGoSpacing.lg,
  },
});
