"use client";
import Image from 'next/image';
import Link from 'next/link';
import { findImage } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Real Estate Development & Sales',
    description: 'We identify, acquire, and develop prime residential and commercial properties in strategic, high-growth locations.',
    link: '/properties',
    imageId: 'service-house-plans',
    hint: 'house plans'
  },
  {
    title: 'Building & Construction Management',
    description: 'We manage your project from concept to completion, ensuring quality, timeliness, and budget adherence.',
    link: '/build',
    imageId: 'service-happy-man',
    hint: 'happy man keys'
  }
];

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function WhoWeAre() {
  return (
    <section className="bg-secondary/50 py-16 sm:py-24">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const image = findImage(service.imageId);
            return (
              <motion.div key={service.title} {...animation} transition={{ duration: 0.5, delay: index * 0.2 }}>
                <Card className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <h3 className="text-3xl font-bold text-primary mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="mt-auto">
                      <Button asChild variant="link" className="font-semibold text-accent p-0 h-auto">
                        <Link href={service.link}>
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      {image && (
                        <div className="mt-6 aspect-[4/3] relative">
                           <Image src={image.url} alt={image.alt} fill className="object-cover rounded-lg" data-ai-hint={image.hint}/>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
