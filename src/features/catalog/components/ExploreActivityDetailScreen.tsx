import { Alert } from "react-native";

import { useRemoteFavorites } from "@/features/favorites/hooks/useRemoteFavorites";
import { goBackToExploreFallback } from "@/features/catalog/helpers/catalogNavigation";
import { useCatalogActivity } from "@/features/catalog/hooks/useCatalogActivity";
import { useActivityContactOptions } from "@/features/catalog/hooks/useActivityContactOptions";

import { CatalogActivityDetailContent } from "./CatalogActivityDetailContent";
import { CatalogStatePanel } from "./CatalogStatePanel";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { AppButton } from "@/shared/ui/AppButton";

export function ExploreActivityDetailScreen({
  activityId,
}: {
  activityId: string;
}) {
  const { activity, error, isLoading, reload } = useCatalogActivity(activityId);
  const {
    contactOptions,
    error: contactError,
    isLoading: isContactLoading,
    reload: reloadContactOptions,
  } = useActivityContactOptions(activity?.id ?? "", Boolean(activity));
  const { isFavorite, isPending, toggleFavorite } = useRemoteFavorites();

  async function handleToggleFavorite() {
    if (!activity) {
      return;
    }

    const result = await toggleFavorite(activity.id, {
      returnTo: `/explore/${activity.id}`,
    });

    if (result.error) {
      Alert.alert(
        "No pudimos cambiar este favorito",
        result.error.message,
      );
    }
  }

  if (isLoading) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a explorar"
          variant="secondary"
          icon="arrow-left"
          onPress={goBackToExploreFallback}
        />
        <CatalogStatePanel
          icon="progress-clock"
          title="Cargando la actividad"
          description="Estamos preparando la ficha completa."
        />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a explorar"
          variant="secondary"
          icon="arrow-left"
          onPress={goBackToExploreFallback}
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

  if (!activity) {
    return (
      <ScreenContainer>
        <AppButton
          label="Volver a explorar"
          variant="secondary"
          icon="arrow-left"
          onPress={goBackToExploreFallback}
        />
        <CatalogStatePanel
          icon="magnify-close"
          title="No encontramos esta actividad"
          description="Vuelve al catalogo para seguir explorando."
          actionLabel="Ir al catalogo"
          onAction={goBackToExploreFallback}
        />
      </ScreenContainer>
    );
  }

  return (
    <CatalogActivityDetailContent
      activity={activity}
      backLabel="Volver a explorar"
      contactError={contactError}
      contactOptions={contactOptions}
      isContactLoading={isContactLoading}
      isFavorite={isFavorite(activity.id)}
      isFavoritePending={isPending(activity.id)}
      onBack={goBackToExploreFallback}
      onReloadContactOptions={reloadContactOptions}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
