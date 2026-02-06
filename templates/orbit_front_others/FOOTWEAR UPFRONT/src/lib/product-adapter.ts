import type { Product as ApiProduct } from "@/lib/products-api";

export type FootwearProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  image: string;
  hoverImage?: string;
  colors?: string[];
};

const toStringArray = (value?: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim().length > 0) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

export const mapApiProduct = (product: ApiProduct): FootwearProduct => {
  const customFields = (product as unknown as { customFields?: Record<string, unknown> })
    .customFields;

  return {
    id: product.id,
    name: product.name,
    category: product.category || "General",
    price: product.price,
    originalPrice: product.compareAtPrice || undefined,
    rating: typeof customFields?.rating === "number" ? (customFields?.rating as number) : 0,
    image: product.images?.[0] || "",
    hoverImage: product.images?.[1] || product.images?.[0] || "",
    colors: toStringArray(customFields?.colors ?? customFields?.colorOptions),
  };
};

export const mapApiProducts = (products: ApiProduct[]): FootwearProduct[] =>
  products.map(mapApiProduct);
