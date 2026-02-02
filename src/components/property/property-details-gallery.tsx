"use client";

import Image from 'next/image';
import { useState } from 'react';
import { findImage, type PlaceholderImage } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type PropertyDetailsGalleryProps = {
  imageIds: string[];
  propertyName: string;
};

export default function PropertyDetailsGallery({ imageIds, propertyName }: PropertyDetailsGalleryProps) {
  const images = imageIds.map(id => findImage(id)).filter(Boolean) as PlaceholderImage[];
  const [mainImage, setMainImage] = useState(images[0] || null);

  if (!images.length) return null;

  return (
    <div>
      <Card className="overflow-hidden mb-4">
        <CardContent className="p-0">
          <div className="aspect-video relative">
            {mainImage && (
              <Image
                src={mainImage.url}
                alt={`${propertyName} main view`}
                fill
                className="object-cover transition-opacity duration-300"
                data-ai-hint={mainImage.hint}
                priority
              />
            )}
          </div>
        </CardContent>
      </Card>
      
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="-ml-2">
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/5 pl-2">
              <Card 
                className={cn(
                  "overflow-hidden cursor-pointer transition-all border-2",
                  mainImage.id === image.id ? "border-primary" : "border-transparent hover:border-primary/50"
                )}
                onClick={() => setMainImage(image)}
              >
                <CardContent className="p-0 aspect-square relative">
                  <Image
                    src={image.url}
                    alt={`${propertyName} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    data-ai-hint={image.hint}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
