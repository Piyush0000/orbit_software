"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getBrandMetrics, getBrands } from "@/lib/admin-api";

type Merchant = {
  id: string;
  brandName: string;
  ownerName: string;
  email: string;
  phone: string;
  status: "live" | "paused" | "pending";
  onboardingProgress: number;
  lastActive: string;
  revenue: number;
  riskFlag: "none" | "low" | "medium" | "high";
};

export default function MerchantsPage() {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Merchant[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { stores } = await getBrands();
        const metricsList = await Promise.all(
          stores.map((store) =>
            getBrandMetrics(store.id)
              .then(({ metrics }) => metrics)
              .catch(() => null),
          ),
        );
        if (!isMounted) return;
        const mapped = stores.map((store, index) => {
          const metrics = metricsList[index] as {
            totalRevenue?: number;
          } | null;
          const revenue = Number(metrics?.totalRevenue || 0);
          const lastActiveDate =
            store.lastOnboardingActivityAt || store.createdAt;
          return {
            id: store.id,
            brandName: store.name,
            ownerName: store.user?.fullName || "Unknown",
            email: store.user?.email || "Not provided",
            phone: "Not provided",
            status: (store.isActive ? "live" : "paused") as
              | "live"
              | "paused"
              | "pending",
            onboardingProgress: store.onboarding?.completionPercent || 0,
            lastActive: new Date(lastActiveDate).toLocaleDateString("en-US"),
            revenue,
            riskFlag: "none" as "none" | "low" | "medium" | "high",
          };
        });
        setData(mapped);
      } catch (err) {
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : "Unable to load merchants",
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const columns: ColumnDef<Merchant>[] = [
    {
      accessorKey: "brandName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-semibold pl-4">{row.getValue("brandName")}</div>
      ),
    },
    {
      accessorKey: "ownerName",
      header: "Owner",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("ownerName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Contact",
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground">
          <div>{row.getValue("email")}</div>
          <div>{row.original.phone}</div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "live"
                ? "default"
                : status === "paused"
                  ? "destructive"
                  : "secondary"
            }
            className="capitalize"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "onboardingProgress",
      header: "Onboarding",
      cell: ({ row }) => {
        const progress = row.getValue("onboardingProgress") as number;
        return (
          <div className="flex items-center gap-2">
            <div className="h-2 w-16 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: "lastActive",
      header: "Last Active",
      cell: ({ row }) => (
        <div className="text-xs flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          {row.getValue("lastActive")}
        </div>
      ),
    },
    {
      accessorKey: "revenue",
      header: ({ column }) => (
        <div className="text-right pr-20">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-4"
          >
            Revenue
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("revenue"));
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(amount);
        return <div className="font-medium text-right pr-24">{formatted}</div>;
      },
    },
    {
      accessorKey: "riskFlag",
      header: "Risk",
      cell: ({ row }) => {
        const risk = row.getValue("riskFlag") as string;
        return (
          <Badge
            variant={risk === "none" ? "outline" : "secondary"}
            className={`capitalize ${risk === "high" ? "bg-red-100 text-red-800 border-red-200" : risk === "medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : ""}`}
          >
            {risk}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/dashboard/merchants/${row.original.id}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      ),
    },
  ];

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
  });

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Merchants</h2>
              <p className="text-muted-foreground">
                High-level overview of all merchants on the platform.
              </p>
            </div>
          </div>
          {error && (
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
          )}

          <div className="w-full space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Input
                placeholder="Filter merchants..."
                value={
                  (table.getColumn("brandName")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("brandName")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <div className="flex items-center gap-2">
                <Select
                  value={
                    (table.getColumn("status")?.getFilterValue() as string) ??
                    "all"
                  }
                  onValueChange={(value) =>
                    table
                      .getColumn("status")
                      ?.setFilterValue(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
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
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="rounded-md border bg-card">
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
                                header.getContext(),
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
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() =>
                          router.push(`/dashboard/merchants/${row.original.id}`)
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
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
                        {loading ? "Loading merchants..." : "No results."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
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
  );
}
