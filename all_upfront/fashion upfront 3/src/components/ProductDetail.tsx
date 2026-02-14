import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/cartStore';
import { StorefrontAPI } from '@/lib/api';
import ProductReviews from '@/components/ProductReviews';

export default function ProductDetail({ productId }: { productId: number }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await StorefrontAPI.getProduct(productId);
        setProduct(productData);

        // Fetch related products
        if (productData) {
          const relatedData = await StorefrontAPI.getProducts({ category: productData.category });
          const filteredRelated = relatedData.products
            .filter((p: any) => p.id !== productData.id)
            .slice(0, 4);
          setRelatedProducts(filteredRelated);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Extract numeric price from string (remove ₹ and commas)
  // Handle cases like "₹3,999" -> 3999, "₹12,449" -> 12449
  const priceNum = product ? parseInt(product.price.replace(/[₹,\s]/g, ''), 10) || 0 : 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newQuantity = prev + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > 5) return 5;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    if ((product.sizes && !selectedSize) || (product.colors && !selectedColor)) {
      alert('Please select size and color');
      return;
    }

    // Create a descriptive string including variants
    const variantDescription = [
      product.shortDescription,
      selectedSize ? `Size: ${selectedSize}` : '',
      selectedColor ? `Color: ${selectedColor}` : ''
    ].filter(Boolean).join(' | ');

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: priceNum,
      image: product.images ? product.images[0] : product.image,
      shortDescription: variantDescription,
    }, quantity);

    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 3000);
  };

  const handleBuyNow = () => {
    // UI only - no backend logic
    if (!product) return;

    if ((product.sizes && !selectedSize) || (product.colors && !selectedColor)) {
      alert('Please select size and color');
      return;
    }
    alert(`Buy Now: ${quantity} x ${product.name} (${selectedSize}, ${selectedColor})`);
  };

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Product not found</h1>
          <p className="text-[var(--text-muted)]">The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:underline text-[var(--text-secondary)]">
              Home
            </Link>
            <span>/</span>
            <Link href="/#products" className="hover:underline text-[var(--text-secondary)]">
              Products
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">{product.name}</span>
          </div>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="mb-4 rounded-lg overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)]">
              <div className="aspect-square bg-[var(--card-bg)] relative">
                <img
                  src={product.images ? product.images[selectedImageIndex] : product.image}
                  alt={`${product.name} - View ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images?.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  onMouseEnter={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index ? 'ring-2' : ''
                    }`}
                  style={{
                    borderColor: selectedImageIndex === index
                      ? 'var(--text-primary)'
                      : 'var(--card-border)',
                    backgroundColor: 'var(--card-bg)',
                    boxShadow: selectedImageIndex === index
                      ? '0 0 0 2px var(--text-primary)'
                      : 'none',
                  }}

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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--text-primary)]">
              {product.name}
            </h1>

            {/* Price and Discount */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-[var(--text-primary)]">
                  {product.price}
                </span>
                <span className="text-xl line-through text-[var(--text-muted)]">
                  {product.originalPrice}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: '#dc2626',
                    color: '#ffffff'
                  }}
                >
                  {product.discount}% OFF
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-lg mb-6 text-[var(--text-secondary)]">
              {product.shortDescription}
            </p>

            {/* Variant Selectors */}
            {product.sizes && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md transition-all ${selectedSize === size
                        ? 'ring-2 ring-offset-1 border-transparent'
                        : 'hover:border-gray-400'
                        }`}
                      style={{
                        backgroundColor: selectedSize === size ? 'var(--text-primary)' : 'var(--card-bg)',
                        color: selectedSize === size ? 'var(--page-bg)' : 'var(--text-primary)',
                        borderColor: 'var(--card-border)'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
                  Select Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md transition-all ${selectedColor === color
                        ? 'ring-2 ring-offset-1 border-transparent'
                        : 'hover:border-gray-400'
                        }`}
                      style={{
                        backgroundColor: selectedColor === color ? 'var(--text-primary)' : 'var(--card-bg)',
                        color: selectedColor === color ? 'var(--page-bg)' : 'var(--text-primary)',
                        borderColor: 'var(--card-border)'
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.material && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                  Material
                </label>
                <p className="text-[var(--text-secondary)]">{product.material}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--section-alt)]"
                  style={{
                    borderColor: 'var(--card-border)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--card-bg)'
                  }}
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span
                  className="w-16 text-center text-xl font-semibold text-[var(--text-primary)]"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 5}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--section-alt)]"
                  style={{
                    borderColor: 'var(--card-border)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--card-bg)'
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <span className="text-sm ml-2 text-[var(--text-muted)]">
                  (Min: 1 | Max: 5)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--text-primary)',
                    color: 'var(--page-bg)'
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-lg border-2 transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--page-bg)]"
                  style={{
                    borderColor: 'var(--text-primary)',
                    color: 'var(--text-primary)',
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
                  <span className="flex-grow text-[var(--text-primary)]">
                    Added {quantity} x {product.name} to cart!
                  </span>
                  <Link
                    href="/cart"
                    className="px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90 text-sm"
                    style={{
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--page-bg)'
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
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
                Product Description
              </h2>
              <p className="text-base leading-relaxed mb-6 text-[var(--text-secondary)]">
                {product.description}
              </p>
            </div>

            {/* Features List */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
                Features
              </h2>
              <ul className="space-y-3">
                {product.features?.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--text-primary)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mt-12 p-6 rounded-lg border" style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
              Shipping Information
            </h2>
            <div className="space-y-2 text-[var(--text-secondary)]">
              <p><strong className="text-[var(--text-primary)]">Free Shipping:</strong> Orders above ₹2,000 qualify for free shipping across India.</p>
              <p><strong className="text-[var(--text-primary)]">Standard Delivery:</strong> 3-5 business days for metro cities, 5-7 business days for other locations.</p>
              <p><strong className="text-[var(--text-primary)]">Express Delivery:</strong> Available for select locations. Delivery within 1-2 business days.</p>
              <p><strong className="text-[var(--text-primary)]">Cash on Delivery:</strong> Available for orders up to ₹5,000.</p>
              <p><strong className="text-[var(--text-primary)]">Returns:</strong> 7-day return policy. Items must be in original condition with all packaging.</p>
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
            <h2 className="text-2xl font-bold mb-8 text-[var(--text-primary)]">
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
                    <div className="aspect-square bg-[var(--card-bg)] overflow-hidden cursor-pointer relative">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <h3 className="text-lg font-semibold mb-1 hover:underline truncate text-[var(--text-primary)]">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-primary)]">{relatedProduct.price}</span>
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