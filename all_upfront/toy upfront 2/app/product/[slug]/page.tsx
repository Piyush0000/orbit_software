"use client";

import { useState } from "react";
import { Star, ShieldCheck, Heart, Share2, Truck, RefreshCcw, Package, User, HelpCircle } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/data";
import { useParams } from "next/navigation";
import confetti from "canvas-confetti";

export default function ProductPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const product = products.find(p => p.id === slug) || products[0];

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("desc");
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();

    const images = product.images || [product.image || "/images/placeholder.png"];

    const isWishlisted = isInWishlist(product.id);

    const handleWishlistClick = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });

        // Confetti explosion from the button
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y },
            colors: ['#88D498', '#F4A261', '#E0C3FC', '#FFF9F5'],
            disableForReducedMotion: true
        });
    };

    const reviews = [
        {
            id: 1,
            user: "Priya S.",
            rating: 5,
            date: "Jan 12, 2024",
            comment: "My son absolutely loves this! He's been building different robots for days. The quality is great."
        },
        {
            id: 2,
            user: "Rahul M.",
            rating: 4,
            date: "Dec 28, 2023",
            comment: "Good kit, instructions are clear. Delivery was a bit slow but worth the wait."
        },
        {
            id: 3,
            user: "Anita K.",
            rating: 5,
            date: "Feb 02, 2024",
            comment: "Best gift for my nephew. He is learning so much about gears and mechanics."
        }
    ];

    const qna = [
        {
            id: 1,
            question: "Is this suitable for a 6 year old?",
            answer: "The recommended age is 8+ due to some small parts and complexity, but with adult supervision, a 6-year-old could enjoy it.",
            user: "Parent123"
        },
        {
            id: 2,
            question: "Do batteries come included?",
            answer: "No, this kit requires 2 AA batteries which are not included in the box.",
            user: "RoboFan"
        }
    ];

    if (!product) return <div>Product not found</div>;

    return (
        <div className="bg-white pb-20">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
                <span>Home</span> / <span>Toys</span> / <span className="text-gray-900 font-medium">{product.name}</span>
            </div>

            <div className="container mx-auto px-4 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-contain" />
                            {product.badge && (
                                <div className="absolute top-4 left-4 bg-accent text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                                    {product.badge}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-primary" : "border-transparent hover:border-gray-200"
                                        }`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                Ages {product.age}
                            </span>
                            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                                <Package className="w-4 h-4" /> In Stock
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current text-gray-300" />
                            </div>
                            <span className="text-sm text-gray-500 underline">{product.reviews} Reviews</span>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 mb-8">
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                                )}
                                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                                    In Stock
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">Includes all taxes. Free shipping on this item.</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex gap-4">
                                <div className="flex items-center border border-gray-200 rounded-full">
                                    <button
                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-full transition-colors"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                                    <button
                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-full transition-colors"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button onClick={handleAddToCart} className="flex-1 bg-primary text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-primary/30 active:scale-95">
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleWishlistClick}
                                    className={`p-3 border rounded-full transition-colors ${isWishlisted ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-red-500"}`}
                                >
                                    <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                                </button>
                            </div>
                            <button className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-full hover:bg-gray-800 transition-colors">
                                Buy Now
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {/* ... Badges ... */}
                            <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-green-500" />
                                <span className="text-sm font-medium text-gray-700">Safety Certified</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                                <Truck className="w-6 h-6 text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                                <RefreshCcw className="w-6 h-6 text-orange-500" />
                                <span className="text-sm font-medium text-gray-700">Easy Returns</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-purple-500" />
                                <span className="text-sm font-medium text-gray-700">Non-Toxic</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-16 mb-12">
                    <div className="flex border-b border-gray-200 mb-8 overflow-auto">
                        <button
                            className={`px-8 py-4 font-bold text-lg border-b-2 transition-colors whitespace-nowrap ${activeTab === "desc" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900"}`}
                            onClick={() => setActiveTab("desc")}
                        >
                            Description
                        </button>
                        <button
                            className={`px-8 py-4 font-bold text-lg border-b-2 transition-colors whitespace-nowrap ${activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900"}`}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews ({product.reviews})
                        </button>
                        <button
                            className={`px-8 py-4 font-bold text-lg border-b-2 transition-colors whitespace-nowrap ${activeTab === "qna" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900"}`}
                            onClick={() => setActiveTab("qna")}
                        >
                            Q&A
                        </button>
                    </div>

                    {activeTab === "desc" && (
                        <div className="prose max-w-none text-gray-600">
                            <p className="text-lg mb-4">
                                {product.description || "Product description unavailable."}
                            </p>
                            {product.features && (
                                <>
                                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Key Features:</h3>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {product.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                <User className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{review.user}</h4>
                                                <div className="flex items-center text-yellow-400 text-xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-400">{review.date}</span>
                                    </div>
                                    <p className="text-gray-600 ml-13 pl-13 md:pl-0 md:ml-12">{review.comment}</p>
                                </div>
                            ))}
                            <button className="text-primary font-bold hover:underline mt-4">Read All Reviews →</button>
                        </div>
                    )}

                    {activeTab === "qna" && (
                        <div className="space-y-6">
                            {/* Search Q&A */}
                            <div className="relative mb-6">
                                <input type="text" placeholder="Have a question? Search for answers" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                <HelpCircle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>

                            {qna.map((item) => (
                                <div key={item.id} className="border-b border-gray-100 pb-6 last:border-0">
                                    <div className="flex gap-2 mb-2">
                                        <span className="font-bold text-gray-900">Q:</span>
                                        <span className="font-bold text-gray-900">{item.question}</span>
                                    </div>
                                    <div className="flex gap-2 text-gray-600">
                                        <span className="font-bold">A:</span>
                                        <span>{item.answer}</span>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
                                        <span>Asked by {item.user}</span>
                                        <span>|</span>
                                        <button className="hover:text-primary">Helpful?</button>
                                    </div>
                                </div>
                            ))}

                            <div className="bg-gray-50 p-6 rounded-xl text-center mt-8">
                                <h4 className="font-bold text-gray-900 mb-2">Don't see the answer you're looking for?</h4>
                                <button className="px-6 py-2 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                                    Ask a Question
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Similar Products */}
                <div className="mt-24">
                    <h2 className="text-2xl font-bold font-display text-gray-900 mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {products.slice(0, 4).map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
