import type { ImageSourcePropType } from "react-native";

const fallbackCatalogImage = require("../../../../assets/images/nensgo-mark.png");

const catalogImageSourceByPath: Record<string, ImageSourcePropType> = {
  "/images/free-family-workshop.jpg": require("../../../../assets/images/catalog/free-family-workshop.jpg"),
  "/images/hockey.jpg": require("../../../../assets/images/catalog/hockey.jpg"),
  "/images/painting.jpg": require("../../../../assets/images/catalog/painting.jpg"),
  "/images/swimming.jpg": require("../../../../assets/images/catalog/swimming.jpg"),
  "/images/theater.jpg": require("../../../../assets/images/catalog/theater.jpg"),
  "/images/tutoring.jpg": require("../../../../assets/images/catalog/tutoring.jpg"),
  "/images/yoga.jpg": require("../../../../assets/images/catalog/yoga.jpg"),
};

export function resolveCatalogImageSource(
  imageUrl?: string,
): ImageSourcePropType {
  if (!imageUrl) {
    return fallbackCatalogImage;
  }

  return catalogImageSourceByPath[imageUrl] ?? fallbackCatalogImage;
}
