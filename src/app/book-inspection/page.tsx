"use client";

import { useEffect, useState, useRef, useActionState } from 'react';
import Image from 'next/image';
import { useFormStatus } from "react-dom";
import { bookInspection } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { findImage } from '@/lib/placeholder-images';

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, CheckCircle, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : <>Submit <ArrowRight className="ml-2" /></>}
    </Button>
  );
}

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

export default function BookInspectionPage() {
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const [state, formAction] = useActionState(bookInspection, null);
  const formRef = useRef<HTMLFormElement>(null);
  const busImage = findImage('inspection-bus');

  useEffect(() => {
    if (state?.message === "success") {
      // Don't toast here, show the success component
    } else if (state?.message && state.message !== "success") {
      toast({
        title: "An error occurred",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  
  if (state?.message === "success") {
    return (
      <div className="bg-white py-16 sm:py-24">
        <div className="container max-w-2xl">
           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
             <Card className="text-center shadow-xl">
               <CardContent className="p-8 sm:p-12">
                 <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4"/>
                 <h1 className="text-3xl font-bold text-primary">Booking Confirmed!</h1>
                 <p className="mt-2 text-muted-foreground">Thank you for your interest. Our team will contact you shortly to confirm the details of your inspection.</p>
                 <Button asChild className="mt-6">
                    <a href="/properties">Explore More Properties</a>
                 </Button>
               </CardContent>
             </Card>
           </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...animation}>
                <h1 className="text-5xl font-extrabold text-primary">
                    Inspiring confidence for all of life's <span className="text-accent">property decisions.</span>
                </h1>
                {busImage && (
                    <div className="mt-8 relative aspect-video">
                        <Image src={busImage.url} alt={busImage.alt} fill className="object-cover rounded-lg" data-ai-hint={busImage.hint} />
                    </div>
                )}
            </motion.div>
            <motion.div {...animation} transition={{...animation.transition, delay: 0.2}}>
                 <Card className="shadow-2xl p-4 sm:p-8 bg-card">
                    <CardContent className="p-0">
                        <h2 className="text-xl font-bold text-primary mb-6">Please fill this form</h2>
                        <form ref={formRef} action={formAction} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="sr-only">First Name</Label>
                                    <Input id="firstName" name="firstName" placeholder="First Name" required />
                                    {state?.errors?.firstName && <p className="text-sm font-medium text-destructive">{state.errors.firstName[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="sr-only">Last Name</Label>
                                    <Input id="lastName" name="lastName" placeholder="Last Name" required />
                                    {state?.errors?.lastName && <p className="text-sm font-medium text-destructive">{state.errors.lastName[0]}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="sr-only">Phone Number</Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="Phone Number" required />
                                    {state?.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="state" className="sr-only">State</Label>
                                    <Input id="state" name="state" placeholder="State" required />
                                    {state?.errors?.state && <p className="text-sm font-medium text-destructive">{state.errors.state[0]}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="sr-only">Email Address</Label>
                                <Input id="email" name="email" type="email" placeholder="Email Address" required />
                                {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                <Label htmlFor="date" className="sr-only">Preferred Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                <Input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
                                {state?.errors?.date && <p className="text-sm font-medium text-destructive">{state.errors.date[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                <Label htmlFor="time" className="sr-only">Preferred Time</Label>
                                <Select name="time" required>
                                    <SelectTrigger><SelectValue placeholder="--- : ---" /></SelectTrigger>
                                    <SelectContent>
                                    {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {state?.errors?.time && <p className="text-sm font-medium text-destructive">{state.errors.time[0]}</p>}
                                </div>
                            </div>
                            <SubmitButton />
                        </form>
                    </CardContent>
                 </Card>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
