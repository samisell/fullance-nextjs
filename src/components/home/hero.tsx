"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32 lg:px-8">
        <div className="relative">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Your Trusted Partner
              <br />
              <span className="text-accent">in Nigerian</span>
              <br />
              Real Estate.
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              We provide secure, high-value, and legally verified real estate opportunities in Nigeria.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button asChild size="lg">
                <Link href="/properties">
                  Explore Portfolio <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
