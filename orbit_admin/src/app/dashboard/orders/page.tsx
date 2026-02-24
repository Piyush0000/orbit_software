"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  Eye,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getAdminOrders, getStores, type Order, type Store } from "@/lib/admin-api"

type OrderRow = {
  id: string
  orderNumber: string
  storeName: string
  storeId: string
  customer: string
  total: string
  rawTotal: number
  status: string
  paymentStatus: string
  fulfillmentStatus: string
  createdAt: string
}

const formatCurrency = (value: string | number) => {
  const num = typeof value === "string" ? Number(value) : value
  if (Number.isNaN(num)) return String(value)
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num)
}

const statusColor = (status: string) => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
    case "DELIVERED":
    case "FULFILLED":
    case "PAID":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "PENDING":
    case "UNFULFILLED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "CANCELLED":
    case "REFUNDED":
    case "FAILED":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    case "SHIPPED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const StatusBadge = ({ value }: { value: string }) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColor(value)}`}
  >
    {value?.toLowerCase()}
  </span>
)

export default function OrdersPage() {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "createdAt", desc: true }])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<OrderRow[]>([])
  const [stores, setStores] = React.useState<Store[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [storeFilter, setStoreFilter] = React.useState<string>("all")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [paymentFilter, setPaymentFilter] = React.useState<string>("all")

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [{ orders }, storeRes] = await Promise.all([
        getAdminOrders({
          storeId: storeFilter === "all" ? undefined : storeFilter,
          status: statusFilter === "all" ? undefined : statusFilter,
          paymentStatus: paymentFilter === "all" ? undefined : paymentFilter,
          limit: 200,
        }),
        getStores(),
      ])
      setStores(storeRes.stores || [])
      setData(
        (orders || []).map((order: Order) => ({
          id: order.id,
          orderNumber: order.orderNumber,
          storeName: order.store?.name || order.storeId,
          storeId: order.storeId,
          customer: `${order.customerName} · ${order.customerEmail}`,
          total: formatCurrency(order.total),
          rawTotal: Number(order.total),
          status: order.status,
          paymentStatus: order.paymentStatus,
          fulfillmentStatus: order.fulfillmentStatus,
          createdAt: order.createdAt,
        }))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load orders")
    } finally {
      setLoading(false)
    }
  }, [storeFilter, statusFilter, paymentFilter])

  React.useEffect(() => {
    load()
  }, [load])

  // Stats
  const totalRevenue = data.reduce((sum, row) => sum + row.rawTotal, 0)
  const pendingCount = data.filter((r) => r.status === "PENDING").length
  const confirmedCount = data.filter((r) => r.status === "CONFIRMED").length
  const cancelledCount = data.filter((r) => r.status === "CANCELLED").length

  const columns: ColumnDef<OrderRow>[] = [
    {
      accessorKey: "orderNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-mono font-medium pl-4 text-sm">{row.getValue("orderNumber")}</div>
      ),
    },
    {
      accessorKey: "storeName",
      header: "Merchant / Store",
      cell: ({ row }) => (
        <div className="font-medium text-sm">{row.getValue("storeName")}</div>
      ),
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => {
        const parts = (row.getValue("customer") as string).split(" · ")
        return (
          <div>
            <p className="text-sm font-medium">{parts[0]}</p>
            <p className="text-xs text-muted-foreground">{parts[1]}</p>
          </div>
        )
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-sm pl-4">{row.getValue("total")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Order Status",
      cell: ({ row }) => <StatusBadge value={row.getValue("status")} />,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => <StatusBadge value={row.getValue("paymentStatus")} />,
    },
    {
      accessorKey: "fulfillmentStatus",
      header: "Fulfillment",
      cell: ({ row }) => <StatusBadge value={row.getValue("fulfillmentStatus")} />,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground pl-4">
          {new Date(row.getValue("createdAt")).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/dashboard/orders/${row.original.id}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: { pageSize: 20 },
    },
  })

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
              <p className="text-muted-foreground">Monitor and update customer orders across all merchant stores</p>
            </div>
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Stats */}
          {!loading && data.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <TrendingUp className="h-4 w-4" />
                  Total Revenue
                </div>
                <div className="text-xl font-bold">{formatCurrency(totalRevenue)}</div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <ShoppingCart className="h-4 w-4" />
                  Total Orders
                </div>
                <div className="text-xl font-bold">{data.length}</div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-yellow-500 text-sm mb-1">
                  <Clock className="h-4 w-4" />
                  Pending
                </div>
                <div className="text-xl font-bold text-yellow-500">{pendingCount}</div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-green-500 text-sm mb-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Confirmed
                </div>
                <div className="text-xl font-bold text-green-500">{confirmedCount}</div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="w-full space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Input
                placeholder="Search by order number..."
                value={(table.getColumn("orderNumber")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("orderNumber")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <div className="flex flex-wrap items-center gap-2">
                {/* Store Filter */}
                <Select value={storeFilter} onValueChange={setStoreFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="All Stores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Merchants</SelectItem>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="REFUNDED">Refunded</SelectItem>
                  </SelectContent>
                </Select>

                {/* Payment Filter */}
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                    <SelectItem value="REFUNDED">Refunded</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() => router.push(`/dashboard/orders/${row.original.id}`)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-32 text-center">
                        {loading ? (
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <RefreshCw className="h-6 w-6 animate-spin" />
                            <span>Loading orders...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <ShoppingCart className="h-8 w-8" />
                            <span>No orders found</span>
                            <span className="text-xs">Try adjusting your filters</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between py-4">
              <p className="text-sm text-muted-foreground">
                Showing {table.getRowModel().rows.length} of {data.length} orders
              </p>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
