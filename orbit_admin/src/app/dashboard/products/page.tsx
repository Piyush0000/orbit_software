"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  getStores,
  getAdminProducts,
  updateAdminProductStock,
  updateAdminVariantStock,
  type ProductItem,
  type Store,
} from "@/lib/admin-api"

const formatCurrency = (value: string | number) => {
  const num = typeof value === "string" ? Number(value) : value
  if (Number.isNaN(num)) return String(value)
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num)
}

export default function ProductsPage() {
  const [stores, setStores] = React.useState<Store[]>([])
  const [storeFilter, setStoreFilter] = React.useState<string>("")
  const [products, setProducts] = React.useState<ProductItem[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [stockDrafts, setStockDrafts] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    let isMounted = true
    const loadStores = async () => {
      try {
        const { stores } = await getStores()
        if (!isMounted) return
        setStores(stores || [])
        if (stores?.length) {
          setStoreFilter(stores[0].id)
        }
      } catch (err) {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : "Unable to load stores")
      }
    }
    loadStores()
    return () => {
      isMounted = false
    }
  }, [])

  React.useEffect(() => {
    if (!storeFilter) return
    let isMounted = true
    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const { products } = await getAdminProducts(storeFilter)
        if (!isMounted) return
        setProducts(products || [])
        setStockDrafts(
          (products || []).reduce((acc, product) => {
            acc[product.id] = String(product.stock)
            product.variants?.forEach((variant) => {
              acc[variant.id] = String(variant.stock)
            })
            return acc
          }, {} as Record<string, string>)
        )
      } catch (err) {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : "Unable to load products")
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadProducts()
    return () => {
      isMounted = false
    }
  }, [storeFilter])

  const updateStock = async (id: string, isVariant = false) => {
    const raw = stockDrafts[id]
    const nextValue = Number(raw)
    if (!Number.isInteger(nextValue) || nextValue < 0) {
      setError("Stock must be a non-negative integer")
      return
    }
    setError(null)
    if (isVariant) {
      await updateAdminVariantStock(id, nextValue)
    } else {
      await updateAdminProductStock(id, nextValue)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Products & Inventory</h2>
              <p className="text-muted-foreground">Update stock and review variants</p>
            </div>
          </div>

          {error && <p className="text-sm text-muted-foreground mb-4">{error}</p>}

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {loading && <p className="text-sm text-muted-foreground">Loading products...</p>}
            {!loading && products.length === 0 && (
              <p className="text-sm text-muted-foreground">No products found for this store.</p>
            )}
            {products.map((product) => (
              <div key={product.id} className="rounded-md border p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(product.price)} · Stock {product.stock}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={stockDrafts[product.id] || ""}
                      onChange={(event) =>
                        setStockDrafts((prev) => ({ ...prev, [product.id]: event.target.value }))
                      }
                      className="w-24"
                    />
                    <Button variant="outline" onClick={() => updateStock(product.id)}>
                      Update Stock
                    </Button>
                    {!product.isActive && <Badge variant="secondary">Inactive</Badge>}
                  </div>
                </div>

                {product.variants && product.variants.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs uppercase text-muted-foreground">Variants</p>
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="flex flex-wrap items-center justify-between gap-4 border-t pt-3">
                        <div>
                          <p className="text-sm font-medium">{variant.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {variant.price ? formatCurrency(variant.price) : "Uses base price"} · Stock {variant.stock}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            value={stockDrafts[variant.id] || ""}
                            onChange={(event) =>
                              setStockDrafts((prev) => ({ ...prev, [variant.id]: event.target.value }))
                            }
                            className="w-24"
                          />
                          <Button variant="outline" onClick={() => updateStock(variant.id, true)}>
                            Update Variant
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
