import { catalogActivityMocks } from "@/features/catalog/data/catalogActivityMocks";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";

export type CatalogRepository = {
  listActivities: () => Promise<CatalogActivity[]>;
  getActivityById: (activityId: string) => Promise<CatalogActivity | null>;
};

export const mockCatalogRepository: CatalogRepository = {
  async listActivities() {
    return catalogActivityMocks;
  },
  async getActivityById(activityId) {
    const matchedActivity =
      catalogActivityMocks.find((activity) => activity.id === activityId) ?? null;

    return matchedActivity;
  },
};
