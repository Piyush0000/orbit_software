"use client"

import * as React from "react"
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
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { getAdminMe } from "@/lib/admin-api"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Lifecycle",
      url: "/dashboard/lifecycle",
      icon: ListIcon,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChartIcon,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: UsersIcon,
    },
    {
      title: "Brands",
      url: "/dashboard/brands",
      icon: ListIcon,
    },
    {
      title: "Provisioning",
      url: "/dashboard/provisioning",
      icon: RocketIcon,
    },
    {
      title: "Tickets",
      url: "/dashboard/tickets",
      icon: MessageSquare,
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
    {
      title: "Merchants",
      url: "/dashboard/merchants",
      icon: UsersIcon,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: PackageIcon,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: FileTextIcon,
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState({
    name: "Admin",
    email: "",
    avatar: "",
  })

  React.useEffect(() => {
    let isMounted = true
    const load = async () => {
      try {
        const { admin } = await getAdminMe()
        if (!isMounted) return
        setUser({
          name: admin.fullName || "Admin",
          email: admin.email || "",
          avatar: "",
        })
      } catch (_) {
        // keep fallback
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {data.documents.length > 0 && <NavDocuments items={data.documents} />}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
          <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
