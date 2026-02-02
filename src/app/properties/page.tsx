"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { findImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MottoBanner from '@/components/layout/motto-banner';
import ContactFooter from '@/components/layout/contact-footer';

const exploreCards = [
  {
    title: 'Own Landed Properties',
    imageId: 'explore-land',
    bgColor: 'bg-indigo-50',
    href: '/listings?type=Land'
  },
  {
    title: 'Buy House',
    imageId: 'explore-buy-house',
    bgColor: 'bg-green-50',
    href: '/listings?type=Residential'
  },
  {
    title: 'Build House',
    imageId: 'explore-build-house',
    bgColor: 'bg-stone-50',
    href: '/build'
  }
];

const whyUsContent = [
    {
      id: '01',
      title: 'Security First',
      description: "We prioritize legally sound investments. Our projects are backed by verifiable titles and are free from government acquisition.",
      imageId: 'why-us-money'
    },
    {
      id: '02',
      title: 'Strategic Market Insight',
      description: "We have deep expertise in identifying properties in Nigeria’s most promising growth corridors, positioning our clients for significant capital appreciation.",
      imageId: 'why-us-money' 
    },
    {
      id: '03',
      title: 'End-to-End Solutions',
      description: "We simplify the entire real estate process, offering everything from advisory and acquisition to construction management.",
      imageId: 'why-us-money'
    },
    {
      id: '04',
      title: 'A Partner You Can Trust',
      description: "We build relationships, not just transactions. Your success is our most important metric.",
      imageId: 'why-us-money'
    },
];

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

function WhyWeAreBest() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeContent = whyUsContent[activeIndex];
    const contentImage = findImage(activeContent.imageId);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % whyUsContent.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + whyUsContent.length) % whyUsContent.length);
    };
    
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="container max-w-7xl">
                <motion.div className="grid lg:grid-cols-2 gap-12 items-center" {...animation}>
                    <div>
                        <p className="font-semibold text-primary">Here's why we are your best bet.</p>
                        <h2 className="text-4xl font-bold text-primary mt-2">{activeContent.title}</h2>
                        <p className="mt-4 text-lg text-muted-foreground">{activeContent.description}</p>
                        {contentImage && (
                            <div className="mt-8 relative w-48 h-24">
                                <Image src={contentImage.url} alt={contentImage.alt} fill className="object-contain" data-ai-hint={contentImage.hint} />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center justify-end mb-8">
                            <div className="flex gap-4">
                                <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full h-12 w-12 border-primary text-primary hover:bg-primary hover:text-white">
                                    <ArrowLeft className="h-6 w-6" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full h-12 w-12 border-primary text-primary hover:bg-primary hover:text-white">
                                    <ArrowRight className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                        <div>
                             <div className="relative pt-4">
                                 <div className="absolute top-0 left-0 w-full h-px bg-gray-300"></div>
                            </div>
                            <div className="flex justify-between mt-4">
                                {whyUsContent.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        className="text-left cursor-pointer group"
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <p className={`text-sm font-bold ${activeIndex === index ? 'text-primary' : 'text-muted-foreground'}`}>{item.id}</p>
                                        <p className={`text-sm font-semibold mt-1 group-hover:text-primary ${activeIndex === index ? 'text-primary' : 'text-muted-foreground'}`}>{item.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default function PropertiesPage() {
  return (
    <div className="bg-white">
      <section className="py-16 sm:py-24">
        <div className="container max-w-7xl">
          <motion.h1 {...animation} className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl mb-12">
            Explore our properties
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exploreCards.map((card, index) => {
              const image = findImage(card.imageId);
              return (
                <motion.div key={card.title} {...animation} transition={{...animation.transition, delay: 0.2 + index * 0.1}}>
                  <Link href={card.href}>
                    <Card className={'overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full rounded-2xl'}>
                      <CardContent className={`p-6 flex flex-col justify-between h-full ${card.bgColor}`}>
                         <h3 className="text-xl font-bold text-primary mb-24">{card.title}</h3>
                         {image && (
                           <div className="relative w-full h-48 mt-4">
                              <Image src={image.url} alt={card.title} fill className="object-cover rounded-md" data-ai-hint={image.hint || ''}/>
                           </div>
                         )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyWeAreBest />
      
      <MottoBanner />

      <ContactFooter />
    </div>
  );
}
