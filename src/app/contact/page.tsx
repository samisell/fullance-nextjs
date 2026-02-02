"use client";

import Image from "next/image";
import { React, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { findImage } from "@/lib/placeholder-images";
import { submitContactForm } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

const contactInfo = [
  { icon: Phone, text: "+234 708 612 7064", href: "tel:+2347086127064" },
  { icon: Mail, text: "info@fullancehomes.com", href: "mailto:info@fullancehomes.com" },
  { icon: MapPin, text: "Lagos & Abuja, Nigeria" },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "https://instagram.com/fullancehomes" },
];

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function ContactPage() {
  const contactImage = findImage("contact-image");
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitContactForm, null);

  useEffect(() => {
    if (state?.message === "success") {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you shortly.",
      });
    } else if (state?.message && state.message !== "success") {
      toast({
        title: "An error occurred",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container max-w-7xl">
        <motion.div className="text-center mb-12" {...animation}>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">Ready to find your secure piece of Nigeria? Let’s discuss how we can help you achieve your real estate ambitions.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          <motion.div className="lg:col-span-2" {...animation} transition={{...animation.transition, delay: 0.2}}>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-primary">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form action={formAction} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                     {state?.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                     {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+234 801 234 5678" required />
                    {state?.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Your message here..." required rows={5} />
                    {state?.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
                  </div>
                  <SubmitButton />
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div className="space-y-8" {...animation} transition={{...animation.transition, delay: 0.4}}>
            <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-xl lg:h-80">
              {contactImage && (
                <Image src={contactImage.url} alt={contactImage.alt} fill className="object-cover" data-ai-hint={contactImage.hint} />
              )}
            </div>
            <Card className="shadow-xl">
              <CardContent className="p-6 space-y-4">
                {contactInfo.map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-center">
                    <Icon className="h-5 w-5 text-accent mr-4" />
                    {href ? <a href={href} className="text-muted-foreground hover:text-primary">{text}</a> : <span className="text-muted-foreground">{text}</span>}
                  </div>
                ))}
                <div className="flex space-x-4 pt-4 border-t">
                  {socialLinks.map(({ icon: Icon, href }, index) => (
                    <a key={index} href={href} className="text-muted-foreground hover:text-primary">
                      <Icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
