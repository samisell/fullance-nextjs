"use client";

import { useState } from "react";
import Link from 'next/link';
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import MegaMenu from "@/components/layout/mega-menu";
import Logo from "../icons/logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-transparent">
        <div className="container flex h-20 max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
            <Logo width={120} height={40} />
          </div>

          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/book-inspection">Book an inspection</Link>
            </Button>
          </div>
        </div>
      </header>
      <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}