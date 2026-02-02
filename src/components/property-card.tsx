"use client";
import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/lib/types';
import { findImage } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

type PropertyCardProps = {
  property: Property;
};

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const image = findImage(property.thumbnailId);

  return (
    <motion.div {...animation} className="h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl shadow-lg">
        <CardHeader className="relative h-56 w-full p-0">
          {image && (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              data-ai-hint={image.hint}
            />
          )}
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Badge variant="secondary" className="mb-2">{property.type}</Badge>
          <CardTitle className="text-lg font-bold text-primary">
            <Link href={`/properties/${property.slug}`} className="hover:underline">
              {property.name}
            </Link>
          </CardTitle>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-4 w-4" />
            <span>{property.location}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full bg-accent hover:bg-accent/90">
            <Link href={`/properties/${property.slug}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
