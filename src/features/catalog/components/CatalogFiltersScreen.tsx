import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import {
  emptyCatalogExploreFilters,
  type CatalogExploreFilters,
} from "@/features/catalog/helpers/catalogExplore";
import { goBackToExploreFallback } from "@/features/catalog/helpers/catalogNavigation";
import { useCatalogExplore } from "@/features/catalog/hooks/useCatalogExplore";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";
import { AppButton } from "@/shared/ui/AppButton";
import { AppText } from "@/shared/ui/AppText";
import { BrandLockup } from "@/shared/ui/BrandLockup";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

import { CatalogStatePanel } from "./CatalogStatePanel";

function FilterChoice({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.choiceButton,
        selected && styles.choiceButtonSelected,
        pressed && styles.choiceButtonPressed,
      ]}
      onPress={onPress}
    >
      <AppText
        variant="metaStrong"
        style={selected ? styles.choiceLabelSelected : styles.choiceLabel}
      >
        {label}
      </AppText>
      {selected ? (
        <MaterialCommunityIcons
          name="check-circle"
          size={18}
          color={nensGoColors.surface}
        />
      ) : null}
    </Pressable>
  );
}

function FilterSection({
  title,
  options,
  selectedValue,
  onSelect,
}: {
  title: string;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <SurfaceCard tone="muted" style={styles.sectionCard}>
      <AppText variant="eyebrow">{title}</AppText>
      <View style={styles.choiceWrap}>
        {options.map((option) => (
          <FilterChoice
            key={option}
            label={option}
            selected={selectedValue === option}
            onPress={() => {
              onSelect(option);
            }}
          />
        ))}
      </View>
    </SurfaceCard>
  );
}

export function CatalogFiltersScreen() {
  const isFocused = useIsFocused();
  const {
    filterOptions,
    appliedFilters,
    isLoading,
    error,
    reload,
    setAppliedFilters,
  } = useCatalogExplore();
  const [draftFilters, setDraftFilters] = useState<CatalogExploreFilters>(
    appliedFilters,
  );

  useEffect(() => {
    if (isFocused) {
      setDraftFilters(appliedFilters);
    }
  }, [appliedFilters, isFocused]);

  function toggleDraftValue(
    key: keyof CatalogExploreFilters,
    value: string,
  ) {
    setDraftFilters((currentValue) => ({
      ...currentValue,
      [key]: currentValue[key] === value ? null : value,
    }));
  }

  function handleApply() {
    setAppliedFilters(draftFilters);
    goBackToExploreFallback();
  }

  function handleClearDraft() {
    setDraftFilters({ ...emptyCatalogExploreFilters });
  }

  return (
    <ScreenContainer keyboardShouldPersistTaps="handled">
      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <BrandLockup compact />
          <AppButton
            label="Volver"
            variant="secondary"
            icon="arrow-left"
            onPress={goBackToExploreFallback}
          />
        </View>

        <AppText variant="eyebrow">Filtros</AppText>
        <AppText variant="hero">Afina el catalogo en segundos</AppText>
        <AppText variant="body">
          Este corte mantiene la demo simple: ciudad, categoria y edad. Los
          cambios viven en un borrador local hasta que pulses aplicar.
        </AppText>
      </SurfaceCard>

      {isLoading ? (
        <CatalogStatePanel
          icon="progress-clock"
          eyebrow="Filtros"
          title="Cargando opciones"
          description="Estamos preparando las opciones del catalogo base para que los filtros se mantengan estables."
        />
      ) : null}

      {!isLoading && error ? (
        <CatalogStatePanel
          icon="alert-circle-outline"
          eyebrow="Filtros"
          title="No pudimos preparar los filtros"
          description={error}
          actionLabel="Reintentar"
          onAction={reload}
        />
      ) : null}

      {!isLoading && !error ? (
        <>
          <FilterSection
            title="Ciudad"
            options={filterOptions.cities}
            selectedValue={draftFilters.city}
            onSelect={(value) => {
              toggleDraftValue("city", value);
            }}
          />

          <FilterSection
            title="Categoria"
            options={filterOptions.categories}
            selectedValue={draftFilters.category}
            onSelect={(value) => {
              toggleDraftValue("category", value);
            }}
          />

          <FilterSection
            title="Edad"
            options={filterOptions.ageBands}
            selectedValue={draftFilters.ageBand}
            onSelect={(value) => {
              toggleDraftValue("ageBand", value);
            }}
          />

          <View style={styles.actionStack}>
            <AppButton
              label="Aplicar"
              icon="arrow-right"
              onPress={handleApply}
            />
            <AppButton
              label="Limpiar"
              variant="secondary"
              icon="filter-remove-outline"
              onPress={handleClearDraft}
            />
          </View>
        </>
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
  sectionCard: {
    gap: nensGoSpacing.md,
  },
  choiceWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
  },
  choiceButton: {
    minHeight: 44,
    paddingHorizontal: nensGoSpacing.lg,
    paddingVertical: nensGoSpacing.md,
    borderRadius: nensGoRadii.pill,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    backgroundColor: nensGoColors.surface,
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.xs,
  },
  choiceButtonSelected: {
    borderColor: nensGoColors.primaryStrong,
    backgroundColor: nensGoColors.primaryStrong,
  },
  choiceButtonPressed: {
    opacity: 0.92,
  },
  choiceLabel: {
    color: nensGoColors.text,
  },
  choiceLabelSelected: {
    color: nensGoColors.surface,
  },
  actionStack: {
    gap: nensGoSpacing.md,
    marginBottom: nensGoSpacing.sm,
  },
});
