"use client"


import Link from "next/link"
import { ShoppingBag, ArrowRight, Trash2, Truck, ShieldCheck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { QuantitySelector } from "@/components/ui/product-utils"
import { TrustBadge } from "@/components/ui/custom-badges"
import { useStorefront } from "@/context/StorefrontContext"

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart()
    const { products } = useStorefront()

    // Dummy cross-sell data
    const crossSells = products
        .filter(p => p.category.toLowerCase().includes("beverage") || p.category.toLowerCase().includes("snack"))
        .slice(0, 4)

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-zinc-50 flex items-center justify-center border border-dashed border-zinc-200 mb-6">
                    <ShoppingBag className="w-10 h-10 text-zinc-300" />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-2">Your Bag is Empty</h1>
                <p className="text-zinc-500 max-w-sm mb-8 font-medium">
                    Looks like you haven't discovered our delicious snacks and beverages yet. Let's change that!
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
        <div className="bg-zinc-50/50 min-h-screen pb-20">
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-zinc-900">Your Bag</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Main Cart Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">Review Your Bag</h1>
                                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                                        {totalItems} Items selected
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 border border-green-100">
                                    <Truck className="w-4 h-4 text-green-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-700">Estimated Delivery: 30-45 Mins</span>
                                </div>
                            </div>

                            <div className="divide-y divide-zinc-100">
                                {cart.map((item) => (
                                    <div key={item.id} className="p-8 flex gap-6 items-center">
                                        <div className="relative w-32 h-32 bg-zinc-50 shrink-0 border border-zinc-100 overflow-hidden group">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.image || (item.images && item.images[0]) || '/placeholder.png'}
                                                alt={item.name}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-1">{item.name}</h3>
                                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{item.category}</p>
                                                </div>
                                                <p className="text-xl font-black text-zinc-900 tracking-tighter">₹{item.priceNum * item.quantity}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-6">
                                                <QuantitySelector
                                                    quantity={item.quantity}
                                                    onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                                                    onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                                                />
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cross-Sell Section */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900">Complement Your Meal</h2>
                                <div className="h-px flex-1 bg-zinc-200 mx-6" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {crossSells.map((product) => (
                                    <div key={product.id} className="bg-white border border-zinc-100 p-4 transition-all hover:shadow-lg group">
                                        <div className="relative aspect-square mb-4 bg-zinc-50 overflow-hidden">
                                             {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={product.image || (product.images && product.images[0]) || '/placeholder.png'} alt={product.name} className="object-cover w-full h-full transition-transform group-hover:scale-110" />
                                        </div>
                                        <h4 className="text-xs font-black uppercase tracking-tighter text-zinc-900 truncate mb-1">{product.name}</h4>
                                        <p className="text-sm font-black text-primary tracking-tighter mb-3">₹{product.price}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full text-[10px] font-black uppercase tracking-widest h-8 rounded-none border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all"
                                        >
                                            Add +
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Checkout Summary Sidebar */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        <div className="bg-zinc-900 text-white p-8">
                            <h2 className="text-xl font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Items Total</span>
                                    <span className="font-black tracking-tighter">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Shipping</span>
                                    <span className="text-green-400 font-bold uppercase tracking-widest text-[10px]">Free Delivery</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Taxes</span>
                                    <span className="font-black tracking-tighter">₹0</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8 pt-6 border-t border-white/10">
                                <span className="text-lg font-black uppercase tracking-tighter">Net Amount</span>
                                <span className="text-3xl font-black text-primary tracking-tighter">₹{subtotal}</span>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full h-16 text-lg font-black uppercase tracking-[0.2em] group rounded-none">
                                    Proceed To Pay
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                                </Button>
                            </Link>
                        </div>

                        <div className="bg-white border border-zinc-200 p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tighter text-zinc-900">Secure Payments</p>
                                    <p className="text-[10px] font-medium text-zinc-500">Your transaction is encrypted & safe</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Truck className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tighter text-zinc-900">Contactless Delivery</p>
                                    <p className="text-[10px] font-medium text-zinc-500">Fast & zero-contact drop at your doorstep</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
