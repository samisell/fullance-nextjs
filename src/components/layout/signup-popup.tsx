"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

import { findImage } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : "Get Started"}
    </Button>
  );
}

function SignupForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [state, setState] = useState<{ message: string; errors?: any } | null>(null);
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
        <h2 className="text-2xl font-bold text-primary">Thank You!</h2>
        <p className="mt-2 text-muted-foreground">Your message has been sent. We will get back to you shortly.</p>
        <Button onClick={() => setOpen(false)} className="mt-6">Close</Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="popup-fullName">Full Name</Label>
        <Input id="popup-fullName" name="fullName" placeholder="John Doe" required />
        {state?.errors?.fullName && <p className="text-sm font-medium text-destructive">{state.errors.fullName[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="popup-email">Email Address</Label>
        <Input id="popup-email" name="email" type="email" placeholder="you@example.com" required />
        {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="popup-phone">Phone Number</Label>
        <Input id="popup-phone" name="phone" type="tel" placeholder="+234 801 234 5678" required />
        {state?.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Submitting..." : "Get Started"}
      </Button>
    </form>
  );
}

export default function SignupPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const buildImage = findImage('explore-build-house');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDialogOpen) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isDialogOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50 w-full max-w-sm"
    >
      <Card className="shadow-2xl overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full bg-black/20 text-white hover:bg-black/40"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close popup</span>
        </Button>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 items-center">
            <div className="p-6">
              <p className="font-semibold text-primary mb-4">Sign up to experience our tradition of opportunities!</p>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">Get Started</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">Get Started</DialogTitle>
                  </DialogHeader>
                  <SignupForm setOpen={setIsDialogOpen} />
                </DialogContent>
              </Dialog>

            </div>
            <div className="relative h-full min-h-[160px]">
              {buildImage && (
                <Image
                  src={buildImage.url}
                  alt={buildImage.alt}
                  fill
                  className="object-cover"
                  data-ai-hint={buildImage.hint}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}