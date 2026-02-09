"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  getAdminOrder,
  updateAdminOrderStatus,
  updateAdminOrderFulfillment,
  updateAdminPaymentStatus,
  type Order,
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

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params?.id as string
  const [order, setOrder] = React.useState<Order | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { order } = await getAdminOrder(orderId)
      setOrder(order)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load order")
    } finally {
      setLoading(false)
    }
  }, [orderId])

  React.useEffect(() => {
    if (orderId) load()
  }, [orderId, load])

  const updateStatus = async (status: string) => {
    if (!order) return
    const { order: updated } = await updateAdminOrderStatus(order.id, status)
    setOrder(updated)
  }

  const updateFulfillment = async (fulfillmentStatus: string) => {
    if (!order) return
    const { order: updated } = await updateAdminOrderFulfillment(order.id, fulfillmentStatus)
    setOrder(updated)
  }

  const updatePayment = async (paymentStatus: string) => {
    if (!order) return
    const { order: updated } = await updateAdminPaymentStatus(order.id, paymentStatus)
    setOrder(updated)
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/orders")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Order Details</h2>
              <p className="text-muted-foreground">Update status and review items</p>
            </div>
          </div>

          {error && <p className="text-sm text-muted-foreground mb-4">{error}</p>}

          {loading || !order ? (
            <div className="rounded-md border p-6 text-center text-muted-foreground">
              {loading ? "Loading order..." : "Order not found"}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-md border p-6">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold">{order.orderNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.store?.name} · {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="capitalize">
                      {order.status}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {order.paymentStatus}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {order.fulfillmentStatus}
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Customer</p>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Totals</p>
                    <p className="text-sm">Subtotal: {formatCurrency(order.subtotal)}</p>
                    <p className="text-sm">Tax: {formatCurrency(order.tax)}</p>
                    <p className="text-sm">Shipping: {formatCurrency(order.shipping)}</p>
                    <p className="font-medium mt-1">Total: {formatCurrency(order.total)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Update Status</p>
                    <div className="space-y-2 mt-2">
                      <Select value={order.status} onValueChange={updateStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Order Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          <SelectItem value="REFUNDED">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={order.paymentStatus} onValueChange={updatePayment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Payment Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="PAID">Paid</SelectItem>
                          <SelectItem value="FAILED">Failed</SelectItem>
                          <SelectItem value="REFUNDED">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={order.fulfillmentStatus} onValueChange={updateFulfillment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Fulfillment Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UNFULFILLED">Unfulfilled</SelectItem>
                          <SelectItem value="FULFILLED">Fulfilled</SelectItem>
                          <SelectItem value="SHIPPED">Shipped</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-6">
                <h4 className="text-lg font-semibold mb-4">Items</h4>
                <div className="space-y-3">
                  {(order.items || []).map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} · {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.variantInfo ? "Variant" : "Base"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
