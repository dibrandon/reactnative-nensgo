import { useEffect, useState } from "react";

import { mockCatalogRepository } from "@/features/catalog/data/catalogRepository";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";

export function useCatalogActivity(activityId: string) {
  const [activity, setActivity] = useState<CatalogActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadActivity() {
      setIsLoading(true);
      setError(null);

      if (!activityId) {
        setActivity(null);
        setIsLoading(false);
        return;
      }

      try {
        const nextActivity = await mockCatalogRepository.getActivityById(
          activityId,
        );

        if (!cancelled) {
          setActivity(nextActivity);
        }
      } catch (loadError) {
        if (!cancelled) {
          setActivity(null);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No pudimos cargar esta actividad.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadActivity();

    return () => {
      cancelled = true;
    };
  }, [activityId, reloadKey]);

  function reload() {
    setReloadKey((currentValue) => currentValue + 1);
  }

  return {
    activity,
    isLoading,
    error,
    reload,
  };
}
