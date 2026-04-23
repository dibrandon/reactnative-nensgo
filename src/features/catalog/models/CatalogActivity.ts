export type CatalogActivity = {
  id: string;
  title: string;
  categoryLabel?: string;
  description?: string;
  shortDescription?: string;
  imageUrl?: string;
  cityId: string | null;
  cityName: string;
  centerName?: string;
  ageLabel?: string;
  scheduleLabel?: string;
  priceLabel?: string;
  venueName?: string;
  venueAddress?: string;
  isFree?: boolean;
};
