"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { findImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Mail, Phone, X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const whyUsContent = [
    {
        id: '01',
        title: 'Real Estate Development & Sales',
        description: 'We identify, acquire, and develop prime residential and commercial properties in strategic, high-growth locations.',
        imageId: 'medal-best-quality'
    },
    {
        id: '02',
        title: 'Property Investment Advisory',
        description: 'Data-driven guidance to help you make informed decisions that maximize your Return on Investment (ROI).',
        imageId: 'medal-best-quality'
    },
    {
        id: '03',
        title: 'Building & Construction Management',
        description: 'We manage your project from concept to completion, ensuring quality, timeliness, and budget adherence.',
        imageId: 'medal-best-quality'
    },
    {
        id: '04',
        title: 'Property Management',
        description: 'We protect and enhance the value of your asset through dedicated maintenance and management services.',
        imageId: 'medal-best-quality'
    },
];

const animation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5 }
};



function BuildForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const [state, setState] = useState<{ message: string; errors?: any } | null>(null);
    const [pending, setPending] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const fullName = `${data.firstName} ${data.lastName}`;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, fullName }),
            });

            const result = await response.json();
            setState(result);

            if (!response.ok) {
                toast({
                    title: "An error occurred",
                    description: result.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "An error occurred",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setPending(false);
        }
    };

    if (state?.message === 'success') {
        return (
            <div className="text-center py-8">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-primary">Form Submitted!</h2>
                <p className="mt-2 text-muted-foreground">Thank you for your interest. Our team will contact you shortly.</p>
                <Button onClick={() => setOpen(false)} className="mt-6">Close</Button>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="build-firstName" className="sr-only">First Name</Label>
                    <Input id="build-firstName" name="firstName" placeholder="First Name" required />
                    {state?.errors?.firstName && <p className="text-sm font-medium text-destructive">{state.errors.firstName[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="build-lastName" className="sr-only">Last Name</Label>
                    <Input id="build-lastName" name="lastName" placeholder="Last Name" required />
                    {state?.errors?.lastName && <p className="text-sm font-medium text-destructive">{state.errors.lastName[0]}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="build-phone" className="sr-only">Phone Number</Label>
                    <Input id="build-phone" name="phone" type="tel" placeholder="Phone Number" required />
                    {state?.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="build-state" className="sr-only">State</Label>
                    <Input id="build-state" name="state" placeholder="State" required />
                    {state?.errors?.state && <p className="text-sm font-medium text-destructive">{state.errors.state[0]}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="build-email" className="sr-only">Email Address</Label>
                <Input id="build-email" name="email" type="email" placeholder="Email Address" required />
                {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
            </div>
            <div className="flex justify-end">
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
                    {pending ? "Submitting..." : <>Submit <ArrowRight className="ml-2" /></>}
                </Button>
            </div>
        </form>
    )
}

function BuildFormDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                    Get in Touch <ArrowRight className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl p-8">
                <DialogHeader className="flex flex-row justify-between items-start">
                    <DialogTitle className="text-2xl font-bold text-primary">Let's help you build</DialogTitle>
                    <DialogClose asChild className="relative -top-2 -right-2">
                        <button type="button" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <X className="h-4 w-4" />
                            <span>CLOSE</span>
                        </button>
                    </DialogClose>
                </DialogHeader>
                <p className="text-muted-foreground -mt-2">Please fill this form</p>
                <div className="pt-4">
                    <BuildForm setOpen={setOpen} />
                </div>
            </DialogContent>
        </Dialog>
    );
}


function HeroSection() {
    const heroImage = findImage('build-hero-bg');
    return (
        <section className="relative bg-white h-[70vh] min-h-[600px] flex items-center">
            {heroImage && (
                <Image
                    src={heroImage.url}
                    alt={heroImage.alt}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.hint}
                />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="container max-w-7xl relative">
                <div className="absolute top-[-100px] right-0">
                    <Button variant="outline" className="bg-white/80 backdrop-blur-sm text-primary font-bold hover:bg-white">
                        +234 708 612 7064
                    </Button>
                </div>

                <motion.div
                    className="bg-accent/90 p-8 md:p-12 rounded-lg max-w-lg"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-accent-foreground">
                        Build your next house in grand style!
                    </h1>
                    <BuildFormDialog />
                </motion.div>
            </div>
        </section>
    )
}

function CustomHomeBuilder() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeContent = whyUsContent[activeIndex];
    const contentImage = findImage(activeContent.imageId);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % whyUsContent.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + whyUsContent.length) % whyUsContent.length);
    };

    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="container max-w-7xl">
                <motion.div className="grid lg:grid-cols-2 gap-12 items-center" {...animation}>
                    <div>
                        <p className="font-semibold text-primary">What makes us your custom home builder?</p>
                        <h2 className="text-4xl font-bold text-primary mt-2">{activeContent.title}</h2>
                        <p className="mt-4 text-lg text-muted-foreground">{activeContent.description}</p>
                        <div className="relative pt-8 mt-8">
                            <div className="absolute top-0 left-0 w-full h-px bg-gray-300"></div>
                            <div className="absolute top-0 left-0 w-full h-px bg-primary" style={{ width: `${((activeIndex + 1) / whyUsContent.length) * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
                        </div>
                        <div className="flex justify-between mt-4">
                            {whyUsContent.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="text-left cursor-pointer group"
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <p className={`text-sm font-bold ${activeIndex === index ? 'text-primary' : 'text-muted-foreground'}`}>{item.id}</p>
                                    <p className={`text-sm font-semibold mt-1 group-hover:text-primary ${activeIndex === index ? 'text-primary' : 'text-muted-foreground'}`}>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        {contentImage && (
                            <motion.div
                                key={activeIndex}
                                className="relative w-64 h-64"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image src={contentImage.url} alt={contentImage.alt} fill className="object-contain" data-ai-hint={contentImage.hint} />
                            </motion.div>
                        )}
                        <div className="flex gap-4 mt-8">
                            <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full h-12 w-12 border-primary text-primary hover:bg-primary hover:text-white">
                                <ArrowLeft className="h-6 w-6" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full h-12 w-12 border-primary text-primary hover:bg-primary hover:text-white">
                                <ArrowRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function ContactBanner() {
    return (
        <section style={{ backgroundColor: 'hsl(var(--primary-dark))' }} className="py-16 sm:py-24 text-primary-foreground">
            <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div className="grid lg:grid-cols-2 gap-16 items-center" {...animation}>
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="white" />
                                </svg>
                            </div>
                            <h2 className="text-5xl font-bold pt-10">We love hearing from you.</h2>
                        </div>
                        <p className="text-primary-foreground/80 text-lg">
                            Our team maintains subtle accessibility and working relationships which guarantee our clients full-time attention whenever they need our help.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <Card className="bg-primary text-primary-foreground border border-primary-foreground/20 rounded-xl shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-sm text-primary-foreground/80">Call Us or Send Text</p>
                                        <a href="tel:+2347086127064" className="text-2xl font-bold hover:underline">+234 708 612 7064</a>
                                        <Button variant="link" className="p-0 h-auto text-white mt-2 block">Get reply immediately</Button>
                                    </div>
                                    <Phone className="text-primary-foreground/50 mt-1" />
                                </div>
                                <p className="text-sm text-primary-foreground/60 mt-4 pt-4 border-t border-primary-foreground/20">Office Operating Hours: Monday - Friday 8am - 4pm</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary text-primary-foreground border border-primary-foreground/20 rounded-xl shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-sm text-primary-foreground/80">Email Us</p>
                                        <a href="mailto:info@fullancehomes.com" className="text-2xl font-bold hover:underline">info@fullancehomes.com</a>
                                        <Button variant="link" className="p-0 h-auto text-white mt-2 block">Get reply within 24hrs</Button>
                                    </div>
                                    <Mail className="text-primary-foreground/50 mt-1" />
                                </div>
                                <p className="text-sm text-primary-foreground/60 mt-4 pt-4 border-t border-primary-foreground/20">Inspections: Tuesday, Thursday & Saturday</p>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default function BuildPage() {
    return (
        <div className="bg-white">
            <HeroSection />
            <CustomHomeBuilder />
            <ContactBanner />
        </div>
    );
}