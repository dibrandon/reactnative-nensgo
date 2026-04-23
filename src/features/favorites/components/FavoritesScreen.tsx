import { router } from "expo-router";
import { useMemo } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { useAuthSession } from "@/features/account/hooks/useAuthSession";
import { useCatalogActivities } from "@/features/catalog/hooks/useCatalogActivities";
import { CatalogActivityCard } from "@/features/catalog/components/CatalogActivityCard";
import { CatalogStatePanel } from "@/features/catalog/components/CatalogStatePanel";
import { useRemoteFavorites } from "@/features/favorites/hooks/useRemoteFavorites";
import { nensGoSpacing } from "@/shared/theme/tokens";
import { AppButton } from "@/shared/ui/AppButton";
import { AppText } from "@/shared/ui/AppText";
import { BrandLockup } from "@/shared/ui/BrandLockup";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

function getFavoritesAccessCopy(accessState: ReturnType<typeof useAuthSession>["accessState"]) {
  if (accessState === "verification_pending") {
    return {
      title: "Confirma tu cuenta para abrir favoritos",
      description:
        "Necesitamos una cuenta verificada antes de cargar tus actividades guardadas.",
      actionLabel: "Ir a cuenta",
    };
  }

  if (accessState === "onboarding_required") {
    return {
      title: "Completa tu perfil para abrir favoritos",
      description:
        "La cuenta ya existe, pero falta el perfil minimo de app para recuperar tus favoritos remotos.",
      actionLabel: "Completar perfil",
    };
  }

  if (accessState === "error") {
    return {
      title: "No pudimos preparar tu cuenta",
      description:
        "Accede desde Cuenta para reintentar la preparacion del perfil y recuperar tus favoritos.",
      actionLabel: "Abrir cuenta",
    };
  }

  return {
    title: "Accede para ver tus favoritos",
    description:
      "Los favoritos se guardan en remoto y solo aparecen cuando la cuenta esta lista.",
    actionLabel: "Continuar",
  };
}

export function FavoritesScreen() {
  const { accessState, startProtectedAction } = useAuthSession();
  const { activities, error: catalogError, isLoading: isCatalogLoading, reload } =
    useCatalogActivities();
  const {
    error: favoritesError,
    favoriteIds,
    isFavorite,
    isLoading: isFavoritesLoading,
    isPending,
    reload: reloadFavorites,
    toggleFavorite,
  } = useRemoteFavorites();

  const favoriteActivities = useMemo(() => {
    const activitiesById = new Map(
      activities.map((activity) => [activity.id, activity]),
    );

    return favoriteIds
      .map((favoriteId) => activitiesById.get(favoriteId))
      .filter((activity): activity is NonNullable<typeof activity> =>
        Boolean(activity),
      );
  }, [activities, favoriteIds]);

  const accessCopy = getFavoritesAccessCopy(accessState);
  const hasNoSavedFavorites = favoriteIds.length === 0;
  const hasUnresolvableFavorites =
    !hasNoSavedFavorites && favoriteActivities.length === 0;
  const isPageLoading = isCatalogLoading || isFavoritesLoading;
  const resolvedError = catalogError || favoritesError;

  async function handleToggleFavorite(activityId: string) {
    const result = await toggleFavorite(activityId, {
      returnTo: "/favorites",
    });

    if (result.error) {
      Alert.alert(
        "No pudimos actualizar este favorito",
        result.error.message,
      );
    }
  }

  async function handleOpenProtectedFavorites() {
    await startProtectedAction({
      type: "open_favorites",
      returnTo: "/favorites",
    });
  }

  if (accessState === "loading") {
    return (
      <ScreenContainer>
        <CatalogStatePanel
          icon="progress-clock"
          title="Preparando favoritos"
          description="Estamos comprobando tu cuenta antes de cargar los favoritos remotos."
        />
      </ScreenContainer>
    );
  }

  if (accessState !== "ready") {
    return (
      <ScreenContainer>
        <SurfaceCard style={styles.heroCard}>
          <BrandLockup compact />
          <AppText variant="title">{accessCopy.title}</AppText>
          <AppText variant="body">{accessCopy.description}</AppText>
          <View style={styles.actionStack}>
            <AppButton
              label={accessCopy.actionLabel}
              icon="arrow-right"
              onPress={() => {
                void handleOpenProtectedFavorites();
              }}
            />
            <AppButton
              label="Volver a explorar"
              variant="secondary"
              icon="compass-outline"
              onPress={() => {
                router.replace("/explore");
              }}
            />
          </View>
        </SurfaceCard>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <SurfaceCard style={styles.heroCard}>
        <BrandLockup compact />
        <AppText variant="title">Tus actividades guardadas</AppText>
        <AppText variant="body">
          Revisa con calma las actividades que te interesan y abre su ficha
          completa cuando quieras decidir con mas contexto.
        </AppText>
      </SurfaceCard>

      {isPageLoading ? (
        <CatalogStatePanel
          icon="progress-clock"
          title="Cargando favoritos"
          description="Estamos recuperando tu lista guardada."
        />
      ) : null}

      {!isPageLoading && resolvedError ? (
        <CatalogStatePanel
          icon="alert-circle-outline"
          title="No pudimos cargar tus favoritos"
          description={resolvedError}
          actionLabel="Reintentar"
          onAction={() => {
            reload();
            reloadFavorites();
          }}
        />
      ) : null}

      {!isPageLoading && !resolvedError && hasNoSavedFavorites ? (
        <CatalogStatePanel
          icon="heart-outline"
          title="Todavia no has guardado actividades"
          description="Usa el corazon del catalogo para recuperar aqui las opciones que quieras revisar mas tarde."
          actionLabel="Explorar actividades"
          onAction={() => {
            router.replace("/explore");
          }}
        />
      ) : null}

      {!isPageLoading && !resolvedError && hasUnresolvableFavorites ? (
        <CatalogStatePanel
          icon="magnify-close"
          title="Tus favoritos ya no estan disponibles"
          description="Las actividades guardadas no se pueden resolver desde el catalogo actual. Vuelve a explorar para guardar nuevas opciones."
          actionLabel="Explorar actividades"
          onAction={() => {
            router.replace("/explore");
          }}
        />
      ) : null}

      {!isPageLoading && !resolvedError && favoriteActivities.length > 0 ? (
        <View style={styles.cardGrid}>
          {favoriteActivities.map((activity) => (
            <View key={activity.id} style={styles.cardGridItem}>
              <CatalogActivityCard
                activity={activity}
                isFavorite={isFavorite(activity.id)}
                isFavoritePending={isPending(activity.id)}
                onPress={() => {
                  router.push(`/favorites/${activity.id}` as never);
                }}
                onToggleFavorite={() => {
                  void handleToggleFavorite(activity.id);
                }}
              />
            </View>
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
  actionStack: {
    gap: nensGoSpacing.md,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    rowGap: nensGoSpacing.md,
  },
  cardGridItem: {
    width: "48.2%",
    alignSelf: "flex-start",
  },
});
