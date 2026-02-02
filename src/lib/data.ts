import type { Property } from './types';
import {
  Landmark,
  ShieldCheck,
  Building2,
  Home,
  Waves,
  DollarSign,
  Ruler,
  Car,
  Droplets,
  Zap,
  Sprout,
  Key,
} from 'lucide-react';

export const properties: Property[] = [
  {
    id: '1',
    slug: 'fullance-court-estate-phase-1',
    name: 'Fullance Court Estate Phase 1',
    location: 'Ibeju-Lekki, Lagos',
    type: 'Land',
    price: 35000000,
    priceFormatted: 'From ₦20,000,000',
    paymentPlan: 'Up to 12 months',
    size: '300sqm & 500sqm plots',
    titleType: 'Government Gazette',
    description:
      'Fullance Court Estate Phase 1 is more than just a residential estate—it’s a promise of balance, growth, and opportunity. Located in one of Lagos’ fastest-growing corridors, this estate is ideal for forward-thinking investors looking for high ROI.\n\nPricing:\n- 500sqm – ₦35M\n- 300sqm – ₦20M\n\nAn initial deposit of ₦3M is required, with flexible payment plans up to 12 months. Infrastructural Fees – ₦1.5M.',
    shortDescription: 'Prime plots in a fast-growing corridor, ideal for investors.',
    thumbnailId: 'prop-2-thumb',
    imageIds: ['prop-2-thumb', 'gallery-2-1', 'gallery-2-2', 'prop-7-thumb'],
    amenities: [
      { name: 'Perimeter Fencing', icon: Landmark },
      { name: 'Gated Community', icon: Key },
      { name: 'Manned Security', icon: ShieldCheck },
      { name: 'Drainage System', icon: Waves },
      { name: 'Good Road Network', icon: Car },
    ],
  },
  {
    id: '2',
    slug: 'camp-david-estate-karsana',
    name: 'Camp David Estate',
    location: 'Karsana, Abuja',
    type: 'Residential',
    price: 70000000,
    priceFormatted: 'From ₦70,000,000',
    paymentPlan: '4-6 months',
    size: '3-Bed Flats & 4-Bed Duplexes',
    titleType: 'Government Allocation',
    description:
      'Step into possibility at Camp David Estate, Karsana. This estate gives you the opportunity to create your perfect home with semi-finished units, offering creative control while securing a prime address at today’s price.\n\nAvailable units are delivered excluding finishes like cabling, plumbing fixtures, tiling, doors, and painting, allowing for full customization.\n\nPricing:\n- 3-Bed Middle Units: ₦70M\n- 3-Bed Corner/End Units: ₦75M',
    shortDescription: 'Semi-finished residential units with creative control.',
    thumbnailId: 'prop-8-thumb',
    imageIds: ['prop-8-thumb', 'prop-4-thumb', 'gallery-1-2', 'prop-1-thumb'],
    amenities: [
      { name: 'Gated Community', icon: Key },
      { name: 'Secure Title', icon: ShieldCheck },
      { name: 'Semi-finished Units', icon: Home },
    ],
  },
  {
    id: '3',
    slug: 'paradise-suite-asokoro',
    name: 'Paradise Suite',
    location: 'Asokoro, Abuja',
    type: 'Commercial',
    price: 21600000,
    priceFormatted: '₦1.2M per sqm',
    paymentPlan: 'Up to 12 months',
    size: 'From 18 sqm',
    titleType: 'Certificate of Occupancy',
    description:
      "Paradise Suite in Asokoro, Abuja, is where you can elevate your experience—work, shop, relax, all in one place. Ideal for offices, shops, and malls, Asokoro offers high visibility and premium retail demand. With a limited-time offer of ₦1.2M per sqm and an initial deposit of ₦5 Million, this is a prime commercial investment. Project completion is Q4 2026.",
    shortDescription: 'Premium commercial suites in a high-visibility location.',
    thumbnailId: 'prop-3-thumb',
    imageIds: ['prop-3-thumb', 'prop-6-thumb', 'contact-image'],
    amenities: [
      { name: 'CCTV Surveillance', icon: ShieldCheck },
      { name: '24-hour Solar Lighting', icon: Zap },
      { name: 'Landscaped Areas', icon: Sprout },
      { name: 'Ample Parking', icon: Car },
      { name: 'Fire Suppression System', icon: Building2 },
      { name: 'Robust Electrical Systems', icon: Building2 },
    ],
  },
];

export const getProperties = () => properties;

export const getPropertyBySlug = (slug: string) =>
  properties.find(p => p.slug === slug);
