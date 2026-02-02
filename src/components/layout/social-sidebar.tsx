import Link from 'next/link';
import { Phone, Linkedin, Instagram, Facebook } from 'lucide-react';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-.88-.436-1.017-.486s-.282-.074-.412.074c-.13.149-.39.486-.479.56s-.178.089-.328.014c-.149-.074-.633-.232-1.207-.742s-.935-.859-1.034-.994c-.099-.135-.015-.209.059-.273s.149-.178.224-.282.03-.149-.015-.268c-.044-.119-.412-1.017-.56-1.385s-.297-.309-.412-.318c-.119-.015-.254-.015-.374-.015s-.328.044-.493.223c-.165.178-.633.618-.633 1.5s.648 1.744.738 1.868c.089.124 1.273 2.119 3.085 2.872.436.178.78.282.975.368s.346.135.45.105c.105-.03.88-.368 1.017-.732s.135-.677.089-.732c-.044-.059-.135-.089-.282-.149zM12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM7.15 18.42c-.21-.125-.43-.245-.63-.375l-1.01 1.01.27-.82c.11-.33.19-.67.24-1.02a8.6 8.6 0 0 1-1.3-4.2 8.58 8.58 0 0 1 8.58-8.58 8.58 8.58 0 0 1 8.58 8.58 8.58 8.58 0 0 1-8.58 8.58c-1.61 0-3.13-.45-4.44-1.25z"/>
  </svg>
);


const socialLinks = [
  { icon: Phone, href: "tel:+2347086127064", name: "Phone" },
  { icon: WhatsAppIcon, href: "https://wa.me/2347086127064", name: "WhatsApp" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/fullancehomes", name: "Instagram" },
  { icon: Facebook, href: "#", name: "Facebook" },
];

export default function SocialSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 h-full w-16 bg-white shadow-md hidden md:flex flex-col items-center justify-center space-y-8">
      {socialLinks.map(({ icon: Icon, href, name }) => (
        <a 
          key={name} 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Icon className="h-6 w-6" />
          <span className="sr-only">{name}</span>
        </a>
      ))}
    </aside>
  );
}
