"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { findImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const heroImages = [
  { id: 'partner-hero-1', hint: 'people cheering' },
  { id: 'partner-hero-2', hint: 'team discussion' },
  { id: 'partner-hero-3', hint: 'man presenting' },
];

const coreValues = [
    {
    title: 'Integrity & Transparency',
    description: 'We operate with honesty and full disclosure, ensuring every client has all the information needed to make a confident decision.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0-4.4-3.6-8-8-8S5 5.6 5 10c0 4.4 3.6 8 8 8s8-3.6 8-8Z"/><path d="m14 14-2.5 2.5-2.5-2.5"/><path d="m14 10-2.5 2.5-2.5-2.5"/></svg>
    ),
  },
  {
    title: 'Trust & Reliability',
    description: 'We build lasting relationships by consistently delivering on our promises.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
  },
  {
    title: 'Excellence',
    description: 'We are committed to the highest standards in our services, projects, and client interactions.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4"/><path d="M12 14v-4"/><path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"/><path d="M9 17H4v5"/></svg>
    ),
  },
    {
    title: 'Customer-Centricity',
    description: 'Your goals and security are at the heart of everything we do.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    ),
  },
];

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

function PartnerLogo() {
  return (
     <h2 className="text-3xl font-bold text-primary">Fullance <span className="text-accent">Partner Program</span></h2>
  )
}

export default function PartnerPage() {
  const ctaImage = findImage('dukiya-army-team');

  return (
    <div className="bg-white">
      <section className="py-16 sm:py-24">
        <div className="container max-w-7xl">
          <motion.div {...animation} className="text-center max-w-2xl mx-auto">
            <PartnerLogo />
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl mt-4">
              Partner with us and earn commissions by <span className="text-accent">referring clients.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Join our network of successful partners and grow with us.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">Register Now <ArrowRight className="ml-2"/></Link>
            </Button>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {heroImages.map((img, index) => {
              const image = findImage(img.id);
              if (!image) return null;
              return (
                <motion.div
                  key={img.id}
                  {...animation}
                  transition={{ ...animation.transition, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        data-ai-hint={image.hint}
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container max-w-7xl">
          <motion.div {...animation} className="text-center">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Our Core Values</h2>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  {...animation}
                  transition={{ ...animation.transition, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                   <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                        <Icon className="w-10 h-10 text-primary"/>
                   </div>
                  <h3 className="text-xl font-bold text-primary mt-6">{value.title}</h3>
                  <p className="mt-2 text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...animation}>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Be a part of the <span className="text-accent">Fullance Partner Network</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Fullance Homes' mission is to provide access to genuine, legally verified properties and deliver a transparent, hassle-free experience that creates long-term value for our clients. You want to be part of this dream? Join us!
              </p>
              <Button asChild size="lg" variant="outline" className="mt-8">
                <Link href="/contact">Join Us <ArrowRight className="ml-2"/></Link>
              </Button>
            </motion.div>
            <motion.div 
                {...animation} 
                transition={{...animation.transition, delay: 0.2}}
                className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              {ctaImage && (
                <Image
                  src={ctaImage.url}
                  alt={ctaImage.alt}
                  fill
                  className="object-cover"
                  data-ai-hint={ctaImage.hint}
                />
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
