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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
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
import { getTickets } from "@/lib/admin-api"

type TicketStatus = "open" | "pending" | "resolved" | "closed"
type TicketCategory = string
type Ticket = {
    ticket_id: string
    brand_name: string
    category: TicketCategory
    status: TicketStatus
    assigned_admin_name?: string
    created_at: string
}

export default function TicketsPage() {
    const router = useRouter()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [data, setData] = React.useState<Ticket[]>([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        let isMounted = true
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                const { tickets } = await getTickets()
                if (!isMounted) return
                const mapped = tickets.map((ticket) => {
                    const statusRaw = ticket.status || "OPEN"
                    const status =
                        statusRaw === "IN_PROGRESS"
                            ? "pending"
                            : statusRaw.toLowerCase()
                    return {
                        ticket_id: ticket.id,
                        brand_name: ticket.store?.name || "Unknown Store",
                        category: ticket.source || "General",
                        status: status as TicketStatus,
                        assigned_admin_name: ticket.assignedAdmin?.fullName || undefined,
                        created_at: ticket.createdAt,
                    }
                })
                setData(mapped)
            } catch (err) {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : "Unable to load tickets")
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        load()
        return () => {
            isMounted = false
        }
    }, [])

    const columns: ColumnDef<Ticket>[] = [
        {
            accessorKey: "ticket_id",
            header: "Ticket ID",
            cell: ({ row }) => <div className="font-medium">{row.getValue("ticket_id")}</div>,
        },
        {
            accessorKey: "brand_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Brand Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("brand_name")}</div>,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <Badge variant="outline">{row.getValue("category")}</Badge>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as TicketStatus
                return (
                    <Badge
                        variant={
                            status === "open" ? "default" :
                                status === "resolved" ? "secondary" :
                                    status === "closed" ? "secondary" : "outline"
                        }
                        className="capitalize"
                    >
                        {status}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "assigned_admin_name",
            header: "Assigned Admin",
            cell: ({ row }) => (
                <div className="text-sm text-muted-foreground">
                    {row.getValue("assigned_admin_name") || "Unassigned"}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Action",
            enableHiding: false,
            cell: ({ row }) => {
                const ticket = row.original

                return (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/dashboard/tickets/${ticket.ticket_id}`)}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                    </Button>
                )
            },
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
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Tickets & Support</h2>
                            <p className="text-muted-foreground">
                                Manage customer support requests and communication
                            </p>
                        </div>
                    </div>
                    {error && <p className="text-sm text-muted-foreground mb-4">{error}</p>}

                    <div className="w-full space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <Input
                                placeholder="Filter by brand..."
                                value={(table.getColumn("brand_name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("brand_name")?.setFilterValue(event.target.value)
                                }
                                className="max-w-sm"
                            />
                            <div className="flex items-center gap-2">
                                <Select
                                    value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
                                    onValueChange={(value) =>
                                        table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)
                                    }
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="resolved">Resolved</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={(table.getColumn("category")?.getFilterValue() as string) ?? "all"}
                                    onValueChange={(value) =>
                                        table.getColumn("category")?.setFilterValue(value === "all" ? "" : value)
                                    }
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        <SelectItem value="Technical">Technical</SelectItem>
                                        <SelectItem value="Billing">Billing</SelectItem>
                                        <SelectItem value="Onboarding">Onboarding</SelectItem>
                                        <SelectItem value="General">General</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="rounded-md border bg-card">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                {loading ? "Loading tickets..." : "No tickets found."}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                {table.getFilteredRowModel().rows.length} ticket(s) found.
                            </div>
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
