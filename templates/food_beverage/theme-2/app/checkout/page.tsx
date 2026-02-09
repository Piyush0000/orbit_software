"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, ShieldCheck, CreditCard, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
    const { cart, subtotal, clearCart } = useCart()
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const router = useRouter()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zip: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handlePayNow = async () => {
        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.zip) {
            alert("Please fill in all shipping details to proceed.")
            return
        }

        setIsProcessing(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsProcessing(false)
        setOrderPlaced(true)
        clearCart()

        // Redirect after delay
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-zinc-50/50">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-2">Order Confirmed!</h1>
                <p className="text-zinc-500 max-w-sm mb-8 font-medium">
                    Thank you for your purchase, {formData.firstName}. Your order is on its way.
                </p>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Redirecting to home...</p>
            </div>
        )
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-2">Your Bag is Empty</h1>
                <p className="text-zinc-500 max-w-sm mb-8 font-medium">
                    Add some delicious items to proceed to checkout.
                </p>
                <Link href="/categories/all">
                    <Button size="lg" className="font-black uppercase tracking-[0.2em] px-10 h-14 rounded-none">
                        Explore Menu
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-background min-h-screen pb-20">
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/cart" className="hover:text-primary transition-colors">Bag</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-zinc-900">Checkout</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Main Checkout Form */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Shipping Section */}
                        <div className="bg-card border border-border shadow-sm p-8">
                            <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 mb-6">Shipping Details</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest text-zinc-500">First Name</Label>
                                    <Input id="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" className="h-12 rounded-none border-zinc-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-xs font-black uppercase tracking-widest text-zinc-500">Last Name</Label>
                                    <Input id="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" className="h-12 rounded-none border-zinc-200" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-zinc-500">Email Address</Label>
                                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="h-12 rounded-none border-zinc-200" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-zinc-500">Street Address</Label>
                                    <Input id="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St" className="h-12 rounded-none border-zinc-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-xs font-black uppercase tracking-widest text-zinc-500">City</Label>
                                    <Input id="city" value={formData.city} onChange={handleInputChange} placeholder="New York" className="h-12 rounded-none border-zinc-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip" className="text-xs font-black uppercase tracking-widest text-zinc-500">Zip Code</Label>
                                    <Input id="zip" value={formData.zip} onChange={handleInputChange} placeholder="10001" className="h-12 rounded-none border-zinc-200" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="bg-card border border-border shadow-sm p-8">
                            <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 mb-6">Payment</h2>
                            <div className="flex gap-4 mb-4">
                                <div className="border-2 border-primary bg-primary/5 p-4 flex items-center gap-3 w-full cursor-pointer">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    <span className="font-bold text-zinc-900">Credit Card</span>
                                    <div className="ml-auto w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-500">Card Number</Label>
                                    <Input placeholder="0000 0000 0000 0000" className="h-12 rounded-none border-zinc-200" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-500">Expiry</Label>
                                        <Input placeholder="MM/YY" className="h-12 rounded-none border-zinc-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-500">CVC</Label>
                                        <Input placeholder="123" className="h-12 rounded-none border-zinc-200" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        <div className="bg-zinc-900 text-white p-8">
                            <h2 className="text-xl font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-zinc-800 shrink-0 border border-white/10">
                                            <Image src={item.image[0]} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{item.name}</p>
                                            <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                                            <p className="text-sm font-black text-primary mt-1">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 mb-8 pt-4 border-t border-white/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Subtotal</span>
                                    <span className="font-black tracking-tighter">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Shipping</span>
                                    <span className="text-green-400 font-bold uppercase tracking-widest text-[10px]">Free</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <span className="text-lg font-black uppercase tracking-tighter">Total</span>
                                    <span className="text-3xl font-black text-primary tracking-tighter">₹{subtotal}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handlePayNow}
                                disabled={isProcessing}
                                className="w-full h-16 text-lg font-black uppercase tracking-[0.2em] group rounded-none bg-primary hover:bg-primary/90 text-white border-none"
                            >
                                {isProcessing ? "Processing..." : "Pay Now"}
                                {!isProcessing && <CreditCard className="ml-2 w-5 h-5" />}
                            </Button>
                        </div>

                        <div className="bg-card border border-border p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tighter text-zinc-900">Secure Checkout</p>
                                    <p className="text-[10px] font-medium text-zinc-500">SSL Encrypted Payment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
