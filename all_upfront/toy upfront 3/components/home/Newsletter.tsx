"use client";

import { Send, Mail } from "lucide-react";

export default function Newsletter() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background with gradient and blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 z-0"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-full mb-6">
                        <Mail className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 font-display">
                        Join Our Happy Family!
                    </h2>
                    <p className="text-xl text-white/90 mb-10 font-medium">
                        Get expert parenting tips, fun activity ideas, and exclusive offers delivered straight to your inbox. No spam, just joy! ✨
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-6 py-4 rounded-full bg-white/95 text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-accent/50 shadow-lg text-lg"
                        />
                        <button className="px-8 py-4 bg-foreground text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 text-lg">
                            Subscribe <Send className="w-5 h-5" />
                        </button>
                    </form>

                    <p className="mt-6 text-white/70 text-sm">
                        By subscribing, you agree to our Terms & Conditions.
                    </p>
                </div>
            </div>
        </section>
    );
}
