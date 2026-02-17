import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/cartStore';
import { products } from '@/data/products';
import ProductReviews from '@/components/ProductReviews';

export default function ProductDetail({ productId }: { productId: number }) {
  const product = products.find(p => p.id === productId);

  // Move hooks before the early return to comply with Rules of Hooks
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);

  // Safety check
  if (!product) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-black mb-4 neon-text-blue" style={{ color: 'var(--text)' }}>Product not found</h1>
          <p className="text-xl" style={{ color: 'var(--text-muted)' }}>The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/#products" className="mt-8 inline-block px-8 py-3 bg-[var(--accent-blue)] text-black font-bold rounded hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  // Extract numeric price from string (remove ₹ and commas)
  // Handle cases like "₹3,999" -> 3999, "₹12,449" -> 12449
  const priceNum = parseInt(product.price.replace(/[₹,\s]/g, ''), 10) || 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newQuantity = prev + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > 5) return 5;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: priceNum,
      image: product.images ? product.images[0] : product.image,
      shortDescription: product.shortDescription,
    }, quantity);

    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 3000);
  };

  const handleBuyNow = () => {
    // UI only - no backend logic
    alert(`Buy Now: ${quantity} x ${product.name}`);
  };

  // Logic for Related Products:
  // 1. Filter out current product
  // 2. Match Category OR Tags
  // 3. Limit to 4 suggestions
  const relatedProducts = products
    .filter(p => {
      if (p.id === product.id) return false;
      const sameCategory = p.category === product.category;
      const matchingTags = p.tags?.some(tag => product.tags?.includes(tag));
      return sameCategory || matchingTags;
    })
    .slice(0, 4);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        {/* Breadcrumb - Minimal & Sleek */}
        <nav className="mb-8 font-medium">
          <div className="flex items-center space-x-3 text-sm tracking-wide">
            <Link href="/" className="hover:text-[var(--accent-blue)] transition-colors" style={{ color: 'var(--text-muted)' }}>
              HOME
            </Link>
            <span style={{ color: 'var(--card-border)' }}>/</span>
            <Link href="/#products" className="hover:text-[var(--accent-blue)] transition-colors" style={{ color: 'var(--text-muted)' }}>
              PRODUCTS
            </Link>
            <span style={{ color: 'var(--card-border)' }}>/</span>
            <span className="text-[var(--accent-purple)] uppercase tracking-wider">{product.name}</span>
          </div>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            {/* Main Image - Immersive glass display */}
            <div className="mb-6 rounded-2xl overflow-hidden border relative group shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]" style={{ borderColor: 'var(--card-border)' }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_70%)] z-0 pointer-events-none"></div>
              <div className="aspect-square bg-black relative z-10">
                <img
                  src={product.images ? product.images[selectedImageIndex] : product.image}
                  alt={`${product.name} - View ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  onMouseEnter={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border transition-all duration-300 relative ${selectedImageIndex === index ? 'opacity-100 ring-2' : 'opacity-60 hover:opacity-100'
                    }`}
                  style={{
                    borderColor: selectedImageIndex === index
                      ? 'var(--accent-blue)'
                      : 'var(--card-border)',
                    backgroundColor: 'black',
                    boxShadow: selectedImageIndex === index
                      ? '0 0 10px rgba(0, 240, 255, 0.5)'
                      : 'none',
                    '--tw-ring-color': 'var(--accent-blue)'
                  } as React.CSSProperties}

                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24">
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 font-heading tracking-tight" style={{ color: 'var(--text)' }}>
              {product.name}
            </h1>

            {/* Price and Discount */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
                  {product.price}
                </span>
                <span className="text-xl line-through" style={{ color: 'var(--text-muted)' }}>
                  {product.originalPrice}
                </span>
                <span
                  className="px-3 py-1 rounded text-sm font-bold bg-[var(--accent-green)] text-black shadow-[0_0_10px_rgba(0,255,148,0.4)]"
                >
                  {product.discount}% OFF
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>
              {product.shortDescription}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  style={{
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                    backgroundColor: 'var(--card-bg)'
                  }}
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span
                  className="w-16 text-center text-xl font-semibold"
                  style={{ color: 'var(--text)' }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 5}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  style={{
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                    backgroundColor: 'var(--card-bg)'
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>
                  (Min: 1 | Max: 5)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 rounded font-bold text-lg transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-[1.02] transform"
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: '#000000'
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-8 py-4 rounded font-bold text-lg border transition-all hover:bg-[var(--accent-purple)] hover:border-[var(--accent-purple)] hover:text-white hover:shadow-[0_0_20px_rgba(189,0,255,0.4)] hover:scale-[1.02] transform"
                  style={{
                    borderColor: 'var(--accent-purple)',
                    color: 'var(--accent-purple)',
                    backgroundColor: 'transparent'
                  }}
                >
                  Buy Now
                </button>
              </div>
              {showCartMessage && (
                <div className="flex items-center gap-3 p-4 rounded-lg border" style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}>
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#16a34a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="flex-grow" style={{ color: 'var(--text)' }}>
                    Added {quantity} x {product.name} to cart!
                  </span>
                  <Link
                    href="/cart"
                    className="px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90 text-sm"
                    style={{
                      backgroundColor: 'var(--header-text)',
                      color: 'var(--header-bg)'
                    }}
                  >
                    View Cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Below-the-fold Section */}
        <div className="border-t pt-8" style={{ borderColor: 'var(--card-border)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                Product Description
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                {product.description}
              </p>
            </div>

            {/* Features List */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                Features
              </h2>
              <ul className="space-y-3">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--header-text)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ color: 'var(--text-muted)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mt-12 p-6 rounded-lg border" style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Shipping Information
            </h2>
            <div className="space-y-3" style={{ color: 'var(--text-muted)' }}>
              <p><strong className="text-[var(--accent-blue)]">Free Shipping:</strong> Orders above ₹2,000 qualify for free shipping across India.</p>
              <p><strong className="text-[var(--accent-blue)]">Standard Delivery:</strong> 3-5 business days for metro cities, 5-7 business days for other locations.</p>
              <p><strong className="text-[var(--accent-blue)]">Express Delivery:</strong> Available for select locations. Delivery within 1-2 business days.</p>
              <p><strong className="text-[var(--accent-blue)]">Cash on Delivery:</strong> Available for orders up to ₹5,000.</p>
              <p><strong className="text-[var(--accent-blue)]">Returns:</strong> 7-day return policy. Items must be in original condition with all packaging.</p>
            </div>
          </div>
        </div>

        {/* Reviews and Q&A Section */}
        <div className="mt-12">
          <ProductReviews productId={product.id} />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-12 mt-12" style={{ borderColor: 'var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border"
                  style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                >
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square bg-gray-200 overflow-hidden cursor-pointer relative">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <h3 className="text-lg font-semibold mb-1 hover:underline truncate" style={{ color: 'var(--text)' }}>
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="font-bold" style={{ color: 'var(--text)' }}>{relatedProduct.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

