import { router } from "expo-router";

export function goBackToExploreFallback() {
  if (router.canGoBack()) {
    router.back();
    return;
  }

  router.replace("/explore");
}
