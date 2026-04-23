import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuthSession } from "@/features/account/hooks/useAuthSession";
import type { ProtectedIntent } from "@/features/account/models/ProtectedIntent";
import {
  getSupabaseClient,
  getSupabaseClientError,
} from "@/shared/lib/supabase/supabaseClient";

type FavoriteToggleResult = {
  error: Error | null;
  reason?: "auth_required" | "profile_required";
};

type RemoteFavoritesContextValue = {
  error: string | null;
  favoriteIds: string[];
  isFavorite: (activityId: string) => boolean;
  isLoading: boolean;
  isPending: (activityId: string) => boolean;
  reload: () => void;
  toggleFavorite: (
    activityId: string,
    options?: { returnTo?: string },
  ) => Promise<FavoriteToggleResult>;
};

const RemoteFavoritesContext =
  createContext<RemoteFavoritesContextValue | null>(null);

function normalizeFavoriteId(activityId: string | number | null | undefined) {
  if (activityId === null || activityId === undefined) {
    return "";
  }

  return String(activityId);
}

function buildProtectedFavoriteIntent(
  activityId: string,
  returnTo?: string,
): ProtectedIntent {
  return {
    type: "toggle_favorite",
    activityId,
    returnTo,
  };
}

export function RemoteFavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    accessState,
    appUser,
    consumeResolvedIntent,
    resolvedIntent,
    startProtectedAction,
  } = useAuthSession();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  const loadFavorites = useCallback(async () => {
    if (accessState !== "ready" || !appUser?.id) {
      setFavoriteIds([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const supabase = getSupabaseClient();

    if (!supabase) {
      setFavoriteIds([]);
      setError(
        getSupabaseClientError() ||
          "No pudimos conectar con Supabase para cargar favoritos.",
      );
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error: loadError } = await supabase
      .from("user_favorite_activities")
      .select("activity_id")
      .eq("user_profile_id", appUser.id)
      .order("created_at", { ascending: false });

    if (loadError) {
      setFavoriteIds([]);
      setError(loadError.message || "No pudimos cargar tus favoritos remotos.");
      setIsLoading(false);
      return;
    }

    setFavoriteIds(
      ((data ?? []) as { activity_id: number }[])
        .map((favoriteRow) => normalizeFavoriteId(favoriteRow.activity_id))
        .filter(Boolean),
    );
    setIsLoading(false);
  }, [accessState, appUser?.id]);

  useEffect(() => {
    void loadFavorites();
  }, [loadFavorites, reloadKey]);

  const applyToggleFavorite = useCallback(
    async (activityId: string): Promise<FavoriteToggleResult> => {
      const normalizedActivityId = normalizeFavoriteId(activityId);

      if (!normalizedActivityId) {
        return {
          error: new Error("La actividad seleccionada no es valida."),
        };
      }

      if (accessState !== "ready" || !appUser?.id) {
        return {
          error: null,
          reason: "profile_required",
        };
      }

      const supabase = getSupabaseClient();

      if (!supabase) {
        const resolvedError = new Error(
          getSupabaseClientError() ||
            "No pudimos conectar con Supabase para cambiar favoritos.",
        );
        setError(resolvedError.message);
        return { error: resolvedError };
      }

      setPendingIds((currentPendingIds) =>
        currentPendingIds.includes(normalizedActivityId)
          ? currentPendingIds
          : [...currentPendingIds, normalizedActivityId],
      );
      setError(null);

      const isCurrentlyFavorite = favoriteIds.includes(normalizedActivityId);

      if (isCurrentlyFavorite) {
        const { error: deleteError } = await supabase
          .from("user_favorite_activities")
          .delete()
          .eq("user_profile_id", appUser.id)
          .eq("activity_id", Number(normalizedActivityId));

        setPendingIds((currentPendingIds) =>
          currentPendingIds.filter(
            (pendingId) => pendingId !== normalizedActivityId,
          ),
        );

        if (deleteError) {
          setError(deleteError.message || "No pudimos quitar este favorito.");
          return {
            error: new Error(
              deleteError.message || "No pudimos quitar este favorito.",
            ),
          };
        }

        setFavoriteIds((currentFavoriteIds) =>
          currentFavoriteIds.filter(
            (favoriteId) => favoriteId !== normalizedActivityId,
          ),
        );

        return { error: null };
      }

      const { error: insertError } = await supabase
        .from("user_favorite_activities")
        .insert({
          user_profile_id: appUser.id,
          activity_id: Number(normalizedActivityId),
        });

      setPendingIds((currentPendingIds) =>
        currentPendingIds.filter(
          (pendingId) => pendingId !== normalizedActivityId,
        ),
      );

      if (insertError) {
        setError(insertError.message || "No pudimos guardar este favorito.");
        return {
          error: new Error(
            insertError.message || "No pudimos guardar este favorito.",
          ),
        };
      }

      setFavoriteIds((currentFavoriteIds) =>
        currentFavoriteIds.includes(normalizedActivityId)
          ? currentFavoriteIds
          : [normalizedActivityId, ...currentFavoriteIds],
      );

      return { error: null };
    },
    [accessState, appUser?.id, favoriteIds],
  );

  useEffect(() => {
    if (resolvedIntent?.type !== "toggle_favorite" || !resolvedIntent.activityId) {
      return;
    }

    consumeResolvedIntent();
    void applyToggleFavorite(resolvedIntent.activityId);
  }, [applyToggleFavorite, consumeResolvedIntent, resolvedIntent]);

  const toggleFavorite = useCallback(
    async (
      activityId: string,
      options?: { returnTo?: string },
    ): Promise<FavoriteToggleResult> => {
      const normalizedActivityId = normalizeFavoriteId(activityId);

      if (!normalizedActivityId) {
        return {
          error: new Error("La actividad seleccionada no es valida."),
        };
      }

      if (accessState === "anonymous" || accessState === "verification_pending") {
        await startProtectedAction(
          buildProtectedFavoriteIntent(
            normalizedActivityId,
            options?.returnTo,
          ),
        );

        return {
          error: null,
          reason: "auth_required",
        };
      }

      if (accessState !== "ready" || !appUser?.id) {
        await startProtectedAction(
          buildProtectedFavoriteIntent(
            normalizedActivityId,
            options?.returnTo,
          ),
        );

        return {
          error: null,
          reason: "profile_required",
        };
      }

      return applyToggleFavorite(normalizedActivityId);
    },
    [accessState, appUser?.id, applyToggleFavorite, startProtectedAction],
  );

  const reload = useCallback(() => {
    setReloadKey((currentValue) => currentValue + 1);
  }, []);

  const value = useMemo<RemoteFavoritesContextValue>(
    () => ({
      error,
      favoriteIds,
      isFavorite: (activityId: string) =>
        favoriteIds.includes(normalizeFavoriteId(activityId)),
      isLoading,
      isPending: (activityId: string) =>
        pendingIds.includes(normalizeFavoriteId(activityId)),
      reload,
      toggleFavorite,
    }),
    [error, favoriteIds, isLoading, pendingIds, reload, toggleFavorite],
  );

  return (
    <RemoteFavoritesContext.Provider value={value}>
      {children}
    </RemoteFavoritesContext.Provider>
  );
}

export function useRemoteFavorites() {
  const context = useContext(RemoteFavoritesContext);

  if (!context) {
    throw new Error(
      "useRemoteFavorites must be used within RemoteFavoritesProvider.",
    );
  }

  return context;
}
