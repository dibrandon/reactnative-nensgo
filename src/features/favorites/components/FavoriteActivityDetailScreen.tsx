import { router, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";

import { useAuthSession } from "@/features/account/hooks/useAuthSession";
import { CatalogActivityDetailContent } from "@/features/catalog/components/CatalogActivityDetailContent";
import { CatalogStatePanel } from "@/features/catalog/components/CatalogStatePanel";
import { useCatalogActivity } from "@/features/catalog/hooks/useCatalogActivity";
import { useActivityContactOptions } from "@/features/catalog/hooks/useActivityContactOptions";
import { useRemoteFavorites } from "@/features/favorites/hooks/useRemoteFavorites";
import { AppButton } from "@/shared/ui/AppButton";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";

type DetailRouteParams = {
  activityId?: string | string[];
};

export function FavoriteActivityDetailScreen() {
  const params = useLocalSearchParams<DetailRouteParams>();
  const activityId = Array.isArray(params.activityId)
    ? params.activityId[0] ?? ""
    : params.activityId ?? "";
  const { accessState, startProtectedAction } = useAuthSession();
  const { activity, error, isLoading, reload } = useCatalogActivity(activityId);
  const { favoriteIds, isFavorite, isPending, toggleFavorite } =
    useRemoteFavorites();
  const isSavedFavorite = favoriteIds.includes(activityId);
  const {
    contactOptions,
    error: contactError,
    isLoading: isContactLoading,
    reload: reloadContactOptions,
  } = useActivityContactOptions(
    activity?.id ?? "",
    Boolean(activity && isSavedFavorite && accessState === "ready"),
  );

  async function handleAccessFavorites() {
    await startProtectedAction({
      type: "open_favorites",
      returnTo: "/favorites",
    });
  }

  async function handleToggleFavorite() {
    if (!activity) {
      return;
    }

    const wasFavorite = isFavorite(activity.id);
    const result = await toggleFavorite(activity.id, {
      returnTo: `/favorites/${activity.id}`,
    });

    if (result.error) {
      Alert.alert(
        "No pudimos actualizar este favorito",
        result.error.message,
      );
      return;
    }

    if (wasFavorite) {
      router.replace("/favorites" as never);
    }
  }

  if (accessState === "loading") {
    return (
      <ScreenContainer>
        <CatalogStatePanel
          icon="progress-clock"
          title="Preparando favoritos"
          description="Estamos comprobando tu cuenta antes de abrir esta ficha."
        />
      </ScreenContainer>
    );
  }

  if (accessState !== "ready") {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a favoritos"
          variant="secondary"
          icon="arrow-left"
          onPress={() => {
            router.replace("/favorites" as never);
          }}
        />
        <CatalogStatePanel
          icon="account-circle-outline"
          title="Necesitas una cuenta lista para abrir favoritos"
          description="Continua desde Cuenta para recuperar esta ficha guardada."
          actionLabel="Ir a cuenta"
          onAction={() => {
            void handleAccessFavorites();
          }}
        />
      </ScreenContainer>
    );
  }

  if (isLoading) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a favoritos"
          variant="secondary"
          icon="arrow-left"
          onPress={() => {
            router.replace("/favorites" as never);
          }}
        />
        <CatalogStatePanel
          icon="progress-clock"
          title="Cargando la actividad"
          description="Estamos preparando la ficha guardada."
        />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a favoritos"
          variant="secondary"
          icon="arrow-left"
          onPress={() => {
            router.replace("/favorites" as never);
          }}
        />
        <CatalogStatePanel
          icon="alert-circle-outline"
          title="No pudimos cargar esta actividad"
          description={error}
          actionLabel="Reintentar"
          onAction={reload}
        />
      </ScreenContainer>
    );
  }

  if (!activity && isSavedFavorite) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a favoritos"
          variant="secondary"
          icon="arrow-left"
          onPress={() => {
            router.replace("/favorites" as never);
          }}
        />
        <CatalogStatePanel
          icon="magnify-close"
          title="Esta actividad ya no esta disponible"
          description="La actividad sigue guardada, pero no hemos podido recuperarla desde el catalogo actual."
          actionLabel="Volver a favoritos"
          onAction={() => {
            router.replace("/favorites" as never);
          }}
        />
      </ScreenContainer>
    );
  }

  if (!activity) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a favoritos"
          variant="secondary"
          icon="arrow-left"
          onPress={() => {
            router.replace("/favorites" as never);
          }}
        />
        <CatalogStatePanel
          icon="magnify-close"
          title="No encontramos esta actividad"
          description="Vuelve a favoritos para seguir revisando tus actividades guardadas."
          actionLabel="Volver a favoritos"
          onAction={() => {
            router.replace("/favorites" as never);
          }}
        />
      </ScreenContainer>
    );
  }

  if (!isSavedFavorite) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a favoritos"
          variant="secondary"
          icon="arrow-left"
          onPress={() => {
            router.replace("/favorites" as never);
          }}
        />
        <CatalogStatePanel
          icon="heart-outline"
          title="Esta actividad ya no esta en tus favoritos"
          description="Vuelve a la lista para revisar las actividades que todavia tienes guardadas."
          actionLabel="Volver a favoritos"
          onAction={() => {
            router.replace("/favorites" as never);
          }}
        />
      </ScreenContainer>
    );
  }

  return (
    <CatalogActivityDetailContent
      activity={activity}
      backLabel="Volver a favoritos"
      contactError={contactError}
      contactOptions={contactOptions}
      isContactLoading={isContactLoading}
      isFavorite={isFavorite(activity.id)}
      isFavoritePending={isPending(activity.id)}
      onBack={() => {
        router.replace("/favorites" as never);
      }}
      onReloadContactOptions={reloadContactOptions}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
