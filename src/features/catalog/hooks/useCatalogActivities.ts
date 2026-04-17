import { useEffect, useState } from "react";

import { mockCatalogRepository } from "@/features/catalog/data/catalogRepository";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";

export function useCatalogActivities() {
  const [activities, setActivities] = useState<CatalogActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadActivities() {
      setIsLoading(true);
      setError(null);

      try {
        const nextActivities = await mockCatalogRepository.listActivities();

        if (!cancelled) {
          setActivities(nextActivities);
        }
      } catch (loadError) {
        if (!cancelled) {
          setActivities([]);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No pudimos cargar el catalogo mock.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  function reload() {
    setReloadKey((currentValue) => currentValue + 1);
  }

  return {
    activities,
    isLoading,
    error,
    reload,
  };
}
