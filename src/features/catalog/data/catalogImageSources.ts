import type { ImageSourcePropType } from "react-native";

const fallbackCatalogImage = require("../../../../assets/images/nensgo-mark.png");

export function resolveCatalogImageSource(
  imageUrl?: string,
): ImageSourcePropType {
  if (!imageUrl) {
    return fallbackCatalogImage;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return { uri: imageUrl };
  }

  return fallbackCatalogImage;
}
