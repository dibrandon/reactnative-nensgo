import { catalogActivityMocks } from "@/features/catalog/data/catalogActivityMocks";
import type { CatalogActivity } from "@/features/catalog/models/CatalogActivity";

export type CatalogRepository = {
  listActivities: () => Promise<CatalogActivity[]>;
};

export const mockCatalogRepository: CatalogRepository = {
  async listActivities() {
    return catalogActivityMocks;
  },
};
