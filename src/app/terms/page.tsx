"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactFooter from '@/components/layout/contact-footer';

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

export default function TermsPage() {
  return (
    <div className="bg-white text-foreground">
      <section className="py-16 sm:py-24">
        <div className="container max-w-4xl">
          <motion.div {...animation} className="text-center mb-16">
            <p className="text-primary font-semibold">Fullance Homes</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              Terms & Condition
            </h1>
          </motion.div>

          <motion.div 
            {...animation} 
            transition={{ ...animation.transition, delay: 0.2 }} 
            className="space-y-10 text-muted-foreground"
          >
            <div>
              <h2 className="text-2xl font-bold text-accent mb-4">Introduction</h2>
              <div className="space-y-4">
                <p>
                  Welcome to Fullance Homes and Properties Limited. This page outlines the terms and conditions for using our website and services. By accessing our website or engaging with our services, you agree to these terms.
                </p>
                <p>
                  If you choose to use our Service, then you agree to the collection and use of information in relation with our Privacy Policy. We will not use or share your information with anyone except as described in our Privacy Policy.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-accent mb-4">Sales Agreement</h2>
              <ul className="list-disc pl-5 space-y-4">
                <li>That payment shall be made either by issuing a cheque in favour of Fullance Homes and Properties Limited or a cash deposit paid by the purchaser directly into the company's accounts or via online transfers.</li>
                <li>Fullance Homes and Properties Limited covenants to allocate ......Unit (s) of ............ to the purchaser only after full payment for the land.</li>
                <li>Where the purchaser defaults in its installment payment for 2 (Two) consecutive instalments, the purchaser shall have his/her subscription revoked and the Company shall refund the total instalment made by the Purchaser less 40% (Forty percent) after the sale of the Unit(s) to any third-party.</li>
                <li>Termination of agreement by the purchaser before the delivery of the Unit(s) shall attract refund of the total instalment paid less 40% after the sale of the unit(s) to any third-party. Refund is payable after 90 working days of application.</li>
                <li>Any cash given to any agent or marketer by the purchaser on behalf of Fullance Homes and Properties Limited shall be at the purchaser's risk.</li>
              </ul>
              <p className="mt-6">
                IN WITNESS WHEREOF the vendor has hereunto set its common seal and the purchaser has set his/her hand the day and year first above written.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-accent mb-4">Contact Us</h2>
              <p>
                If you have any questions or suggestions about our Terms & Conditions, do not hesitate to <Link href="/contact" className="text-accent font-semibold hover:underline">Contact Us</Link>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
