import { useEffect, useState } from "react";

import { listActivityContactOptions } from "@/features/catalog/data/activityContactOptionsRepository";
import type { ActivityContactOption } from "@/features/catalog/models/ActivityContactOption";

export function useActivityContactOptions(activityId: string, enabled = true) {
  const [contactOptions, setContactOptions] = useState<ActivityContactOption[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!enabled || !activityId) {
      setContactOptions([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function loadActivityContactOptions() {
      setIsLoading(true);
      setError(null);

      try {
        const nextContactOptions = await listActivityContactOptions(activityId);

        if (!cancelled) {
          setContactOptions(nextContactOptions);
        }
      } catch (loadError) {
        if (!cancelled) {
          setContactOptions([]);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No pudimos cargar las opciones de contacto.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadActivityContactOptions();

    return () => {
      cancelled = true;
    };
  }, [activityId, enabled, reloadKey]);

  function reload() {
    setReloadKey((currentValue) => currentValue + 1);
  }

  return {
    contactOptions,
    isLoading,
    error,
    reload,
  };
}
