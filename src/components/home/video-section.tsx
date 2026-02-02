"use client";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { findImage } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function VideoSection() {
  const aboutImage = findImage("about-person-holding-sign");

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container max-w-7xl mx-auto px-4 pt-16 sm:pt-24 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-6" {...animation}>
            <p className="text-sm font-bold uppercase tracking-wider text-accent">About Us</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Fullance Homes is dedicated to restoring trust and transparency to the Nigerian property market.
            </h2>
            <Button variant="link" className="text-white font-semibold px-0 hover:text-accent">
                Learn more
            </Button>
          </motion.div>
          <motion.div className="relative aspect-video w-full" {...animation} transition={{ duration: 0.5, delay: 0.2 }}>
            <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/LXb3EKWsInQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
            {aboutImage && (
              <div className="absolute -bottom-10 -right-10 w-64 h-48 hidden lg:block">
                <Image
                  src={aboutImage.url}
                  alt={aboutImage.alt}
                  width={256}
                  height={192}
                  className="object-cover rounded-lg shadow-xl"
                  data-ai-hint={aboutImage.hint}
                />
              </div>
            )}
          </motion.div>
        </div>
        <div className="text-center mt-12 lg:mt-4">
          <ArrowDown className="h-10 w-10 text-white/50 inline-block animate-bounce" />
        </div>
      </div>
    </section>
  );
}
