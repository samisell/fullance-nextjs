"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function ContactFooter() {
    return (
        <section style={{ backgroundColor: 'hsl(var(--primary-dark))' }} className="py-16 sm:py-24 text-primary-foreground">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="grid lg:grid-cols-2 gap-16 items-center" {...animation}>
            <div className="space-y-6">
                <div className="relative">
                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary rounded-lg -z-0">
                         <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40 0L80 40L40 80L0 40L40 0Z" fill="#4F46E5" fillOpacity="0.5"/>
                        </svg>
                    </div>
                     <h2 className="text-5xl font-bold pt-10 relative z-10">We love hearing from you.</h2>
                </div>
              <p className="text-primary-foreground/80 text-lg">
                Our team maintains subtle accessibility and working relationships which guarantee our clients full-time attention whenever they need our help.
              </p>
            </div>
            <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <p className="font-semibold text-sm text-primary-foreground/80">Call Us or Send Text</p>
                        <a href="tel:+2347086127064" className="text-2xl font-bold hover:underline">+234 708 612 7064</a>
                        <Button variant="link" className="p-0 h-auto text-white mt-2 block">Get reply immediately</Button>
                    </div>
                     <div>
                        <p className="font-semibold text-sm text-primary-foreground/80">Email Us</p>
                        <a href="mailto:info@fullancehomes.com" className="text-2xl font-bold hover:underline">info@fullancehomes.com</a>
                        <Button variant="link" className="p-0 h-auto text-white mt-2 block">Get reply within 24hrs</Button>
                    </div>
                </div>
                 <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-primary-foreground/20">
                    <div>
                        <p className="font-semibold text-sm text-primary-foreground/80">Office Operating Hours</p>
                        <p className="text-lg font-semibold">Monday - Friday 8am - 4pm</p>
                    </div>
                     <div>
                        <p className="font-semibold text-sm text-primary-foreground/80">Inspections</p>
                        <p className="text-lg font-semibold">Tuesday, Thursday & Saturday</p>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
}
