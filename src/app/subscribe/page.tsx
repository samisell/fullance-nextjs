"use client";

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from "react-dom";
import { getProperties } from '@/lib/data';
import { subscribeInterest } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle } from 'lucide-react';

const properties = getProperties();
const budgetRanges = ["₦10M - ₦50M", "₦50M - ₦150M", "₦150M - ₦300M", "₦300M+"];
const purposes = ["Investment", "Residential"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={pending}>
      {pending ? "Submitting..." : "Submit Interest"}
    </Button>
  );
}

export default function SubscribePage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(subscribeInterest, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message === "success") {
      // Show success view
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
                 <h1 className="text-3xl font-bold text-primary">Thank You!</h1>
                 <p className="mt-2 text-muted-foreground">Your interest has been registered. We will keep you updated on new properties and investment opportunities.</p>
                 <Button asChild className="mt-6">
                    <a href="/properties">Explore Properties</a>
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
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-extrabold text-primary">Register Your Interest</CardTitle>
              <CardDescription>Join our list of savvy investors and future homeowners. Get priority updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" placeholder="John Doe" required />
                    {state?.errors?.fullName && <p className="text-sm font-medium text-destructive">{state.errors.fullName[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+234 801 234 5678" required />
                     {state?.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                  {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyOfInterest">Property of Interest (Optional)</Label>
                    <Select name="propertyOfInterest">
                      <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Any">Any</SelectItem>
                        {properties.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range (Optional)</Label>
                    <Select name="budget">
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Purpose</Label>
                  <RadioGroup name="purpose" defaultValue="Investment" className="flex space-x-4">
                    {purposes.map(p => (
                      <div key={p} className="flex items-center space-x-2">
                        <RadioGroupItem value={p} id={`purpose-${p}`} />
                        <Label htmlFor={`purpose-${p}`}>{p}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
