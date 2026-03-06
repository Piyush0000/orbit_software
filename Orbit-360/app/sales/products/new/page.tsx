"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { createStoreProduct } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function NewProductPage() {
  const { activeStore } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    sku: "",
    stock: "10",
    category: "",
    image: "",
    isFeatured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!activeStore?.id) {
      toast.error("No active store selected.");
      return;
    }
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Name, price, and category are required.");
      return;
    }

    setLoading(true);
    try {
      await createStoreProduct(activeStore.id, {
         ...formData,
         price: parseFloat(formData.price),
         stock: parseInt(formData.stock, 10),
      });
      toast.success("Product created successfully!");
      router.push("/sales/products");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-8 pt-0 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" onClick={() => router.back()}>
             <ChevronLeft className="size-5" />
           </Button>
           <h1 className="text-2xl font-bold tracking-tight">Add Product</h1>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : <><Save className="size-4 mr-2" /> Save Product</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Product title and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Title *</Label>
                <Input 
                   id="name" name="name" 
                   value={formData.name || ""} onChange={handleChange} 
                   placeholder="e.g. Vintage Leather Jacket" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea 
                   id="description" name="description" 
                   value={formData.description || ""} onChange={handleChange} 
                   placeholder="Write a detailed description..." 
                   rows={6}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
              <CardDescription>Set the cost of the item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input 
                     id="price" name="price" type="number" 
                     value={formData.price || ""} onChange={handleChange} 
                     placeholder="0.00" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input 
                     id="sku" name="sku" 
                     value={formData.sku || ""} onChange={handleChange} 
                     placeholder="e.g. PROD-001" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>Product images and visuals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                   id="image" name="image" 
                   value={formData.image || ""} onChange={handleChange} 
                   placeholder="https://example.com/image.jpg" 
                />
                <p className="text-[10px] text-muted-foreground">Paste a direct link to your product image.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="stock">Quantity in Stock *</Label>
                <Input 
                   id="stock" name="stock" type="number" 
                   value={formData.stock || ""} onChange={handleChange} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input 
                   id="category" name="category" 
                   value={formData.category || ""} onChange={handleChange} 
                   placeholder="e.g. Clothing" 
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="isFeatured" className="flex flex-col space-y-1">
                  <span>Featured Product</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Display this product in your storefront's featured section.
                  </span>
                </Label>
                <Switch 
                  id="isFeatured" 
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
