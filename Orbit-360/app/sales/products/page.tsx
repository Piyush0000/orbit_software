"use client";

import { useEffect, useState } from "react";
import { ProductsTable } from "@/components/products-table";
import { ProductCards } from "@/components/product-cards";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreProducts, deleteStoreProduct } from "@/lib/api";
import { IconLoader } from "@tabler/icons-react";
import { Package, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductsPage() {
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    if (!user?.stores?.[0]?.id) return;
    try {
      setLoading(true);
      const res = await getStoreProducts(user.stores[0].id);
      setProducts(res.products || []);
    } catch (error) {
      console.error("Products fetch error:", error);
      toast.error("Failed to load products from backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!authLoading) fetchData();
  }, [user, authLoading]);

  const handleDelete = async (id: string) => {
    try {
      await deleteStoreProduct(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-20">
        <IconLoader className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between px-4 lg:px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-violet-500/10 rounded-xl">
            <Package className="size-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-sm text-muted-foreground">Manage your store catalog and inventory</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs font-semibold">
            {products.length} SKUs
          </Badge>
          <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
            <RefreshCw className="size-3.5" />
            Refresh
          </Button>
          <Link href="/sales/products/new">
            <Button size="sm" className="gap-2">
              <Plus className="size-3.5" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Strip */}
      <ProductCards products={products} />

      {/* Table */}
      <div className="px-4 lg:px-6">
        <ProductsTable data={products} onDelete={handleDelete} />
      </div>
    </div>
  );
}
