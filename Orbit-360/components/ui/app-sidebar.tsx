"use client";

import * as React from "react";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  DollarSign,
  FileText,
  LayoutDashboard,
  Megaphone,
  Package,
  ShoppingBag,
  ShoppingCart,
  Target,
  Truck,
  TrendingUp,
  Users,
  Warehouse,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

const data = {
  user: {
    name: "Kishor Irnak",
    email: "kishorirnak@gmail.com",
  },
  teams: [
    {
      name: "Orbit 360",
      logo: Command,
      plan: "Powered by Evoc Labs.",
    },
  ],
  navMain: [
    {
      title: "Summary",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview (All KPIs)",
          url: "#",
        },
        {
          title: "Real-time Status",
          url: "#",
        },
        {
          title: "Today vs Yesterday",
          url: "#",
        },
      ],
    },
    {
      title: "Sales",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Orders",
          url: "#",
        },
        {
          title: "Revenue",
          url: "#",
        },
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Customers",
          url: "#",
        },
        {
          title: "Abandoned Carts",
          url: "#",
        },
        {
          title: "Payments",
          url: "#",
        },
        {
          title: "Returns",
          url: "#",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Ad Overview",
          url: "#",
        },
        {
          title: "Campaigns",
          url: "#",
        },
        {
          title: "Ad Sets",
          url: "#",
        },
        {
          title: "Creatives",
          url: "#",
        },
        {
          title: "ROAS & CAC",
          url: "#",
        },
        {
          title: "Audience Insights",
          url: "#",
        },
      ],
    },
    {
      title: "Logistics",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Shipments",
          url: "#",
        },
        {
          title: "Order Tracking",
          url: "#",
        },
        {
          title: "Delivery Status",
          url: "#",
        },
        {
          title: "Delays & Issues",
          url: "#",
        },
        {
          title: "Warehouse",
          url: "#",
        },
        {
          title: "RTO / Returns",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({
    Summary: true,
  });

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => toggleItem(item.title)}
                    isActive={item.isActive}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight
                      className={`ml-auto transition-transform duration-200 ${
                        openItems[item.title] ? "rotate-90" : ""
                      }`}
                    />
                  </SidebarMenuButton>

                  {openItems[item.title] && item.items && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <ModeToggle />
              <span className="text-sm font-medium">Theme</span>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center">
                <span className="text-xs font-medium text-black">CN</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{data.user.name}</span>
                <span className="truncate text-xs">{data.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
