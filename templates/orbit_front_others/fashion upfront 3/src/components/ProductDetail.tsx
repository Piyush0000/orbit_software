'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/cartStore';
import { useStorefront } from '@/contexts/StorefrontContext';
import { Product } from '@/types/product';
import ProductReviews from '@/components/ProductReviews';
import { parseINRToNumber } from '@/lib/utils';
import Image from 'next/image';

export default function ProductDetail({ productId }: { productId: string | number }) {
  const { products, loading } = useStorefront();
  const [product, setProduct] = useState<Product | null>(null);

  // Find product from context
  useEffect(() => {
    if (products.length > 0) {
      // Compare as strings to handle both number and string IDs
      const found = products.find(p => String(p.id) === String(productId));
      setProduct(found || null);
    }
  }, [products, productId]);

  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--text-secondary)]">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Product not found</h1>
          <p className="text-[var(--text-secondary)]">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="mt-4 inline-block text-[var(--accent-color)] underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Handle price parsing safely
  const priceNum = parseINRToNumber(product.price);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newQuantity = prev + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > 5) return 5;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    if ((product.sizes && product.sizes.length > 0 && !selectedSize)) {
      alert('Please select a size');
      return;
    }
    if ((product.colors && product.colors.length > 0 && !selectedColor)) {
      alert('Please select a color');
      return;
    }

    const variantDescription = [
      product.description ? product.description.substring(0, 50) + '...' : '',
      selectedSize ? `Size: ${selectedSize}` : '',
      selectedColor ? `Color: ${selectedColor}` : ''
    ].filter(Boolean).join(' | ');

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: priceNum,
      image: product.image,
      shortDescription: variantDescription,
      size: selectedSize || undefined,
    }, quantity);

    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to checkout in a real app
    // router.push('/checkout');
    alert('Proceeding to checkout...');
  };

  // Logic for Related Products
  const relatedProducts = products
    .filter(p => {
      if (String(p.id) === String(product.id)) return false;
      const sameCategory = p.category === product.category;
      return sameCategory;
    })
    .slice(0, 4);

  // Images handling - fallback to single image if array not present
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12 bg-[var(--page-bg)]">
      <div className="max-w-[1920px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[var(--text-primary)] transition-colors">
              Collection
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-[var(--card-bg)] relative overflow-hidden group">
              <Image
                src={productImages[selectedImageIndex] || 'https://via.placeholder.com/600x800'}
                alt={`${product.name} - View ${selectedImageIndex + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {productImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-24 border transition-all relative ${selectedImageIndex === index ? 'border-[var(--text-primary)] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col h-full">
            <div className="mb-auto">
              <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4 text-[var(--text-primary)] uppercase tracking-tight leading-none">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-8 border-b border-[var(--card-border)] pb-8">
                <span className="text-2xl font-bold text-[var(--text-primary)]">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg line-through text-[var(--text-muted)]">
                    {product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-[var(--highlight)] text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-[var(--text-secondary)] leading-relaxed mb-10 font-light">
                {product.description}
              </p>

              {/* Selectors */}
              <div className="space-y-8 mb-10">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-[var(--text-secondary)]">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[3rem] h-12 border flex items-center justify-center text-sm font-medium transition-all ${selectedSize === size
                            ? 'bg-[var(--text-primary)] text-[var(--page-bg)] border-[var(--text-primary)]'
                            : 'bg-transparent text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--text-primary)]'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-[var(--text-secondary)]">
                      Select Color
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-6 py-3 border text-sm font-medium transition-all uppercase tracking-wide ${selectedColor === color
                            ? 'bg-[var(--text-primary)] text-[var(--page-bg)] border-[var(--text-primary)]'
                            : 'bg-transparent text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--text-primary)]'
                            }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity & Add */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-[var(--text-primary)] h-14 w-32">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-full flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--card-bg)] transition-colors disabled:opacity-50"
                  >
                    –
                  </button>
                  <span className="flex-grow text-center font-bold text-[var(--text-primary)]">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 5}
                    className="w-10 h-full flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--card-bg)] transition-colors disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                <div className="flex-grow flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === false}
                    className="flex-grow h-14 bg-[var(--text-primary)] text-[var(--page-bg)] font-bold uppercase tracking-[0.2em] text-xs hover:bg-[var(--text-secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {product.stock === false ? 'Out of Stock' : 'Add to Cart'}

                  </button>
                  <button
                    onClick={handleBuyNow} 
                    disabled={product.stock === false}
                    className="flex-grow h-14 border border-[var(--text-primary)] text-[var(--text-primary)] font-bold uppercase tracking-[0.2em] text-xs hover:bg-[var(--text-primary)] hover:text-[var(--page-bg)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed hidden xl:block"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

               {showCartMessage && (
                <div className="mb-6 p-4 bg-[var(--highlight)]/10 border border-[var(--highlight)] text-[var(--text-primary)] text-sm flex items-center gap-3 animate-fade-in-up">
                  <svg className="w-5 h-5 text-[var(--highlight)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to cart successfully
                </div>
              )}
              
              {/* Product Details Accordion/List */}
              <div className="border-t border-[var(--card-border)] pt-8 space-y-6">
                <div>
                   <h3 className="font-heading font-bold uppercase tracking-widest text-sm mb-2 text-[var(--text-primary)]">Material & Care</h3>
                   <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed">
                     {product.material || 'Premium cotton blend. Machine wash cold.'}
                   </p>
                </div>
                 <div>
                   <h3 className="font-heading font-bold uppercase tracking-widest text-sm mb-2 text-[var(--text-primary)]">Shipping & Returns</h3>
                   <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed">
                     Complimentary shipping on all orders. Free returns within 30 days.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Reviews Section */}
        <div className="mb-20 border-t border-[var(--card-border)] pt-20">
           <ProductReviews productId={product.id} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[var(--card-border)] pt-20">
            <h2 className="text-3xl font-heading font-medium mb-12 text-[var(--text-primary)] uppercase tracking-tight text-center">
              Complete The Look
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="group relative bg-[var(--card-bg)] aspect-[3/4] overflow-hidden cursor-pointer"
                >
                  <Link href={`/products/${relatedProduct.id}`} className="block w-full h-full">
                    <div className="w-full h-full relative">
                        <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                    </div>
                     <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white font-heading uppercase text-lg mb-1">{relatedProduct.name}</h3>
                        <p className="text-white/80">{relatedProduct.price}</p>
                     </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
