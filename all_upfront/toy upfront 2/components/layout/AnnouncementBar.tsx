"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AnnouncementBar() {
  const announcements = [
    "🎉 Free Shipping on Orders Over ₹999!",
    "🚀 New Robot Kits Just Arrived - Shop Now",
    "🎁 Get 10% Off Your First Order with Code: TOY10"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="bg-gray-900 text-white text-xs md:text-sm font-medium py-2 relative overflow-hidden">
      <div className="container mx-auto px-4 flex items-center justify-center relative z-10">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length)}
          className="absolute left-4 p-1 hover:bg-white/10 rounded-full transition-colors hidden md:block"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="transition-all duration-500 ease-in-out transform animate-in fade-in slide-in-from-bottom-2">
          {announcements[current]}
        </div>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % announcements.length)}
          className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors hidden md:block"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
