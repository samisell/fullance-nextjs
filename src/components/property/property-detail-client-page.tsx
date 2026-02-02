"use client";

import Link from 'next/link';
import type { Property } from '@/lib/types';
import PropertyDetailsGallery from '@/components/property/property-details-gallery';
import PropertyRecommendations from '@/components/property/property-recommendations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Tag, Landmark, Ruler } from 'lucide-react';
import { motion } from "framer-motion";

type Props = {
  property: Property;
};

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};


export default function PropertyDetailClientPage({ property }: Props) {
  const keyDetails = [
    { icon: MapPin, label: 'Location', value: property.location },
    { icon: Landmark, label: 'Title Type', value: property.titleType },
    { icon: Ruler, label: 'Property Size', value: property.size },
    { icon: Tag, label: 'Price / Plan', value: `${property.priceFormatted} (${property.paymentPlan})` },
  ];

  return (
    <div className="bg-white">
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div {...animation}>
            <PropertyDetailsGallery imageIds={property.imageIds} propertyName={property.name} />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <motion.div className="lg:col-span-2" {...animation} transition={{...animation.transition, delay: 0.2}}>
            <Badge variant="secondary" className="mb-2">{property.type}</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">{property.name}</h1>
            <p className="mt-6 text-lg text-muted-foreground">{property.description}</p>
            
            {property.amenities.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-primary">Amenities</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {property.amenities.map(({ icon: Icon, name }, index) => (
                    <motion.div 
                        key={name} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Icon className="h-5 w-5 text-accent mr-3" />
                      <span className="text-sm font-medium text-foreground">{name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div className="lg:col-span-1 space-y-6" {...animation} transition={{...animation.transition, delay: 0.4}}>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-primary">Key Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {keyDetails.map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-start">
                      <Icon className="h-5 w-5 text-muted-foreground mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <span className="block text-sm font-semibold text-foreground">{label}</span>
                        <span className="block text-sm text-muted-foreground">{value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-secondary/70 shadow-xl">
              <CardContent className="p-6 text-center">
                 <h3 className="text-lg font-semibold text-primary">Interested in this property?</h3>
                 <div className="mt-4 flex flex-col gap-3">
                    <Button asChild size="lg">
                      <Link href="/book-inspection">Book Inspection</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/subscribe">Subscribe / Enquire</Link>
                    </Button>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <PropertyRecommendations currentProperty={property} />

      </div>
    </div>
  );
}
