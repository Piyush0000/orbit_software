"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  UserPlus,
  LayoutDashboardIcon,
  ListIcon,
  PackageIcon,
  MessageSquare,
  MessageSquareMore,
  Palette,
  RocketIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  ContactIcon,
} from "lucide-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { getAdminMe } from "@/lib/admin-api";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "CRM",
      url: "#",
      icon: UsersIcon,
      items: [
        {
          title: "Leads",
          url: "/dashboard/crm",
        },
        {
          title: "Pipeline",
          url: "/dashboard/crm/pipeline",
        },
      ],
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FolderIcon,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChartIcon,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: UsersIcon,
    },
    {
      title: "Communication",
      url: "/dashboard/communication",
      icon: MessageSquareMore,
    },
    {
      title: "Themes",
      url: "/dashboard/themes",
      icon: Palette,
    },
  ],
  inventory: [
    {
      title: "Products",
      url: "/dashboard/products",
      icon: PackageIcon,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ClipboardListIcon,
    },
  ],
  setup: [
    {
      title: "Provisioning",
      url: "/dashboard/provisioning",
      icon: RocketIcon,
    },
    {
      title: "Merchants",
      url: "/dashboard/merchants",
      icon: UserPlus,
    },
    {
      title: "Tickets",
      url: "/dashboard/tickets",
      icon: MessageSquare,
    },
  ],
  navClouds: [
    // Commented out until these features are implemented
    // {
    //   title: "Capture",
    //   icon: CameraIcon,
    //   isActive: true,
    //   url: "/dashboard/capture",
    //   items: [
    //     {
    //       title: "Active Proposals",
    //       url: "/dashboard/capture/active",
    //     },
    //     {
    //       title: "Archived",
    //       url: "/dashboard/capture/archived",
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: SettingsIcon,
    },
    // Commented out until implemented
    // {
    //   title: "Get Help",
    //   url: "/dashboard/help",
    //   icon: HelpCircleIcon,
    // },
    // {
    //   title: "Search",
    //   url: "/dashboard/search",
    //   icon: SearchIcon,
    // },
  ],
  documents: [
    // Commented out until these features are implemented
    // {
    //   name: "Data Library",
    //   url: "/dashboard/data-library",
    //   icon: DatabaseIcon,
    // },
    // {
    //   name: "Reports",
    //   url: "/dashboard/reports",
    //   icon: ClipboardListIcon,
    // },
    // {
    //   name: "Word Assistant",
    //   url: "/dashboard/word-assistant",
    //   icon: FileIcon,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState({
    name: "Admin",
    email: "",
    avatar: "",
  });

  React.useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const { admin } = await getAdminMe();
        if (!isMounted) return;
        setUser({
          name: admin.fullName || "Admin",
          email: admin.email || "",
          avatar: "",
        });
      } catch (_) {
        // keep fallback
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-3 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20 ring-1 ring-blue-400 overflow-hidden p-1.5">
                <img
                  src="/orbit360-logo.png"
                  alt="Orbit360 Logo"
                  className="h-full w-full object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground">
                  EVOC_ADMIN
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
                  Orbit Software
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <div className="mt-4 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          Main Console
        </div>
        <NavMain items={data.navMain} />

        <div className="mt-6 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          Inventory
        </div>
        <NavMain items={data.inventory} />

        <div className="mt-6 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          System Setup
        </div>
        <NavMain items={data.setup} />

        {data.documents.length > 0 && (
          <>
            <div className="mt-6 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              Documents
            </div>
            <NavDocuments items={data.documents} />
          </>
        )}

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 bg-accent/30 p-2">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
