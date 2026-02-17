"use client";

import { MapPin } from "lucide-react";

export default function AddressForm() {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-sm shadow-sm border border-gray-100">
            <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                <MapPin className="w-5 h-5 text-gold-500" />
                Shipping Address
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                    <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="e.g. John Doe"
                        className="w-full border-b border-gray-200 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder="+91 99999 99999"
                        className="w-full border-b border-gray-200 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                </div>

                {/* Alternate Phone (Optional) */}
                <div>
                    <label htmlFor="altPhone" className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                        Alternate Phone <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                    </label>
                    <input
                        type="tel"
                        id="altPhone"
                        placeholder="+91 88888 88888"
                        className="w-full border-b border-gray-200 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                </div>

                {/* Pincode */}
                <div>
                    <label htmlFor="pincode" className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                        Pincode
                    </label>
                    <input
                        type="text"
                        id="pincode"
                        placeholder="110001"
                        maxLength={6}
                        className="w-full border-b border-gray-200 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                </div>

                {/* City */}
                <div>
                    <label htmlFor="city" className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        placeholder="e.g. New Delhi"
                        className="w-full border-b border-gray-200 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                </div>

                {/* State */}
                <div className="md:col-span-2">
                    <label htmlFor="state" className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                        State
                    </label>
                    <select
                        id="state"
                        className="w-full border-b border-gray-200 py-2 text-sm text-black focus:outline-none focus:border-black transition-colors bg-transparent appearance-none"
                    >
                        <option value="">Select State</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        {/* Add more states as needed */}
                    </select>
                </div>

                {/* Full Address */}
                <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                        Address (House No, Building, Street, Area)
                    </label>
                    <textarea
                        id="address"
                        rows={3}
                        placeholder="e.g. Flat 302, Heavenly Apartments, MG Road"
                        className="w-full border-b border-gray-200 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent resize-none"
                    />
                </div>

                {/* Landmark (Optional) */}
                <div className="md:col-span-2">
                    <label htmlFor="landmark" className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                        Landmark <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        id="landmark"
                        placeholder="e.g. Near Central Park"
                        className="w-full border-b border-gray-200 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                </div>
            </form>
        </div>
    );
}
