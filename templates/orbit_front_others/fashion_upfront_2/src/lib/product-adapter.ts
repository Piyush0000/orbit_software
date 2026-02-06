import type { Product as ApiProduct } from "@/lib/products-api";
import type { Product as UiProduct } from "@/types/product";

const formatPriceINR = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    Number.isFinite(price) ? price : 0
  );

const toStringArray = (value?: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim().length > 0) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

export const mapApiProduct = (
  product: ApiProduct,
  index: number
): UiProduct => {
  const customFields = (product as unknown as { customFields?: Record<string, unknown> })
    .customFields;

  return {
    id: index + 1,
    name: product.name,
    price: formatPriceINR(product.price),
    priceNum: product.price,
    image: product.images?.[0] || "",
    description: product.description || "",
    category: product.category || "",
    brand: (product.tags?.[0] || "").toString(),
    tags: product.tags || [],
    stock: product.stockQuantity > 0,
    images: product.images || [],
    sizes: toStringArray(customFields?.sizes ?? customFields?.sizeOptions),
    colors: toStringArray(customFields?.colors ?? customFields?.colorOptions),
  };
};

export const mapApiProducts = (products: ApiProduct[]): UiProduct[] =>
  products.map(mapApiProduct);
