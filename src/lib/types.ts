export type PropertyType = 'Land' | 'Residential' | 'Commercial';

export type Amenity = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Property = {
  id: string;
  slug: string;
  name: string;
  location: string;
  type: PropertyType;
  price: number;
  priceFormatted: string;
  paymentPlan: string;
  size: string;
  titleType: string;
  description: string;
  shortDescription: string;
  thumbnailId: string;
  imageIds: string[];
  amenities: Amenity[];
};
