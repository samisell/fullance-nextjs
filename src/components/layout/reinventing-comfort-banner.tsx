"use client";

import { motion } from 'framer-motion';

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function ReinventingComfortBanner() {
    return (
        <section className="py-16 sm:py-24 bg-secondary/30">
            <div className="container max-w-7xl">
                <motion.h2 {...animation} className="text-4xl font-extrabold text-center text-primary sm:text-5xl">
                    Reinventing comfort, <br />
                    <span className="text-accent">building smiles</span> & <br />
                    leading you home.
                </motion.h2>
            </div>
        </section>
    )
}
