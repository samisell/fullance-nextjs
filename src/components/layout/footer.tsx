import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "@/components/icons/logo";

const socialLinks = [
  { icon: Facebook, href: "#", name: "Facebook" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/fullancehomes", name: "Instagram" },
];

const footerLinks = {
  products: [
    { href: "/listings?type=Land", label: "Own Landed Properties" },
    { href: "/listings?type=Residential", label: "Buy House" },
    { href: "/build", label: "Build your home" },
    { href: "/partnership", label: "Fullance Partnership" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "#", label: "Blog" },
    { href: "/book-inspection", label: "Schedule Inspection" },
    { href: "/partner", label: "Become a Partner" },
  ],
  legal: [
    { href: "/terms", label: "Terms & Condition" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <Logo />
            <div className="mt-4 space-y-4">
                <div>
                    <p className="text-base text-muted-foreground">
                        Email: info@fullancehomes.com
                    </p>
                    <p className="mt-1 text-base text-muted-foreground">
                        Tel: +234 708 612 7064
                    </p>
                </div>
            </div>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  className="text-muted-foreground hover:text-primary"
                  aria-label={name}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Products
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.products.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-base text-muted-foreground hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-base text-muted-foreground hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-base text-muted-foreground hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground sm:flex sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Fullance Homes and Properties Limited. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
             <Link href="#" className="hover:text-primary">Privacy</Link>
             <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
