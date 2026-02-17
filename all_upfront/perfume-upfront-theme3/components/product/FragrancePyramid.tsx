"use client";

import { motion } from "framer-motion";

interface FragrancePyramidProps {
    topNotes: string[];
    middleNotes: string[];
    baseNotes: string[];
}

export default function FragrancePyramid({ topNotes, middleNotes, baseNotes }: FragrancePyramidProps) {
    return (
        <div className="py-16 bg-[#EAE5D8] rounded-sm relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>

            <div className="text-center mb-16 relative z-10">
                <h3 className="font-serif text-3xl text-[#2C2621] mb-2">Olfactory Pyramid</h3>
                <p className="text-sm text-[#8D6E63] tracking-widest uppercase">The Scent Journey</p>
            </div>

            <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-12 z-10">

                {/* Top Notes */}
                <div className="text-center relative w-full">
                    <span className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5D554A] rotate-[-90deg] hidden md:block opacity-60">Top Notes</span>
                    <span className="md:hidden block mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5D554A]">Top Notes</span>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center gap-6"
                    >
                        {topNotes.map((note, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 group">
                                <div className="w-20 h-20 rounded-full bg-[#F5F1E8] shadow-sm flex items-center justify-center border border-[#d7ccc8] group-hover:border-[#8d6e63] group-hover:scale-105 transition-all duration-500">
                                    <span className="font-serif text-2xl text-[#8d6e63] group-hover:text-[#2C2621] transition-colors">{note[0]}</span>
                                </div>
                                <span className="text-xs text-[#5D554A] font-medium tracking-wide group-hover:text-[#2C2621] transition-colors">{note}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Connecting Line */}
                <div className="w-px h-12 bg-[#BFA070]/30"></div>

                {/* Middle Notes */}
                <div className="text-center relative w-full">
                    <span className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#4A4238] rotate-[-90deg] hidden md:block opacity-80">Heart Notes</span>
                    <span className="md:hidden block mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#4A4238]">Heart Notes</span>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center gap-8"
                    >
                        {middleNotes.map((note, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 group">
                                <div className="w-24 h-24 rounded-full bg-[#F5F1E8] shadow-sm flex items-center justify-center border border-[#d7ccc8] group-hover:border-[#8d6e63] group-hover:scale-105 transition-all duration-500">
                                    <span className="font-serif text-3xl text-[#5D554A] group-hover:text-[#2C2621] transition-colors">{note[0]}</span>
                                </div>
                                <span className="text-xs text-[#5D554A] font-medium tracking-wide group-hover:text-[#2C2621] transition-colors">{note}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Connecting Line */}
                <div className="w-px h-12 bg-[#BFA070]/30"></div>

                {/* Base Notes */}
                <div className="text-center relative w-full">
                    <span className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2C2621] rotate-[-90deg] hidden md:block">Base Notes</span>
                    <span className="md:hidden block mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2C2621]">Base Notes</span>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex justify-center gap-10"
                    >
                        {baseNotes.map((note, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 group">
                                <div className="w-28 h-28 rounded-full bg-[#F5F1E8] shadow-sm flex items-center justify-center border border-[#d7ccc8] group-hover:border-[#8d6e63] group-hover:scale-105 transition-all duration-500">
                                    <span className="font-serif text-4xl text-[#4A4238] group-hover:text-[#2C2621] transition-colors">{note[0]}</span>
                                </div>
                                <span className="text-xs text-[#5D554A] font-medium tracking-wide group-hover:text-[#2C2621] transition-colors">{note}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
