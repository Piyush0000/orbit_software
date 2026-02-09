"use client";

import { useState, ChangeEvent } from "react";
import { Product } from "@/lib/products";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";

interface ProductFAQProps {
    product: Product;
}

export function ProductFAQ({ product }: ProductFAQProps) {
    const [question, setQuestion] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setQuestion("");
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    const faqs = product.faqs || [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* FAQ List Section */}
            <div className="md:col-span-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-serif font-bold">Frequently Asked Questions</h3>
                </div>

                {faqs.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b-border/50">
                                <AccordionTrigger className="text-left font-medium text-lg hover:text-primary transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="text-center py-12 bg-secondary/10 rounded-xl">
                        <p className="text-muted-foreground">No questions yet. Be the first to ask!</p>
                    </div>
                )}
            </div>

            {/* Ask Question Section */}
            <div className="md:col-span-4">
                <div className="bg-secondary/20 p-6 rounded-2xl sticky top-24">
                    <h4 className="text-lg font-bold font-serif mb-2">Have a Question?</h4>
                    <p className="text-sm text-muted-foreground mb-6">
                        Ask about the product details, usage, or ingredients.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Textarea
                                placeholder="Type your question here..."
                                value={question}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
                                className="min-h-[100px] bg-background resize-none focus-visible:ring-primary"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full gap-2"
                            disabled={isSubmitting || !question.trim()}
                        >
                            {isSubmitting ? (
                                "Sending..."
                            ) : (
                                <>
                                    <Send className="w-4 h-4" /> Ask Question
                                </>
                            )}
                        </Button>

                        {showSuccess && (
                            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center animate-in fade-in slide-in-from-top-2">
                                Thanks! Your question has been submitted.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
