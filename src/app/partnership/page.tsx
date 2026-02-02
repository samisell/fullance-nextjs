"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { findImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronUp } from 'lucide-react';

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

export default function PartnershipPage() {
  const heroImage = findImage('partnership-hero-houses');
  const ctaImage = findImage('partnership-cta-people');

  return (
    <div className="bg-white text-foreground">
      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container max-w-7xl">
          <motion.div {...animation} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              Now you can <span className="text-accent">build wealth</span> without laying a brick
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Partner with us in our ongoing building and construction projects in major cities such as Lagos, Abeokuta, Ilorin and Ibadan and get access to safe and secure returns on your investment within 6-18 months.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Register Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg">
                <Link href="#">Download Brochure</Link>
              </Button>
            </div>
          </motion.div>
          {heroImage && (
            <motion.div
              {...animation}
              transition={{ ...animation.transition, delay: 0.2 }}
              className="mt-16 relative aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={heroImage.url}
                alt={heroImage.alt}
                fill
                className="object-cover"
                data-ai-hint={heroImage.hint}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Partnership Details Section */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...animation}>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Be a part of <span className="text-accent">#FullancePartnership</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Sign up to partner with us on Fullance Partnership with as low as ₦2,000,000 and a maximum of ₦50,000,000. When you partner with us on our ongoing projects, you earn 12% interest on a 6-month partnership plan, 25% interest on a 1-year partnership plan, and 40.5% on a 1 year and 6 months partnership plan. Ready to build wealth seamlessly with no stress or drama involved?
              </p>
              <Button asChild size="lg" variant="link" className="mt-8 p-0 h-auto text-primary font-bold text-lg">
                <Link href="/contact">Get Started <ArrowRight className="ml-2 h-5 w-5"/></Link>
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
    </div>
  );
}
