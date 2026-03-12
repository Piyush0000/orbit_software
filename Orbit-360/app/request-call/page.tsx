"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhoneCall, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RequestCallPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Call request submitted successfully");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 lg:p-10">
        <Card className="max-w-md w-full text-center p-6 border-2">
          <CardHeader>
            <div className="mx-auto bg-green-100 text-green-600 size-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="size-8" />
            </div>
            <CardTitle className="text-2xl">Request Received</CardTitle>
            <CardDescription>
              We've received your request. An Evoc Labs representative will call you shortly at the provided number.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => setSubmitted(false)} variant="outline">
              Request Another Call
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col p-6 lg:p-10 max-w-2xl mx-auto w-full">
      <div className="space-y-1 mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <PhoneCall className="text-primary size-8" />
          Request a Call
        </h1>
        <p className="text-muted-foreground">
          Need immediate assistance? Leave your details below and our team will get back to you as soon as possible.
        </p>
      </div>

      <Card className="border-2 shadow-sm">
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
          <CardDescription>Fill out the form below to schedule a call with Evoc Labs.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">What would you like to discuss?</Label>
              <Input id="topic" placeholder="e.g. Sales, Support, Integration Help" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea 
                id="details" 
                placeholder="Briefly explain what you need help with so we can connect you to the right person..." 
                rows={4} 
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Submitting..." : "Schedule Call"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
