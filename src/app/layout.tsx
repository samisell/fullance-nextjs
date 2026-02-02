import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SocialSidebar from '@/components/layout/social-sidebar';
import SignupPopup from '@/components/layout/signup-popup';

export const metadata: Metadata = {
  title: 'Fullance Homes',
  description: 'Building Trust, Delivering Value.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
      </head>
      <body className="font-body antialiased">
        <SocialSidebar />
        <div className="md:pl-24 md:pr-8">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster />
        <SignupPopup />
      </body>
    </html>
  );
}