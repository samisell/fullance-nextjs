"use client";
import Image from 'next/image';
import { findImage } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const partners = [
  { id: 'partner-logo-1', name: 'Partner 1', hint: 'company logo' },
  { id: 'partner-logo-2', name: 'Partner 2', hint: 'tech logo' },
  { id: 'partner-logo-3', name: 'Partner 3', hint: 'finance logo' },
  { id: 'partner-logo-4', name: 'Partner 4', hint: 'estate logo' },
  { id: 'partner-logo-5', name: 'Partner 5', hint: 'venture logo' },
];

const whyChooseUsPoints = [
    {
      title: "Security First",
      description: "We prioritize legally sound investments. Our flagship project, Fullance Court Estate, for example, is backed by a Gazette Title and official searches to confirm it is free from government acquisition.",
    },
    {
      title: "Strategic Market Insight",
      description: "We have deep expertise in identifying and securing properties in Lagos, Oyo, Ogun, and Abuja’s most promising growth corridors, positioning our clients for significant capital appreciation.",
    },
    {
      title: "End-to-End Solutions",
      description: "We simplify the entire real estate process, offering everything from advisory and acquisition to construction management, all under one roof.",
    },
    {
      title: "A Partner You Can Trust",
      description: "We build relationships, not just transactions. Your success is our most important metric.",
    },
];


const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function WhyChooseUs() {
  return (
    <>
      <section className="bg-secondary/50 py-16 sm:py-24">
        <motion.div className="container max-w-7xl text-center" {...animation}>
          <h2 className="text-3xl font-bold text-primary mb-4">
            You can own real estate investment, <span className="text-accent">anywhere.</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => {
              const image = findImage(partner.id);
              return image ? (
                <motion.div 
                    key={partner.id} 
                    className="relative h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image src={image.url} alt={partner.name} fill className="object-contain" data-ai-hint={partner.hint} />
                </motion.div>
              ) : null;
            })}
          </div>
        </motion.div>
      </section>
      
      <section className="bg-primary py-16 sm:py-24 text-primary-foreground">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" {...animation}>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why Choose Fullance Homes?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Here's how we deliver value and build trust.
            </p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsPoints.map((item, index) => {
              return (
                <motion.div key={item.title} {...animation} transition={{...animation.transition, delay: 0.2 + index * 0.1}}>
                  <Card className="bg-white/10 border-white/20 text-primary-foreground shadow-lg h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-primary-foreground/80">"{item.description}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
