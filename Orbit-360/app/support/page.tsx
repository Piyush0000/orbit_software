"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy, FileQuestion, BookOpen, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SupportPage() {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Support ticket created!");
      setSubject("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="flex flex-1 flex-col p-6 lg:p-10 max-w-7xl mx-auto w-full gap-6">
      <div className="space-y-1 mb-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <LifeBuoy className="text-primary size-8" />
          Evoc Labs Support
        </h1>
        <p className="text-muted-foreground">
          How can we help you today? Explore our resources or open a ticket.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-blue-100 text-blue-600 size-12 rounded-full flex items-center justify-center mb-2">
              <BookOpen className="size-6" />
            </div>
            <CardTitle className="text-lg">Documentation</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Browse our technical guides, API references, and setup tutorials to get the most out of Orbit.
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-green-100 text-green-600 size-12 rounded-full flex items-center justify-center mb-2">
              <FileQuestion className="size-6" />
            </div>
            <CardTitle className="text-lg">FAQs</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Find answers to commonly asked questions regarding billing, integrations, and shipping.
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-purple-100 text-purple-600 size-12 rounded-full flex items-center justify-center mb-2">
              <MessageCircle className="size-6" />
            </div>
            <CardTitle className="text-lg">Community Forum</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Join the Evoc Labs community to discuss strategies, share tips, and learn from other merchants.
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-sm max-w-3xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Open a Support Ticket</CardTitle>
          <CardDescription>If you couldn't find your answer in our resources, send us a secure message.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                placeholder="Brief summary of your issue" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Detailed Description</Label>
              <Textarea 
                id="message" 
                placeholder="Please describe your issue in as much detail as possible. Include any relevant tracking numbers or order IDs..." 
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Ticket"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
