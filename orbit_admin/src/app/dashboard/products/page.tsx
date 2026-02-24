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
import { Separator } from "@/components/ui/separator"
import { Package, AlertTriangle, CheckCircle, Search, RefreshCw } from "lucide-react"
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
  const [storesLoading, setStoresLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [stockDrafts, setStockDrafts] = React.useState<Record<string, string>>({})
  const [saving, setSaving] = React.useState<Record<string, boolean>>({})
  const [search, setSearch] = React.useState("")

  // Load stores
  React.useEffect(() => {
    let isMounted = true
    const loadStores = async () => {
      setStoresLoading(true)
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
      } finally {
        if (isMounted) setStoresLoading(false)
      }
    }
    loadStores()
    return () => { isMounted = false }
  }, [])

  // Load products when store changes
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
    return () => { isMounted = false }
  }, [storeFilter])

  const updateStock = async (id: string, isVariant = false) => {
    const raw = stockDrafts[id]
    const nextValue = Number(raw)
    if (!Number.isInteger(nextValue) || nextValue < 0) {
      setError("Stock must be a non-negative integer")
      return
    }
    setError(null)
    setSaving((prev) => ({ ...prev, [id]: true }))
    try {
      if (isVariant) {
        await updateAdminVariantStock(id, nextValue)
      } else {
        await updateAdminProductStock(id, nextValue)
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, stock: nextValue } : p))
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update stock")
    } finally {
      setSaving((prev) => ({ ...prev, [id]: false }))
    }
  }

  const selectedStore = stores.find((s) => s.id === storeFilter)

  const filteredProducts = products.filter((p) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    )
  })

  const totalProducts = products.length
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 10).length
  const outOfStockCount = products.filter((p) => p.stock <= 0).length

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Products &amp; Inventory</h2>
              <p className="text-muted-foreground">Manage stock levels for each merchant store</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {storesLoading ? (
              <div className="h-9 w-60 rounded-md bg-muted animate-pulse" />
            ) : (
              <Select value={storeFilter} onValueChange={setStoreFilter}>
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select a merchant store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      <span className="font-medium">{store.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{store.subdomain}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9 w-[220px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button variant="outline" size="sm" onClick={() => setStoreFilter(storeFilter)} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Stats */}
          {selectedStore && !loading && products.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Package className="h-4 w-4" />
                  Total Products
                </div>
                <div className="text-2xl font-bold">{totalProducts}</div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Low Stock (&lt;10)
                </div>
                <div className="text-2xl font-bold text-yellow-500">{lowStockCount}</div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Out of Stock
                </div>
                <div className="text-2xl font-bold text-destructive">{outOfStockCount}</div>
              </div>
            </div>
          )}

          {/* Merchant Badge */}
          {selectedStore && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Viewing products for:</span>
              <Badge variant="secondary" className="text-sm">
                {selectedStore.name}
              </Badge>
              {selectedStore.user?.email && (
                <span className="text-xs text-muted-foreground">({selectedStore.user.email})</span>
              )}
            </div>
          )}

          {/* Product List */}
          <div className="space-y-8">
            {loading && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 rounded-md bg-muted animate-pulse" />
                ))}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {products.length === 0
                    ? "This store has no products yet."
                    : "No products match your search."}
                </p>
              </div>
            )}

            {!loading &&
              Object.entries(
                filteredProducts.reduce((acc, product) => {
                  const cat = product.category || "Uncategorized"
                  if (!acc[cat]) acc[cat] = []
                  acc[cat].push(product)
                  return acc
                }, {} as Record<string, ProductItem[]>)
              ).map(([category, categoryProducts]) => (
                <div key={category} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="px-3 py-1 text-sm font-semibold border-primary text-primary">
                      {category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""}</span>
                    <Separator className="flex-1" />
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {categoryProducts.map((product) => {
                      const stockNum = product.stock
                      const stockStatus =
                        stockNum <= 0
                          ? "out"
                          : stockNum < 10
                          ? "low"
                          : "ok"

                      return (
                        <div
                          key={product.id}
                          className={`rounded-md border p-4 bg-card transition-colors ${
                            stockStatus === "out"
                              ? "border-destructive/40"
                              : stockStatus === "low"
                              ? "border-yellow-500/40"
                              : ""
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                                <Package className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatCurrency(product.price)}
                                  <span className="mx-1">·</span>
                                  {stockNum <= 0 ? (
                                    <span className="text-destructive font-medium">Out of stock</span>
                                  ) : stockNum < 10 ? (
                                    <span className="text-yellow-500 font-medium">Only {stockNum} left</span>
                                  ) : (
                                    <span className="text-green-500">{stockNum} in stock</span>
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {!product.isActive && (
                                <Badge variant="secondary" className="text-xs">Inactive</Badge>
                              )}
                              {stockStatus === "out" && (
                                <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                              )}
                              {stockStatus === "low" && (
                                <Badge className="text-xs bg-yellow-500 text-white">Low Stock</Badge>
                              )}
                              {stockStatus === "ok" && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              <Input
                                value={stockDrafts[product.id] || ""}
                                onChange={(event) =>
                                  setStockDrafts((prev) => ({
                                    ...prev,
                                    [product.id]: event.target.value,
                                  }))
                                }
                                className="w-24"
                                type="number"
                                min={0}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateStock(product.id)}
                                disabled={saving[product.id]}
                              >
                                {saving[product.id] ? "Saving..." : "Update"}
                              </Button>
                            </div>
                          </div>

                          {product.variants && product.variants.length > 0 && (
                            <div className="mt-4 pl-13 space-y-2 ml-13">
                              <p className="text-xs uppercase text-muted-foreground font-medium ml-13 ml-[52px]">
                                Variants ({product.variants.length})
                              </p>
                              {product.variants.map((variant) => (
                                <div
                                  key={variant.id}
                                  className="flex flex-wrap items-center justify-between gap-4 border-t pt-3 ml-[52px]"
                                >
                                  <div>
                                    <p className="text-sm font-medium">{variant.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {variant.price ? formatCurrency(variant.price) : "Base price"}
                                      <span className="mx-1">·</span>
                                      Stock: {variant.stock}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      value={stockDrafts[variant.id] || ""}
                                      onChange={(event) =>
                                        setStockDrafts((prev) => ({
                                          ...prev,
                                          [variant.id]: event.target.value,
                                        }))
                                      }
                                      className="w-24"
                                      type="number"
                                      min={0}
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => updateStock(variant.id, true)}
                                      disabled={saving[variant.id]}
                                    >
                                      {saving[variant.id] ? "Saving..." : "Update"}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
