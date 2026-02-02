"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/property-card';
import { getProperties } from '@/lib/data';
import type { Property, PropertyType } from '@/lib/types';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from '@/components/ui/card';

const allProperties = getProperties();
const locations = [...new Set(allProperties.map(p => p.location))];
const types: PropertyType[] = ['Residential', 'Land', 'Commercial'];
const maxPrice = Math.max(...allProperties.map(p => p.price));

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

function ListingsPageContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') as PropertyType | null;

  const [location, setLocation] = useState('all');
  const [type, setType] = useState<PropertyType | 'all'>(initialType || 'all');
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  useEffect(() => {
    if (initialType) {
      setType(initialType);
    }
  }, [initialType]);

  const filteredProperties = useMemo(() => {
    return allProperties.filter(property => {
      const locationMatch = location === 'all' || property.location === location;
      const typeMatch = type === 'all' || property.type === type;
      const priceMatch = property.price >= priceRange[0] && property.price <= priceRange[1];
      return locationMatch && typeMatch && priceMatch;
    });
  }, [location, type, priceRange]);
  
  const formatPrice = (value: number) => {
    if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(0)}M`;
    return `₦${value.toLocaleString()}`;
  }

  return (
    <div className="bg-white">
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" {...animation}>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">Our Properties</h1>
          <p className="mt-4 text-lg text-muted-foreground">Find your next investment or dream home from our curated listings.</p>
        </motion.div>

        <motion.div {...animation} transition={{...animation.transition, delay: 0.2}}>
          <Card className="mb-12 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <Select value={type} onValueChange={(v) => setType(v as PropertyType | 'all')}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                       {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-1">
                   <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                   <div className="flex justify-between text-sm text-muted-foreground mb-2">
                     <span>{formatPrice(priceRange[0])}</span>
                     <span>{formatPrice(priceRange[1])}</span>
                   </div>
                  <Slider
                    min={0}
                    max={maxPrice}
                    step={1000000}
                    value={[priceRange[1]]}
                    onValueChange={(value) => setPriceRange([priceRange[0], value[0]])}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <motion.div className="text-center py-16" {...animation}>
            <h3 className="text-xl font-semibold text-primary">No Properties Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}


export default function ListingsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ListingsPageContent />
        </Suspense>
    )
}
