"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 20, x: "-50%" }}
                    className="fixed bottom-6 left-1/2 z-[100] bg-[#0c0c0c] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl w-auto max-w-[90vw] border border-white/10"
                >
                    <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium tracking-wide truncate flex-1">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
