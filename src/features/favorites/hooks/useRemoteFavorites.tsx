import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuthSession } from "@/features/account/hooks/useAuthSession";
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
  toggleFavorite: (activityId: string) => Promise<FavoriteToggleResult>;
};

const RemoteFavoritesContext =
  createContext<RemoteFavoritesContextValue | null>(null);

function normalizeFavoriteId(activityId: string | number | null | undefined) {
  if (activityId === null || activityId === undefined) {
    return "";
  }

  return String(activityId);
}

export function RemoteFavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { accessState, appUser } = useAuthSession();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<string[]>([]);

  useEffect(() => {
    if (accessState !== "ready" || !appUser?.id) {
      setFavoriteIds([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const userProfileId = appUser.id;

    async function loadFavorites() {
      const supabase = getSupabaseClient();

      if (!supabase) {
        if (!cancelled) {
          setFavoriteIds([]);
          setError(
            getSupabaseClientError() ||
              "No pudimos conectar con Supabase para cargar favoritos.",
          );
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      const { data, error: loadError } = await supabase
        .from("user_favorite_activities")
        .select("activity_id")
        .eq("user_profile_id", userProfileId)
        .order("created_at", { ascending: false });

      if (cancelled) {
        return;
      }

      if (loadError) {
        setFavoriteIds([]);
        setError(
          loadError.message || "No pudimos cargar tus favoritos remotos.",
        );
        setIsLoading(false);
        return;
      }

      setFavoriteIds(
        ((data ?? []) as { activity_id: number }[])
          .map((favoriteRow) => normalizeFavoriteId(favoriteRow.activity_id))
          .filter(Boolean),
      );
      setIsLoading(false);
    }

    void loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [accessState, appUser?.id]);

  async function toggleFavorite(activityId: string): Promise<FavoriteToggleResult> {
    const normalizedActivityId = normalizeFavoriteId(activityId);

    if (!normalizedActivityId) {
      return {
        error: new Error("La actividad seleccionada no es valida."),
      };
    }

    if (accessState === "anonymous" || accessState === "verification_pending") {
      return {
        error: null,
        reason: "auth_required",
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
      currentPendingIds.filter((pendingId) => pendingId !== normalizedActivityId),
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
  }

  const value = useMemo<RemoteFavoritesContextValue>(
    () => ({
      error,
      favoriteIds,
      isFavorite: (activityId: string) =>
        favoriteIds.includes(normalizeFavoriteId(activityId)),
      isLoading,
      isPending: (activityId: string) =>
        pendingIds.includes(normalizeFavoriteId(activityId)),
      toggleFavorite,
    }),
    [error, favoriteIds, isLoading, pendingIds],
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
