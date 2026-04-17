import { Stack } from "expo-router";

import { CatalogExploreProvider } from "@/features/catalog/hooks/useCatalogExplore";

export default function ExploreLayout() {
  return (
    <CatalogExploreProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="filters" />
        <Stack.Screen name="[activityId]" />
      </Stack>
    </CatalogExploreProvider>
  );
}
