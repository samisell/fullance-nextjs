"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { findImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import MottoBanner from '@/components/layout/motto-banner';
import ContactFooter from '@/components/layout/contact-footer';

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

const teamMembers = [
    { name: 'Bayo Imanol', role: 'CEO', imageId: 'team-member-1' },
    { name: 'Laolu Abioye', role: 'COO', imageId: 'team-member-2' },
    { name: 'Temitope A.', role: 'CFO', imageId: 'team-member-3' },
    { name: 'Olabisi D.', role: 'CTO', imageId: 'team-member-4' },
    { name: 'Joshua Edem', role: 'Head of Sales', imageId: 'team-member-5' },
]

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

function ScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
         <div className="relative h-20">
            <div className="absolute bottom-8 right-0">
                <Button variant="outline" size="icon" onClick={scrollToTop} className="rounded-full h-12 w-12 bg-primary text-white hover:bg-primary/90">
                    <ChevronUp className="h-6 w-6" />
                </Button>
            </div>
        </div>
    )
}

export default function AboutPage() {
  const heroImage1 = findImage('about-hero-team-1');
  const heroImage2 = findImage('about-hero-team-2');
  const galleryImage1 = findImage('about-gallery-1');
  const galleryImage2 = findImage('about-gallery-2');
  const ctaImage = findImage('about-cta-team');

  return (
    <div className="bg-white text-foreground">
      <section className="py-16 sm:py-24">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...animation}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                Building Trust, <span className="text-accent">Delivering Value</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Fullance Homes and Properties Limited is a dynamic real estate development and consulting company founded on an unwavering commitment to integrity, professionalism, and client success. We are dedicated to restoring trust and transparency to the Nigerian property market by providing secure, high-value, and legally verified real estate opportunities.
              </p>
            </motion.div>
            <motion.div 
                {...animation} 
                transition={{...animation.transition, delay: 0.2}}
                className="grid grid-cols-2 gap-4 items-start"
            >
                <div className="col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    {heroImage1 && (
                        <Image
                        src={heroImage1.url}
                        alt={heroImage1.alt}
                        fill
                        className="object-cover"
                        data-ai-hint={heroImage1.hint}
                        />
                    )}
                </div>
                <div className="col-span-1 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    {heroImage2 && (
                        <Image
                        src={heroImage2.url}
                        alt={heroImage2.alt}
                        fill
                        className="object-cover"
                        data-ai-hint={heroImage2.hint}
                        />
                    )}
                </div>
                 <div className="col-span-1 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    {heroImage1 && (
                        <Image
                        src={heroImage1.url}
                        alt={heroImage1.alt}
                        fill
                        className="object-cover object-left"
                        data-ai-hint={heroImage1.hint}
                        />
                    )}
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container max-w-7xl">
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div {...animation}>
                    <Card className="p-8 bg-primary/10 border-none shadow-xl h-full">
                        <p className="font-semibold text-primary">OUR VISION</p>
                        <h3 className="mt-2 text-2xl font-bold text-primary">To become the most trusted and innovative real estate partner for Nigerians worldwide, making the dream of secure land and home ownership a tangible reality.</h3>
                    </Card>
                </motion.div>
                 <motion.div {...animation} transition={{...animation.transition, delay: 0.2}}>
                    <Card className="p-8 bg-accent/10 border-none shadow-xl h-full">
                        <p className="font-semibold text-accent">OUR MISSION</p>
                        <h3 className="mt-2 text-2xl font-bold text-primary">To provide access to genuine, legally verified properties and deliver a transparent, hassle-free experience that creates long-term value for our clients.</h3>
                    </Card>
                </motion.div>
            </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="container max-w-7xl">
          <motion.div {...animation} className="text-center">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Our Values</h2>
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

      <section className="pb-16 sm:pb-24 bg-white">
        <div className="container max-w-7xl">
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div {...animation} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    {galleryImage1 && <Image src={galleryImage1.url} alt={galleryImage1.alt} fill className="object-cover" data-ai-hint={galleryImage1.hint} />}
                </motion.div>
                 <motion.div {...animation} transition={{...animation.transition, delay: 0.2}} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    {galleryImage2 && <Image src={galleryImage2.url} alt={galleryImage2.alt} fill className="object-cover" data-ai-hint={galleryImage2.hint} />}
                </motion.div>
            </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container max-w-7xl">
            <motion.div {...animation} className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-primary sm:text-4xl">Meet our Team</h2>
                <p className="mt-4 text-muted-foreground">Your goals and security are at the heart of everything we do. Our team of passionate, and dedicated professionals are committed to this vision.</p>
            </motion.div>
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {teamMembers.map((member, index) => {
                    const image = findImage(member.imageId);
                    return (
                        <motion.div key={member.name} {...animation} transition={{ ...animation.transition, delay: 0.2 + index * 0.1 }} className="text-center">
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                                {image && <Image src={image.url} alt={member.name} fill className="object-cover" data-ai-hint={image.hint} />}
                            </div>
                            <h3 className="mt-4 font-bold text-primary">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                        </motion.div>
                    )
                })}
            </div>
        </div>
      </section>

       <section className="py-16 sm:py-24 bg-white">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...animation}>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Join <span className="text-accent">Fullance Homes</span> and help people achieve their realty dreams
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Our team is made of seasoned professionals and experts who are passionate about our mission of making real estate accessible to everyone.
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
           <ScrollToTop />
        </div>
      </section>
      
      <MottoBanner />
      <ContactFooter />
    </div>
  );
}
