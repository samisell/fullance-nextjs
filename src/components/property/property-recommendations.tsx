"use client";

import { useEffect, useState } from "react";
import { getPersonalizedPropertyRecommendations } from "@/ai/flows/property-recommendations";
import { getProperties, type Property } from "@/lib/data";
import PropertyCard from "@/components/property-card";
import { Skeleton } from "@/components/ui/skeleton";

type PropertyRecommendationsProps = {
  currentProperty: Property;
};

const allProperties = getProperties();

export default function PropertyRecommendations({ currentProperty }: PropertyRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        setError(null);

        const availableProperties = allProperties.filter(p => p.id !== currentProperty.id);
        const input = {
          userViewingHistory: [currentProperty.name],
          userPreferences: "I'm looking for a premium property with modern design and good investment potential.",
          allPropertyNames: availableProperties.map(p => p.name),
        };

        const result = await getPersonalizedPropertyRecommendations(input);
        
        const recommendedProperties = result.recommendedProperties
          .map(name => allProperties.find(p => p.name === name))
          .filter((p): p is Property => p !== undefined);

        setRecommendations(recommendedProperties);
      } catch (e) {
        console.error("Failed to get property recommendations:", e);
        setError("Could not load recommendations at this time.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [currentProperty]);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        You Might Also Like
      </h2>
      
      {loading && (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-56 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="mt-8 text-muted-foreground">{error}</p>
      )}

      {!loading && !error && recommendations.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {!loading && !error && recommendations.length === 0 && (
         <p className="mt-8 text-muted-foreground">No similar properties found at the moment.</p>
      )}
    </div>
  );
}
