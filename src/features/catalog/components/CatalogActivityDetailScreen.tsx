import { useLocalSearchParams } from "expo-router";
import { ExploreActivityDetailScreen } from "./ExploreActivityDetailScreen";

type DetailRouteParams = {
  activityId?: string | string[];
};

export function CatalogActivityDetailScreen() {
  const params = useLocalSearchParams<DetailRouteParams>();
  const activityId = Array.isArray(params.activityId)
    ? params.activityId[0] ?? ""
    : params.activityId ?? "";

  return <ExploreActivityDetailScreen activityId={activityId} />;
}
