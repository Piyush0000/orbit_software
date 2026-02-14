// API configuration for storefront themes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/storefront/public';

// Utility functions for storefront API
export class StorefrontAPI {
  static get subdomain(): string {
    if (typeof window !== 'undefined') {
      // Client-side: extract subdomain from current hostname
      const hostname = window.location.hostname;
      // Split hostname into parts
      const parts = hostname.split('.');
      
      // For cases like subdomain.localhost (2 parts where one is 'localhost'), return first part
      if (parts.length === 2 && parts[1] === 'localhost') {
        return parts[0];
      }
      // For cases like subdomain.example.com (3+ parts), return first part
      else if (parts.length > 2) {
        return parts[0];
      }
    }
    
    // Fallback to environment variable or default
    return process.env.NEXT_PUBLIC_SUBDOMAIN || 'fashion-store-1';
  }

  // Get store information
  static async getStoreInfo() {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.subdomain}/info`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch store info');
      return data.data;
    } catch (error) {
      console.error('Error fetching store info:', error);
      throw error;
    }
  }

  // Get store customization
  static async getStoreCustomization() {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.subdomain}/customization`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch customization');
      return data.data;
    } catch (error) {
      console.error('Error fetching customization:', error);
      // Return default values if API fails
      return {
        logo: null,
        brandColors: {
          primary: '#000000',
          secondary: '#666666',
          accent: '#ff6b6b'
        }
      };
    }
  }

  // Get products with optional filters
  static async getProducts(options: { category?: string; search?: string; limit?: number; offset?: number } = {}) {
    try {
      const { category, search, limit = 50, offset = 0 } = options;
      const params = new URLSearchParams();
      
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      params.append('limit', limit.toString());
      params.append('offset', offset.toString());

      const response = await fetch(`${API_BASE_URL}/${this.subdomain}/products?${params}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch products');
      return data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return { products: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } };
    }
  }

  // Get single product
  static async getProduct(productId: string | number) {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.subdomain}/products/${productId}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch product');
      return data.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Get store categories
  static async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.subdomain}/categories`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch categories');
      return data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // Get theme configuration
  static async getThemeConfig() {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.subdomain}/theme`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch theme config');
      return data.data;
    } catch (error) {
      console.error('Error fetching theme config:', error);
      return {};
    }
  }

  // Get homepage sections with products
  static async getStoreSections() {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.subdomain}/sections`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch sections');
      return data.data;
    } catch (error) {
      console.error('Error fetching sections:', error);
      return {};
    }
  }

  // Create order
  static async createOrder(orderData: { items: any[]; customer: any; total: number; paymentMethod: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.subdomain}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to create order');
      return data.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Verify payment
  static async verifyPayment(paymentData: { razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string; orderId?: string; sessionId?: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.subdomain}/orders/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to verify payment');
      return data.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }
}

import { useState, useEffect } from 'react';

// Hook for store context
export function useStore() {
  const [storeInfo, setStoreInfo] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [sections, setSections] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [info, custom, sectionsData] = await Promise.all([
          StorefrontAPI.getStoreInfo(),
          StorefrontAPI.getStoreCustomization(),
          StorefrontAPI.getStoreSections()
        ]);
        setStoreInfo(info);
        setCustomization(custom);
        setSections(sectionsData);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        console.error('Error loading store data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    storeInfo,
    customization,
    sections,
    loading,
    error
  };
}