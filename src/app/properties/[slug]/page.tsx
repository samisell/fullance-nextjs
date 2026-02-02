import { notFound } from 'next/navigation';
import { getPropertyBySlug, getProperties } from '@/lib/data';
import PropertyDetailClientPage from '@/components/property/property-detail-client-page';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  const properties = getProperties();
  return properties.map(property => ({
    slug: property.slug,
  }));
}

export default function PropertyDetailPage({ params }: Props) {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  const { amenities, ...rest } = property;
  const clientProperty = {
    ...rest,
    amenities: amenities.map(({ name }) => ({ name })),
  };

  return <PropertyDetailClientPage property={clientProperty} />;
}