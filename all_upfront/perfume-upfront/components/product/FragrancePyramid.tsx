"use client";

import { motion } from "framer-motion";

interface FragrancePyramidProps {
    topNotes: string[];
    middleNotes: string[];
    baseNotes: string[];
}

export default function FragrancePyramid({ topNotes, middleNotes, baseNotes }: FragrancePyramidProps) {
    return (
        <div className="py-12 bg-gray-50/50 rounded-sm">
            <div className="text-center mb-10">
                <h3 className="font-serif text-2xl text-gray-900 mb-2">Olfactory Pyramid</h3>
                <p className="text-sm text-gray-500">The Scent Journey</p>
            </div>

            <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-8">

                {/* Top Notes */}
                <div className="text-center relative w-full">
                    <span className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-gold-500 rotate-[-90deg] hidden md:block">Top Notes</span>
                    <span className="md:hidden block mb-4 text-xs font-bold uppercase tracking-widest text-gold-500">Top Notes</span>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center gap-4"
                    >
                        {topNotes.map((note, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group">
                                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:border-gold-300 transition-colors">
                                    {/* Placeholder for Note Icon - Using first letter for now */}
                                    <span className="font-serif text-xl text-gray-400 group-hover:text-gold-500">{note[0]}</span>
                                </div>
                                <span className="text-xs text-gray-600 font-medium">{note}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Connecting Line */}
                <div className="w-px h-8 bg-gold-200"></div>

                {/* Middle Notes */}
                <div className="text-center relative w-full">
                    <span className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-gold-600 rotate-[-90deg] hidden md:block">Heart Notes</span>
                    <span className="md:hidden block mb-4 text-xs font-bold uppercase tracking-widest text-gold-600">Heart Notes</span>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center gap-6"
                    >
                        {middleNotes.map((note, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group">
                                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:border-gold-400 transition-colors">
                                    <span className="font-serif text-2xl text-gray-400 group-hover:text-gold-600">{note[0]}</span>
                                </div>
                                <span className="text-xs text-gray-600 font-medium">{note}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Connecting Line */}
                <div className="w-px h-8 bg-gold-200"></div>

                {/* Base Notes */}
                <div className="text-center relative w-full">
                    <span className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-gold-600 rotate-[-90deg] hidden md:block">Base Notes</span>
                    <span className="md:hidden block mb-4 text-xs font-bold uppercase tracking-widest text-gold-600">Base Notes</span>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex justify-center gap-8"
                    >
                        {baseNotes.map((note, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group">
                                <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:border-gold-500 transition-colors">
                                    <span className="font-serif text-3xl text-gray-400 group-hover:text-gold-700">{note[0]}</span>
                                </div>
                                <span className="text-xs text-gray-600 font-medium">{note}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
