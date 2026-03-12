"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, Lightbulb, Bug } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FeedbackPage() {
  const [loading, setLoading] = useState(false);
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you for your feedback!");
      setContent("");
    }, 1200);
  };

  return (
    <div className="flex flex-1 flex-col p-6 lg:p-10 max-w-4xl mx-auto w-full gap-6">
      <div className="space-y-1 mb-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <MessageSquare className="text-primary size-8" />
          Share Your Feedback
        </h1>
        <p className="text-muted-foreground">
          At Evoc Labs, we build tools that work for you. Let us know how we can improve Orbit 360 to help your business grow.
        </p>
      </div>

      <Card className="border-2 shadow-sm">
        <CardHeader>
          <CardTitle>Send us your thoughts</CardTitle>
          <CardDescription>What kind of feedback do you have?</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                type="button"
                variant={feedbackType === "suggestion" ? "default" : "outline"}
                className={`h-auto flex-col items-center p-4 border-2 ${feedbackType === "suggestion" ? "border-primary" : "border-muted hover:border-primary/50"}`}
                onClick={() => setFeedbackType("suggestion")}
              >
                <Lightbulb className="mb-3 h-6 w-6" />
                Feature Request
              </Button>
              <Button
                type="button"
                variant={feedbackType === "bug" ? "default" : "outline"}
                className={`h-auto flex-col items-center p-4 border-2 ${feedbackType === "bug" ? "border-primary" : "border-muted hover:border-primary/50"}`}
                onClick={() => setFeedbackType("bug")}
              >
                <Bug className="mb-3 h-6 w-6" />
                Report a Bug
              </Button>
              <Button
                type="button"
                variant={feedbackType === "praise" ? "default" : "outline"}
                className={`h-auto flex-col items-center p-4 border-2 ${feedbackType === "praise" ? "border-primary" : "border-muted hover:border-primary/50"}`}
                onClick={() => setFeedbackType("praise")}
              >
                <ThumbsUp className="mb-3 h-6 w-6" />
                Share Praise
              </Button>
            </div>

            <div className="space-y-2 mt-6">
              <Label htmlFor="content">Your Feedback</Label>
              <Textarea 
                id="content" 
                placeholder={
                  feedbackType === 'suggestion' ? "I would love to see a feature that..." :
                  feedbackType === 'bug' ? "I found an issue when trying to..." :
                  "I just wanted to say that..."
                }
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Submitting..." : "Send Feedback"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
