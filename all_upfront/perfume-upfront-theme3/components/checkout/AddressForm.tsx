"use client";

import { MapPin } from "lucide-react";

export default function AddressForm() {
    return (
        <div className="bg-[#EAE5D8] p-6 sm:p-8 rounded-sm shadow-sm border border-[#d7ccc8]">
            <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2 text-[#2C2621]">
                <MapPin className="w-5 h-5 text-[#8D6E63]" />
                Shipping Address
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                    <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8D6E63] mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="e.g. John Doe"
                        className="w-full border-b border-[#2C2621]/20 py-2 text-sm text-[#2C2621] placeholder:text-[#5D554A]/30 focus:outline-none focus:border-[#2C2621] transition-colors bg-transparent"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8D6E63] mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder="+91 99999 99999"
                        className="w-full border-b border-[#2C2621]/20 py-2 text-sm text-[#2C2621] placeholder:text-[#5D554A]/30 focus:outline-none focus:border-[#2C2621] transition-colors bg-transparent"
                    />
                </div>

                {/* Alternate Phone (Optional) */}
                <div>
                    <label htmlFor="altPhone" className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8D6E63] mb-2">
                        Alternate Phone <span className="text-[#5D554A]/40 font-normal normal-case tracking-normal">(Optional)</span>
                    </label>
                    <input
                        type="tel"
                        id="altPhone"
                        placeholder="+91 88888 88888"
                        className="w-full border-b border-[#2C2621]/20 py-2 text-sm text-[#2C2621] placeholder:text-[#5D554A]/30 focus:outline-none focus:border-[#2C2621] transition-colors bg-transparent"
                    />
                </div>

                {/* Pincode */}
                <div>
                    <label htmlFor="pincode" className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8D6E63] mb-2">
                        Pincode
                    </label>
                    <input
                        type="text"
                        id="pincode"
                        placeholder="110001"
                        maxLength={6}
                        className="w-full border-b border-[#2C2621]/20 py-2 text-sm text-[#2C2621] placeholder:text-[#5D554A]/30 focus:outline-none focus:border-[#2C2621] transition-colors bg-transparent"
                    />
                </div>

                {/* City */}
                <div>
                    <label htmlFor="city" className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8D6E63] mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        placeholder="e.g. New Delhi"
                        className="w-full border-b border-[#2C2621]/20 py-2 text-sm text-[#2C2621] placeholder:text-[#5D554A]/30 focus:outline-none focus:border-[#2C2621] transition-colors bg-transparent"
                    />
                </div>

                {/* State */}
                <div className="md:col-span-2">
                    <label htmlFor="state" className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8D6E63] mb-2">
                        State
                    </label>
                    <div className="relative">
                        <select
                            id="state"
                            className="w-full border-b border-[#2C2621]/20 py-2 text-sm text-[#2C2621] focus:outline-none focus:border-[#2C2621] transition-colors bg-transparent appearance-none cursor-pointer"
                        >
                            <option value="" className="bg-[#EAE5D8] text-[#2C2621]">Select State</option>
                            <option value="Delhi" className="bg-[#EAE5D8] text-[#2C2621]">Delhi</option>
                            <option value="Maharashtra" className="bg-[#EAE5D8] text-[#2C2621]">Maharashtra</option>
                            <option value="Karnataka" className="bg-[#EAE5D8] text-[#2C2621]">Karnataka</option>
                            <option value="Uttar Pradesh" className="bg-[#EAE5D8] text-[#2C2621]">Uttar Pradesh</option>
                            {/* Add more states as needed */}
                        </select>
                    </div>
                </div>

                {/* Full Address */}
                <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8D6E63] mb-2">
                        Address (House No, Building, Street, Area)
                    </label>
                    <textarea
                        id="address"
                        rows={3}
                        placeholder="e.g. Flat 302, Heavenly Apartments, MG Road"
                        className="w-full border-b border-[#2C2621]/20 py-2 text-sm text-[#2C2621] placeholder:text-[#5D554A]/30 focus:outline-none focus:border-[#2C2621] transition-colors bg-transparent resize-none"
                    />
                </div>

                {/* Landmark (Optional) */}
                <div className="md:col-span-2">
                    <label htmlFor="landmark" className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8D6E63] mb-2">
                        Landmark <span className="text-[#5D554A]/40 font-normal normal-case tracking-normal">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        id="landmark"
                        placeholder="e.g. Near Central Park"
                        className="w-full border-b border-[#2C2621]/20 py-2 text-sm text-[#2C2621] placeholder:text-[#5D554A]/30 focus:outline-none focus:border-[#2C2621] transition-colors bg-transparent"
                    />
                </div>
            </form>
        </div>
    );
}
