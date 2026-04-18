import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  emptyCatalogExploreFilters,
  getFilterOptions,
  matchesFilters,
  matchesSearch,
  type CatalogExploreFilters,
} from "@/features/catalog/helpers/catalogExplore";
import { useCatalogActivities } from "@/features/catalog/hooks/useCatalogActivities";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";

type CatalogExploreContextValue = {
  allActivities: CatalogActivity[];
  visibleActivities: CatalogActivity[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
  searchQuery: string;
  appliedFilters: CatalogExploreFilters;
  setSearchQuery: (nextQuery: string) => void;
  setAppliedFilters: (nextFilters: CatalogExploreFilters) => void;
  clearFilters: () => void;
  clearSearch: () => void;
  clearAllExploreState: () => void;
  resultsCount: number;
  activeFilterCount: number;
  hasActiveFilters: boolean;
  hasSearchQuery: boolean;
  hasAnyExploreConstraint: boolean;
  isFavorite: (activityId: string) => boolean;
  toggleFavorite: (activityId: string) => void;
  filterOptions: ReturnType<typeof getFilterOptions>;
};

const CatalogExploreContext = createContext<CatalogExploreContextValue | null>(
  null,
);

export function CatalogExploreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { activities, isLoading, error, reload } = useCatalogActivities();
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<CatalogExploreFilters>(
    emptyCatalogExploreFilters,
  );
  const [favoriteActivityIds, setFavoriteActivityIds] = useState<string[]>([]);

  const filterOptions = useMemo(
    () => getFilterOptions(activities),
    [activities],
  );

  const visibleActivities = useMemo(
    () =>
      activities.filter(
        (activity) =>
          matchesSearch(activity, searchQuery) &&
          matchesFilters(activity, appliedFilters),
      ),
    [activities, appliedFilters, searchQuery],
  );

  const activeFilterCount = useMemo(
    () => Object.values(appliedFilters).filter(Boolean).length,
    [appliedFilters],
  );

  const hasActiveFilters = activeFilterCount > 0;
  const hasSearchQuery = searchQuery.trim().length > 0;

  const value = useMemo<CatalogExploreContextValue>(
    () => ({
      allActivities: activities,
      visibleActivities,
      isLoading,
      error,
      reload,
      searchQuery,
      appliedFilters,
      setSearchQuery,
      setAppliedFilters,
      clearFilters: () => {
        setAppliedFilters(emptyCatalogExploreFilters);
      },
      clearSearch: () => {
        setSearchQuery("");
      },
      clearAllExploreState: () => {
        setAppliedFilters(emptyCatalogExploreFilters);
        setSearchQuery("");
      },
      resultsCount: visibleActivities.length,
      activeFilterCount,
      hasActiveFilters,
      hasSearchQuery,
      hasAnyExploreConstraint: hasActiveFilters || hasSearchQuery,
      isFavorite: (activityId: string) =>
        favoriteActivityIds.includes(activityId),
      toggleFavorite: (activityId: string) => {
        setFavoriteActivityIds((current) =>
          current.includes(activityId)
            ? current.filter((id) => id !== activityId)
            : [...current, activityId],
        );
      },
      filterOptions,
    }),
    [
      activities,
      visibleActivities,
      isLoading,
      error,
      reload,
      searchQuery,
      appliedFilters,
      activeFilterCount,
      hasActiveFilters,
      hasSearchQuery,
      favoriteActivityIds,
      filterOptions,
    ],
  );

  return (
    <CatalogExploreContext.Provider value={value}>
      {children}
    </CatalogExploreContext.Provider>
  );
}

export function useCatalogExplore() {
  const context = useContext(CatalogExploreContext);

  if (!context) {
    throw new Error(
      "useCatalogExplore must be used within CatalogExploreProvider.",
    );
  }

  return context;
}
