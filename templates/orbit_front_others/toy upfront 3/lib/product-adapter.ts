import type { Product as ApiProduct } from "@/lib/products-api";

export type ToyProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  image: string;
  images?: string[];
  age?: string;
  badge?: string | null;
  description?: string;
  features?: string[];
};

const toStringArray = (value?: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim().length > 0) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

export const mapApiProduct = (product: ApiProduct): ToyProduct => {
  const customFields = (product as unknown as { customFields?: Record<string, unknown> })
    .customFields;

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.compareAtPrice || undefined,
    rating: typeof customFields?.rating === "number" ? (customFields?.rating as number) : 0,
    reviews: typeof customFields?.reviews === "number" ? (customFields?.reviews as number) : 0,
    image: product.images?.[0] || "",
    images: product.images || [],
    age: typeof customFields?.age === "string" ? (customFields?.age as string) : "",
    badge: typeof customFields?.badge === "string" ? (customFields?.badge as string) : null,
    description: product.description || "",
    features: toStringArray(customFields?.features),
  };
};

export const mapApiProducts = (products: ApiProduct[]): ToyProduct[] =>
  products.map(mapApiProduct);
