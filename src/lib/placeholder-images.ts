import imageData from './placeholder-images.json';

export type PlaceholderImage = {
  id: string;
  alt: string;
  url: string;
  hint: string;
};

export const placeholderImages: PlaceholderImage[] = imageData.images;

export const findImage = (id: string): PlaceholderImage | undefined => {
  return placeholderImages.find(img => img.id === id);
};
