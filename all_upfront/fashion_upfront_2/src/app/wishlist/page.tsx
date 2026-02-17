'use client';

import { useWishlist } from '@/store/wishlistStore';
import { useCart } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { parseINRToNumber } from '@/lib/utils';
import { Product } from '@/types/product';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        const priceNum = parseINRToNumber(product.price);
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            priceNum: priceNum,
            image: product.image,
            shortDescription: product.description,
            size: product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined // Default to first size if available
        }, 1);
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col items-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-medium text-black uppercase tracking-tight mb-4">
                        Your Wishlist
                    </h1>
                    <div className="h-[1px] w-20 bg-black"></div>
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-50">
                        <h2 className="text-2xl font-heading uppercase mb-4">Your wishlist is empty</h2>
                        <p className="text-zinc-500 mb-8 font-light">Save items you love to revisit later.</p>
                        <Link
                            href="/products"
                            className="px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors inline-block"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {wishlist.map((product) => (
                            <div key={product.id} className="group flex flex-col">
                                <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden mb-4">
                                    <Link href={`/products/${product.id}`} className="block w-full h-full">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </Link>

                                    {/* Remove Button */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeFromWishlist(product.id);
                                        }}
                                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur hover:bg-white text-black rounded-full transition-all z-20"
                                        title="Remove from Wishlist"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    {/* Quick Add Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 hidden md:block">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={!product.stock}
                                            className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                        >
                                            {product.stock ? 'Add to Cart' : 'Out of Stock'}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between items-start">
                                        <Link href={`/products/${product.id}`} className="group-hover:underline decoration-1 underline-offset-4">
                                            <h3 className="text-sm font-bold text-black uppercase tracking-wide leading-tight">{product.name}</h3>
                                        </Link>
                                        <span className="text-sm font-medium text-black">{product.price}</span>
                                    </div>
                                    <span className="text-xs text-zinc-500 font-medium">{product.brand}</span>

                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="md:hidden mt-2 border border-black py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
