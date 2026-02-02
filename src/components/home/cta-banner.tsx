"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { findImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function CtaBanner() {
  const mapImage = findImage('map-placeholder');

  return (
    <>
      <section style={{ backgroundColor: 'hsl(var(--primary-dark))' }} className="py-16 sm:py-24 text-primary-foreground">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="grid lg:grid-cols-2 gap-12 items-center" {...animation}>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">We love hearing from you.</h2>
              <p className="text-primary-foreground/80">
                Our team is always available to answer any of your questions. Get in touch with us today. We are available 24/7.
              </p>
            </div>
            <div className="space-y-6">
                <Card className="bg-primary text-primary-foreground shadow-lg">
                    <CardContent className="p-6 flex items-center gap-4">
                        <Phone />
                        <div>
                            <p className="font-semibold">Phone Number</p>
                            <a href="tel:+2347086127064" className="hover:underline">+234 708 612 7064</a>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-primary text-primary-foreground shadow-lg">
                    <CardContent className="p-6 flex items-center gap-4">
                        <Mail />
                        <div>
                            <p className="font-semibold">Email Address</p>
                            <a href="mailto:info@fullancehomes.com" className="hover:underline">info@fullancehomes.com</a>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
