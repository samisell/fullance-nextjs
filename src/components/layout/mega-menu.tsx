'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Home } from 'lucide-react';
import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { findImage } from '@/lib/placeholder-images';
import { AnimatePresence, motion } from 'framer-motion';

type MegaMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/properties", label: "Explore Properties" },
    { href: "/build", label: "Build your Home" },
    { href: "/book-inspection", label: "Book Inspection" },
    { href: "/partner", label: "Become a Partner" },
    { href: "/about", label: "About Us" },
    { href: "/partnership", label: "Partnership" },
];

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const menuImage = findImage('service-happy-man');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex"
        >
          <div className="w-16 flex-shrink-0 bg-white flex flex-col items-center justify-start py-8">
            <button onClick={onClose} className="flex flex-col items-center space-y-2 text-primary font-semibold">
              <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="text-sm">CLOSE</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 bg-primary text-white">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 50 }}
              className="pt-24 pb-12 px-12 flex flex-col"
            >
              <div className="mb-16">
                <Logo className="text-white" />
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map(({ href, label, icon: Icon }, index) => (
                   <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      className="text-4xl font-bold hover:text-accent relative w-fit transition-colors"
                    >
                      {label === 'Home' && Icon && <Icon className="h-8 w-8 text-accent absolute -top-4 -right-6" />}
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto grid grid-cols-2 gap-8 text-sm">
                 <div>
                    <h4 className="font-semibold mb-2">Call Us or Send Text</h4>
                    <a href="tel:+2347086127064" className="hover:underline">+234 708 612 7064</a>
                 </div>
                 <div>
                    <h4 className="font-semibold mb-2">Email Us</h4>
                    <a href="mailto:info@fullancehomes.com" className="hover:underline">info@fullancehomes.com</a>
                 </div>
              </div>
            </motion.div>
            
            <div className="bg-[hsl(var(--primary-dark))] p-12 hidden md:flex flex-col justify-center items-start">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
               >
                 <h2 className="text-6xl font-bold">Build your dream<br/>house</h2>
                 {menuImage && (
                   <div className="relative w-full max-w-sm aspect-[3/4] mt-8 overflow-hidden rounded-lg">
                     <Image src={menuImage.url} alt={menuImage.alt} fill className="object-cover" data-ai-hint={menuImage.hint} />
                   </div>
                 )}
                  <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-white/90">
                    <Link href="/contact" onClick={onClose}>Get in Touch &gt;</Link>
                  </Button>
               </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
